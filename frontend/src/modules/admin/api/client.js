import axiosInstance from "../../../api/axiosInstance.js";

export const adminApi = {
  getDashboard() {
    return axiosInstance.get("/admin/dashboard");
  },
  getAnalytics() {
    return axiosInstance.get("/admin/analytics");
  },
  getReports(params) {
    return axiosInstance.get("/admin/reports", { params });
  },
  listUsers(params) {
    return axiosInstance.get("/admin/users", { params });
  },
  updateUser(id, payload) {
    return axiosInstance.patch(`/admin/users/${id}`, payload);
  },
  listDonors(params) {
    return axiosInstance.get("/admin/donors", { params });
  },
  listVolunteers(params) {
    return axiosInstance.get("/admin/volunteers", { params });
  },
  listNgos(params) {
    return axiosInstance.get("/admin/ngos", { params });
  },
  verifyNgo(id) {
    return axiosInstance.post(`/admin/ngos/${id}/verify`);
  },
  listDonations(params) {
    return axiosInstance.get("/admin/donations", { params });
  },
  listDeliveries(params) {
    return axiosInstance.get("/admin/deliveries", { params });
  },
  listFoodRequests(params) {
    return axiosInstance.get("/admin/food-requests", { params });
  },
  listInventory(params) {
    return axiosInstance.get("/admin/inventory", { params });
  },
  listAuditLogs(params) {
    return axiosInstance.get("/admin/audit-logs", { params });
  },
  listNotifications(params) {
    return axiosInstance.get("/admin/notifications", { params });
  },
  listSupportTickets(params) {
    return axiosInstance.get("/admin/support-tickets", { params });
  },
  updateSupportTicket(id, payload) {
    return axiosInstance.patch(`/admin/support-tickets/${id}`, payload);
  },
  exportReport(type, format = "csv") {
    return axiosInstance.get(`/admin/export/${type}`, {
      params: { format },
      responseType: "blob",
    });
  },
};

export default adminApi;
