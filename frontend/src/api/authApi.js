import axiosInstance from "./axiosInstance.js";

/**
 * Auth API — thin wrappers around backend /auth endpoints.
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
};

export default authApi;
