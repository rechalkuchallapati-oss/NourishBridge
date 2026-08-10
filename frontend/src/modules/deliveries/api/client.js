import axiosInstance from "../../../api/axiosInstance.js";
import { resolveImageUrl } from "../../donations/api/client.js";

export const deliveryApi = {
  getByDonation(donationId) {
    return axiosInstance.get(`/deliveries/donation/${donationId}`);
  },
  getById(id) {
    return axiosInstance.get(`/deliveries/${id}`);
  },
  listMyActive() {
    return axiosInstance.get("/deliveries/my/active");
  },
  advance(id, payload) {
    return axiosInstance.post(`/deliveries/${id}/advance`, payload);
  },
  uploadProof(id, proofType, files) {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    return axiosInstance.post(`/deliveries/${id}/proof/${proofType}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getQr(id) {
    return axiosInstance.get(`/deliveries/${id}/qr`);
  },
  scanQr(id, qrPayload) {
    return axiosInstance.post(`/deliveries/${id}/scan-qr`, { qrPayload });
  },
};

export const DELIVERY_ACTIONS = {
  schedulePickup: "schedule_pickup",
  arriveAtPickup: "arrive_at_pickup",
  verifyPickup: "verify_pickup",
  collectFood: "collect_food",
  startDelivery: "start_delivery",
  arriveAtNgo: "arrive_at_ngo",
  verifyDelivery: "verify_delivery",
  complete: "complete",
};

export function mapDeliveryToUi(delivery) {
  if (!delivery) return null;
  return {
    ...delivery,
    pickupProofImages: (delivery.pickupProofImages || []).map(resolveImageUrl),
    deliveryProofImages: (delivery.deliveryProofImages || []).map(resolveImageUrl),
  };
}

export default deliveryApi;
