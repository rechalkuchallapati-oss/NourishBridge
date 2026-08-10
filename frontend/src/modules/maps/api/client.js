import axiosInstance from "../../../api/axiosInstance.js";

export const mapApi = {
  getDonationMap(donationId) {
    return axiosInstance.get(`/maps/donation/${donationId}`);
  },
  getDeliveryRoute(deliveryId) {
    return axiosInstance.get(`/maps/delivery/${deliveryId}`);
  },
  updateVolunteerLocation(coordinates) {
    return axiosInstance.patch("/maps/volunteer/location", { coordinates });
  },
};

export default mapApi;
