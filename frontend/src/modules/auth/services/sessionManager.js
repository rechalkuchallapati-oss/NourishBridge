import {
  getAccessToken,
  getRefreshToken,
} from "../storage/tokenStorage.js";
import { isTokenExpired } from "../utils/jwtUtils.js";
import {
  refreshSession,
  fetchCurrentUser,
  logout,
} from "./authService.js";
import { getSessionUser, getPersistedUser } from "../../../utils/authStorage.js";
import { emitSessionExpired, emitSessionRestored } from "../utils/sessionEvents.js";
import { TOKEN_REFRESH_BUFFER_SECONDS } from "../constants/session.js";

export async function restoreSession() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken && !refreshToken) {
    return { status: "unauthenticated", user: null };
  }

  const accessValid =
    accessToken && !isTokenExpired(accessToken, TOKEN_REFRESH_BUFFER_SECONDS);

  if (accessValid) {
    try {
      const user = await fetchCurrentUser();
      emitSessionRestored({ user });
      return { status: "authenticated", user };
    } catch {
      /* access token rejected — attempt refresh below */
    }
  }

  if (refreshToken) {
    try {
      const user = await refreshSession();
      emitSessionRestored({ user });
      return { status: "authenticated", user };
    } catch {
      await logout({ redirect: false });
      emitSessionExpired({ reason: "refresh_failed" });
      return { status: "unauthenticated", user: null };
    }
  }

  await logout({ redirect: false });
  emitSessionExpired({ reason: "no_tokens" });
  return { status: "unauthenticated", user: null };
}

export async function validateAndRefreshSession() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken && !refreshToken) {
    emitSessionExpired({ reason: "no_tokens" });
    await logout({ redirect: false });
    return null;
  }

  const needsRefresh =
    !accessToken || isTokenExpired(accessToken, TOKEN_REFRESH_BUFFER_SECONDS);

  if (!needsRefresh) {
    return getSessionUser();
  }

  if (!refreshToken) {
    emitSessionExpired({ reason: "access_expired" });
    await logout({ redirect: false });
    return null;
  }

  try {
    const user = await refreshSession();
    return user;
  } catch {
    emitSessionExpired({ reason: "refresh_failed" });
    await logout({ redirect: false });
    return null;
  }
}

export function getCachedUser() {
  return getSessionUser() || getPersistedUser();
}

export default {
  restoreSession,
  validateAndRefreshSession,
  getCachedUser,
};
