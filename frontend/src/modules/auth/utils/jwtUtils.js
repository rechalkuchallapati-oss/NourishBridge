/**
 * Client-side JWT helpers — used for expiry checks only (not signature verification).
 */

const DEFAULT_BUFFER_SECONDS = 30;

export function decodeJwtPayload(token) {
  if (!token || typeof token !== "string") return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function isTokenExpired(token, bufferSeconds = DEFAULT_BUFFER_SECONDS) {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;

  const expiresAtMs = payload.exp * 1000;
  const bufferMs = bufferSeconds * 1000;
  return Date.now() >= expiresAtMs - bufferMs;
}

export function getTokenExpiresInMs(token) {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return 0;

  return Math.max(0, payload.exp * 1000 - Date.now());
}

export default {
  decodeJwtPayload,
  isTokenExpired,
  getTokenExpiresInMs,
};
