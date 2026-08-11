import axiosInstance from "../../../api/axiosInstance.js";

export const matchingApi = {
  scoreNgos(donationId) {
    return axiosInstance.get(`/matching/donations/${donationId}/ngos`);
  },
  scoreVolunteers(donationId) {
    return axiosInstance.get(`/matching/donations/${donationId}/volunteers`);
  },
};

export default matchingApi;
