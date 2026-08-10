import axiosInstance from "../../../api/axiosInstance.js";

export const profileApi = {
  getProfile() {
    return axiosInstance.get("/profile");
  },

  updateProfile(payload) {
    return axiosInstance.patch("/profile", payload);
  },

  uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);
    return axiosInstance.post("/profile/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getImpact() {
    return axiosInstance.get("/profile/impact");
  },
};

export default profileApi;
