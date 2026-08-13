/**
 * API configuration — reads Vite env with sensible local defaults.
 * In dev, defaults to `/api/v1` (proxied by Vite to the backend).
 * In production builds, set VITE_API_BASE_URL to your deployed API (e.g. Render).
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "/api/v1" : "");

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 30_000,
};

export default API_CONFIG;
