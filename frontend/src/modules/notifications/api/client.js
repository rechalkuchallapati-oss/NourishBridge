import axiosInstance from "../../../api/axiosInstance.js";

export const notificationApi = {
  list(params) {
    return axiosInstance.get("/notifications", { params });
  },
  unreadCount() {
    return axiosInstance.get("/notifications/unread-count");
  },
  markRead(id) {
    return axiosInstance.patch(`/notifications/${id}/read`);
  },
  markAllRead() {
    return axiosInstance.patch("/notifications/read-all");
  },
};

export default notificationApi;
