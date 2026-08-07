/**
 * Secure JWT persistence — access token in sessionStorage (tab-scoped),
 * refresh token in sessionStorage or localStorage when "Remember me" is enabled.
 */

const ACCESS_KEY = "nb_access_token";
const REFRESH_KEY = "nb_refresh_token";
const REMEMBER_KEY = "nb_remember_me";

function getRefreshStorage() {
  return sessionStorage.getItem(REMEMBER_KEY) === "1"
    ? localStorage
    : sessionStorage;
}

/**
 * Persist token pair after login or refresh.
 */
export function saveTokens({ accessToken, refreshToken }, rememberMe = false) {
  sessionStorage.setItem(REMEMBER_KEY, rememberMe ? "1" : "0");
  sessionStorage.setItem(ACCESS_KEY, accessToken);

  const refreshStorage = rememberMe ? localStorage : sessionStorage;
  refreshStorage.setItem(REFRESH_KEY, refreshToken);

  if (rememberMe) {
    localStorage.removeItem(ACCESS_KEY);
  } else {
    localStorage.removeItem(REFRESH_KEY);
  }
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return (
    getRefreshStorage().getItem(REFRESH_KEY) ||
    sessionStorage.getItem(REFRESH_KEY)
  );
}

export function isRememberMeEnabled() {
  return sessionStorage.getItem(REMEMBER_KEY) === "1";
}

export function clearTokens() {
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(REMEMBER_KEY);
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
