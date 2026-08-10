/**
 * Secure JWT persistence.
 *
 * Access token: sessionStorage (always) + localStorage when "Remember me"
 * Refresh token: sessionStorage (default) or localStorage (Remember me)
 * Remember flag: stored in BOTH storages so persistence survives tab/browser restart.
 */

const ACCESS_KEY = "nb_access_token";
const REFRESH_KEY = "nb_refresh_token";
const REMEMBER_KEY = "nb_remember_me";

function isRememberMeStored() {
  return (
    sessionStorage.getItem(REMEMBER_KEY) === "1" ||
    localStorage.getItem(REMEMBER_KEY) === "1"
  );
}

export function saveTokens({ accessToken, refreshToken }, rememberMe = false) {
  const remember = rememberMe ? "1" : "0";

  sessionStorage.setItem(REMEMBER_KEY, remember);
  sessionStorage.setItem(ACCESS_KEY, accessToken);
  sessionStorage.setItem(REFRESH_KEY, refreshToken);

  if (rememberMe) {
    localStorage.setItem(REMEMBER_KEY, remember);
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
  } else {
    localStorage.removeItem(REMEMBER_KEY);
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_KEY) || localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_KEY) || localStorage.getItem(REFRESH_KEY);
}

export function isRememberMeEnabled() {
  return isRememberMeStored();
}

export function clearTokens() {
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(REMEMBER_KEY);
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(REMEMBER_KEY);
}

export { REMEMBER_KEY, ACCESS_KEY, REFRESH_KEY };

export default {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  isRememberMeEnabled,
  clearTokens,
  REMEMBER_KEY,
  ACCESS_KEY,
  REFRESH_KEY,
};
