import deliveryApi from "../../deliveries/api/client.js";
import mapApi from "../api/client.js";

export async function fetchDeliveryRoute(deliveryId) {
  const { data } = await mapApi.getDeliveryRoute(deliveryId);
  return data.data.route;
}

export async function fetchDonationMap(donationId) {
  const { data } = await mapApi.getDonationMap(donationId);
  return data.data.map;
}

export async function updateVolunteerLocation(lat, lng) {
  const { data } = await mapApi.updateVolunteerLocation([lng, lat]);
  return data.data;
}

export async function fetchDeliveryQr(deliveryId) {
  const { data } = await deliveryApi.getQr(deliveryId);
  return data.data.qr;
}

export async function scanDeliveryQr(deliveryId, qrPayload) {
  const { data } = await deliveryApi.scanQr(deliveryId, qrPayload);
  return data.data;
}

export default {
  fetchDeliveryRoute,
  fetchDonationMap,
  updateVolunteerLocation,
  fetchDeliveryQr,
  scanDeliveryQr,
};
