/**
 * API configuration — reads Vite env with sensible local defaults.
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 30_000,
};

export default API_CONFIG;
