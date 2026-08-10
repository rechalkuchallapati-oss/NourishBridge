import axios from "axios";
import API_CONFIG from "../config/api.js";
import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
  REMEMBER_KEY,
} from "../utils/tokenStorage.js";
import { emitSessionExpired } from "../utils/sessionEvents.js";
import { emitAccessDenied } from "../utils/rbacEvents.js";

const ROLE_PROTECTED_API_PATTERN = /\/(admin|donor|ngo|volunteer)\//;

/**
 * Shared Axios client with auth header injection and silent token refresh.
 */
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

const forceSessionLogout = () => {
  clearTokens();
  emitSessionExpired({ reason: "interceptor_refresh_failed" });
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status === 403 &&
      ROLE_PROTECTED_API_PATTERN.test(originalRequest?.url || "")
    ) {
      emitAccessDenied({
        path: typeof window !== "undefined" ? window.location.pathname : "",
        message: error.response?.data?.message,
      });
      return Promise.reject(error);
    }

    if (
      status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      forceSessionLogout();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${API_CONFIG.baseURL}/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      const { accessToken, refreshToken: newRefreshToken } = data.data;
      const rememberMe =
        sessionStorage.getItem(REMEMBER_KEY) === "1" ||
        localStorage.getItem(REMEMBER_KEY) === "1";

      saveTokens({ accessToken, refreshToken: newRefreshToken }, rememberMe);

      processQueue(null, accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      forceSessionLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axiosInstance;
