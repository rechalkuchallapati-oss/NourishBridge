import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import * as authService from "../modules/auth/services/authService.js";
import {
  restoreSession,
  validateAndRefreshSession,
  getCachedUser,
} from "../modules/auth/services/sessionManager.js";
import {
  SESSION_EXPIRED_EVENT,
  SESSION_RESTORED_EVENT,
} from "../utils/sessionEvents.js";
import {
  SESSION_CHECK_INTERVAL_MS,
  MIN_REFRESH_INTERVAL_MS,
} from "../constants/session.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCachedUser());
  const [isInitializing, setIsInitializing] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const lastRefreshAttempt = useRef(0);

  const handleSessionExpired = useCallback(async (reason = "expired") => {
    await authService.logout({ redirect: false });
    setUser(null);

    if (reason !== "silent") {
      toast.error("Your session has expired. Please sign in again.");
    }
  }, []);

  const bootstrap = useCallback(async () => {
    setIsInitializing(true);

    try {
      const result = await restoreSession();
      setUser(result.user);
    } catch {
      await handleSessionExpired("silent");
    } finally {
      setIsInitializing(false);
    }
  }, [handleSessionExpired]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  /** Listen for session expiry emitted by Axios interceptor */
  useEffect(() => {
    const onExpired = () => {
      handleSessionExpired();
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
  }, [handleSessionExpired]);

  /** Sync user state when session is silently restored elsewhere */
  useEffect(() => {
    const onRestored = (event) => {
      if (event.detail?.user) {
        setUser(event.detail.user);
      }
    };

    window.addEventListener(SESSION_RESTORED_EVENT, onRestored);
    return () => window.removeEventListener(SESSION_RESTORED_EVENT, onRestored);
  }, []);

  /** Periodic token validity check + proactive refresh */
  useEffect(() => {
    if (!user || isInitializing) return;

    const runCheck = async () => {
      const now = Date.now();
      if (now - lastRefreshAttempt.current < MIN_REFRESH_INTERVAL_MS) return;

      lastRefreshAttempt.current = now;
      setIsRefreshing(true);

      try {
        const validatedUser = await validateAndRefreshSession();
        if (validatedUser) {
          setUser(validatedUser);
        } else {
          await handleSessionExpired();
        }
      } catch {
        await handleSessionExpired();
      } finally {
        setIsRefreshing(false);
      }
    };

    const intervalId = setInterval(runCheck, SESSION_CHECK_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        runCheck();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [user, isInitializing, handleSessionExpired]);

  const login = useCallback(async (credentials) => {
    const sessionUser = await authService.login(credentials);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const registerFromOnboarding = useCallback(async (onboardingFields) => {
    const sessionUser = await authService.registerFromOnboarding(onboardingFields);
    setUser(sessionUser);
    return sessionUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout({ redirect: true });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user?.email),
      isInitializing,
      isLoading: isInitializing,
      isRefreshing,
      login,
      registerFromOnboarding,
      logout,
      refreshSession: authService.refreshSession,
    }),
    [user, isInitializing, isRefreshing, login, registerFromOnboarding, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export default AuthContext;
