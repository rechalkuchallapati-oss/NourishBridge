import ngoApi from "../api/client.js";
import { apiDonationToUi } from "../../donations/services/donationService.js";

const INCOMING_STATUS_MAP = {
  pending: "pending_review",
  verified: "pending_ngo_acceptance",
  ngo_accepted: "accepted",
  volunteer_assigned: "volunteer_assigned",
  pickup_scheduled: "volunteer_assigned",
  picked_up: "en_route",
  in_transit: "en_route",
  delivered: "delivered",
  completed: "completed",
  rejected: "rejected",
  cancelled: "rejected",
  expired: "expired",
};

export function apiDonationToNgoIncoming(donation) {
  const ui = apiDonationToUi(donation);
  return {
    ...ui,
    status: INCOMING_STATUS_MAP[donation.status] || donation.status,
    donorName: donation.donorName || donation.donor?.fullName || "Donor",
    foodName: donation.foodName || donation.food,
    estimatedServings: donation.estimatedMeals || 0,
    pickupLocation: donation.pickupAddress || "",
    submittedAt: donation.postedAt || donation.dateLabel || "",
    volunteerAssigned: Boolean(donation.volunteerId || donation.volunteer),
    urgency: donation.priority === "critical" ? "critical" : donation.priority || "medium",
  };
}

export async function fetchIncomingDonations(params) {
  const { data } = await ngoApi.listIncoming(params);
  return (data.data.donations || []).map(apiDonationToNgoIncoming);
}

export async function fetchAcceptedDonations(params) {
  const { data } = await ngoApi.listAccepted(params);
  return (data.data.donations || []).map(apiDonationToUi);
}

export async function fetchAvailableDonations(params) {
  const { data } = await ngoApi.browseDonations(params);
  return (data.data.donations || []).map(apiDonationToUi);
}

export async function acceptDonation(id) {
  const { data } = await ngoApi.acceptDonation(id);
  return apiDonationToUi(data.data.donation);
}

export async function rejectDonation(id, reason) {
  const { data } = await ngoApi.rejectDonation(id, reason);
  return apiDonationToUi(data.data.donation);
}

export async function completeDonation(id) {
  const { data } = await ngoApi.completeDonation(id);
  return apiDonationToUi(data.data.donation);
}

export async function fetchNgoInventory(params) {
  const { data } = await ngoApi.listInventory(params);
  return (data.data.items || []).map((item) => ({
    ...item,
    id: item.batchCode || item.id,
    mongoId: item.id,
    batchId: item.batchCode,
    foodItem: item.itemName,
    availableQuantity: item.availableQuantity ?? item.quantity,
    receivedDate: item.receivedAt,
  }));
}

export async function fetchInventoryAlerts(days = 3) {
  const { data } = await ngoApi.getInventoryAlerts(days);
  return data.data;
}

export async function fetchInventoryStatistics() {
  const { data } = await ngoApi.getInventoryStatistics();
  return data.data.statistics;
}

export async function fetchBeneficiaries(params) {
  const { data } = await ngoApi.listBeneficiaries(params);
  return data.data.beneficiaries || [];
}

export default {
  fetchIncomingDonations,
  fetchAcceptedDonations,
  fetchAvailableDonations,
  acceptDonation,
  rejectDonation,
  completeDonation,
  fetchNgoInventory,
  fetchBeneficiaries,
};
