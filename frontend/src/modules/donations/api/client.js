import axiosInstance from "../../../api/axiosInstance.js";
import API_CONFIG from "../../../config/api.js";

export const donationApi = {
  create(payload) {
    return axiosInstance.post("/donations", payload);
  },

  listMine(params = {}) {
    return axiosInstance.get("/donations/my", { params });
  },

  getById(id) {
    return axiosInstance.get(`/donations/${id}`);
  },

  update(id, payload) {
    return axiosInstance.patch(`/donations/${id}`, payload);
  },

  cancel(id) {
    return axiosInstance.delete(`/donations/${id}`);
  },

  uploadImages(id, files) {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return axiosInstance.post(`/donations/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getHistory(id) {
    return axiosInstance.get(`/donations/${id}/history`);
  },
};

/** Resolve relative upload URLs against API host */
export function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("blob:")) return path;
  const apiOrigin = API_CONFIG.baseURL.replace(/\/api\/v\d+\/?$/, "");
  return `${apiOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

export default donationApi;
