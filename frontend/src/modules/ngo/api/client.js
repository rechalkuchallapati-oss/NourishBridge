import axiosInstance from "../../../api/axiosInstance.js";

export const ngoApi = {
  getDashboard() {
    return axiosInstance.get("/ngo/dashboard");
  },
  browseDonations(params) {
    return axiosInstance.get("/ngo/donations/available", { params });
  },
  listIncoming(params) {
    return axiosInstance.get("/ngo/donations/incoming", { params });
  },
  listAccepted(params) {
    return axiosInstance.get("/ngo/donations/accepted", { params });
  },
  getDonation(id) {
    return axiosInstance.get(`/ngo/donations/${id}`);
  },
  acceptDonation(id) {
    return axiosInstance.post(`/ngo/donations/${id}/accept`);
  },
  rejectDonation(id, reason) {
    return axiosInstance.post(`/ngo/donations/${id}/reject`, { reason });
  },
  completeDonation(id) {
    return axiosInstance.post(`/ngo/donations/${id}/complete`);
  },
  getDonationStats() {
    return axiosInstance.get("/ngo/donations/statistics");
  },
  listInventory(params) {
    return axiosInstance.get("/ngo/inventory", { params });
  },
  getInventoryAlerts(days = 3) {
    return axiosInstance.get("/ngo/inventory/alerts", { params: { days } });
  },
  getInventoryStatistics() {
    return axiosInstance.get("/ngo/inventory/statistics");
  },
  listIncomingDeliveries() {
    return axiosInstance.get("/ngo/deliveries/incoming");
  },
  distributeInventory(id, payload) {
    return axiosInstance.post(`/ngo/inventory/${id}/distribute`, payload);
  },
  listDistributionRecords(params) {
    return axiosInstance.get("/ngo/inventory/distribution-records", { params });
  },
  listBeneficiaries(params) {
    return axiosInstance.get("/ngo/beneficiaries", { params });
  },
  createBeneficiary(payload) {
    return axiosInstance.post("/ngo/beneficiaries", payload);
  },
  updateBeneficiary(id, payload) {
    return axiosInstance.patch(`/ngo/beneficiaries/${id}`, payload);
  },
};

export default ngoApi;
