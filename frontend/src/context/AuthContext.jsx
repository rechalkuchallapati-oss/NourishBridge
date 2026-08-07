import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getAccessToken, getRefreshToken } from "../utils/tokenStorage.js";
import { getSessionUser } from "../utils/authStorage.js";
import * as authService from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSessionUser());
  const [isLoading, setIsLoading] = useState(true);

  const bootstrap = useCallback(async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken && !refreshToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      if (accessToken) {
        const currentUser = await authService.fetchCurrentUser();
        setUser(currentUser);
      } else if (refreshToken) {
        const sessionUser = await authService.refreshSession();
        setUser(sessionUser);
      }
    } catch {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

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
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user?.email),
      isLoading,
      login,
      registerFromOnboarding,
      logout,
      refreshSession: authService.refreshSession,
    }),
    [user, isLoading, login, registerFromOnboarding, logout],
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
