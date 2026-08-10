import axiosInstance from "../../../api/axiosInstance.js";

/**
 * Auth API client — thin wrappers around backend /auth endpoints.
 */
export const authApi = {
  register(payload) {
    return axiosInstance.post("/auth/register", payload);
  },

  login(credentials) {
    return axiosInstance.post("/auth/login", credentials);
  },

  refresh(refreshToken) {
    return axiosInstance.post("/auth/refresh", { refreshToken });
  },

  logout(refreshToken) {
    return axiosInstance.post("/auth/logout", { refreshToken });
  },

  me() {
    return axiosInstance.get("/auth/me");
  },

  forgotPassword(email) {
    return axiosInstance.post("/auth/forgot-password", { email });
  },

  resetPassword(payload) {
    return axiosInstance.post("/auth/reset-password", payload);
  },
};

export default authApi;
