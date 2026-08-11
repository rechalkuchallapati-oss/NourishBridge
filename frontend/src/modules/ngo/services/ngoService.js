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

const ACCEPTED_STATUS_MAP = {
  ngo_accepted: "accepted",
  volunteer_assigned: "volunteer_assigned",
  pickup_scheduled: "volunteer_assigned",
  picked_up: "picked_up",
  in_transit: "in_transit",
  delivered: "received_at_ngo",
  completed: "completed",
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

export function apiDonationToAccepted(donation) {
  const ui = apiDonationToUi(donation);
  return {
    ...ui,
    foodItem: ui.food,
    donor: donation.donorName || "Donor",
    volunteer: ui.volunteer || "—",
    status: ACCEPTED_STATUS_MAP[donation.status] || donation.status,
    dateKey: "today",
    eta: ui.pickupTime || "—",
    receivedTime: donation.deliveredAt
      ? new Date(donation.deliveredAt).toLocaleString("en-IN")
      : "—",
  };
}

export function apiBeneficiaryToUi(beneficiary) {
  return {
    id: beneficiary.id,
    mongoId: beneficiary.id,
    organization: beneficiary.name,
    name: beneficiary.name,
    type: beneficiary.category || "general",
    location: beneficiary.address?.city || "—",
    locationKey: (beneficiary.address?.city || "hyderabad").toLowerCase(),
    contactPerson: beneficiary.name,
    phone: beneficiary.contactPhone || "—",
    address: beneficiary.address?.line1 || beneficiary.address || "—",
    beneficiaryCount: beneficiary.householdSize || 0,
    status: beneficiary.isActive ? "active" : "inactive",
    priority: "medium",
    mealsServed: beneficiary.mealsServed || 0,
    notes: beneficiary.notes || "",
  };
}

export async function fetchNgoDashboard() {
  const { data } = await ngoApi.getDashboard();
  const summary = data.data.summary || {};

  return {
    ngo: data.data.ngo,
    metrics: [
      {
        id: "incoming",
        label: "Incoming Donations",
        value: String(summary.incomingDonations ?? 0),
        caption: "Awaiting review or pickup coordination",
        accent: "blue",
      },
      {
        id: "active_deliveries",
        label: "Active Deliveries",
        value: String(summary.activeDeliveries ?? 0),
        caption: "In transit or awaiting receipt",
        accent: "purple",
      },
      {
        id: "food_received",
        label: "Completed Donations",
        value: String(summary.completedDonations ?? 0),
        caption: "Successfully received at NGO",
        accent: "green",
      },
      {
        id: "meals_distributed",
        label: "Meals Distributed",
        value: String(summary.mealsDistributed ?? 0),
        caption: "From completed donations",
        accent: "green",
      },
      {
        id: "people_supported",
        label: "Daily Capacity",
        value: String(summary.peopleSupported ?? 0),
        caption: "Beneficiary capacity (profile)",
        accent: "amber",
      },
      {
        id: "food_saved",
        label: "Inventory Items",
        value: String(summary.inventoryItems ?? 0),
        caption: `${summary.lowStockItems ?? 0} low stock alerts`,
        accent: "green",
      },
    ],
    summary,
  };
}

export async function fetchIncomingDonations(params) {
  const { data } = await ngoApi.listIncoming(params);
  return (data.data.donations || []).map(apiDonationToNgoIncoming);
}

export async function fetchAcceptedDonations(params) {
  const { data } = await ngoApi.listAccepted(params);
  return (data.data.donations || []).map(apiDonationToAccepted);
}

export async function fetchAvailableDonations(params) {
  const { data } = await ngoApi.browseDonations(params);
  return (data.data.donations || []).map((d) => ({
    ...apiDonationToUi(d),
    ...apiDonationToNgoIncoming(d),
    status: "pending_ngo_acceptance",
  }));
}

export async function fetchDonationDetail(id) {
  const { data } = await ngoApi.getDonation(id);
  return apiDonationToUi(data.data.donation);
}

export async function fetchDonationStatistics() {
  const { data } = await ngoApi.getDonationStats();
  return data.data.statistics;
}

export async function fetchIncomingDeliveries() {
  const { data } = await ngoApi.listIncomingDeliveries();
  return (data.data.deliveries || []).map((delivery) => ({
    id: delivery.deliveryCode || delivery.id,
    mongoId: delivery.id,
    donationId: delivery.donationCode || delivery.donationId,
    foodName: delivery.foodName || delivery.foodType,
    donorName: delivery.donorName || "Donor",
    quantity: delivery.quantityLabel || `${delivery.quantity} ${delivery.quantityUnit || "kg"}`,
    currentStatus: delivery.status,
    volunteer: {
      name: delivery.volunteerName || "Volunteer",
      phone: delivery.volunteerPhone || "—",
      vehicle: delivery.vehicleType || "—",
    },
    eta: delivery.eta || delivery.estimatedArrival || "—",
    lastLocationUpdate: delivery.currentLocation || delivery.pickupAddress || "—",
    eventType: "individual",
  }));
}

export async function fetchNgoImpactStats() {
  const [dashboard, donationStats, inventoryStats] = await Promise.all([
    fetchNgoDashboard(),
    fetchDonationStatistics(),
    fetchInventoryStatistics().catch(() => null),
  ]);

  return {
    metrics: dashboard.metrics,
    summary: dashboard.summary,
    donations: donationStats,
    inventory: inventoryStats,
  };
}

export function buildDonationQueryParams(filters = {}) {
  const params = {};
  if (filters.search) params.search = filters.search;
  if (filters.category && filters.category !== "all") params.category = filters.category;
  if (filters.priority && filters.priority !== "all") params.priority = filters.priority;
  if (filters.status && filters.status !== "all") params.status = filters.status;
  return params;
}

export async function acceptDonation(id) {
  const { data } = await ngoApi.acceptDonation(id);
  return apiDonationToNgoIncoming(data.data.donation);
}

export async function rejectDonation(id, reason) {
  const { data } = await ngoApi.rejectDonation(id, reason);
  return apiDonationToNgoIncoming(data.data.donation);
}

export async function completeDonation(id) {
  const { data } = await ngoApi.completeDonation(id);
  return apiDonationToAccepted(data.data.donation);
}

export function apiInventoryToDistributionBatch(item) {
  const unit = item.quantityUnit || "meals";
  let status = "scheduled";
  if (item.status === "distributed" || item.quantity <= 0) status = "completed";
  else if (item.distributedQuantity > 0) status = "serving";

  return {
    id: item.batchCode || item.id,
    mongoId: item.id,
    food: item.itemName || item.foodItem,
    quantity: `${item.initialQuantity ?? item.quantity} ${unit}`,
    remainingQuantity: `${item.quantity} ${unit}`,
    preparedTime: item.receivedAt
      ? new Date(item.receivedAt).toLocaleString("en-IN")
      : "—",
    distributionDeadline: item.expiryDate
      ? new Date(item.expiryDate).toLocaleString("en-IN")
      : "—",
    status,
    destination: item.receivedFrom || "Community distribution",
    destinationKey: "hyderabad",
    volunteer: "—",
    vehicle: "—",
    departureTime: "—",
    arrivalTime: "—",
    beneficiaryCount: item.estimatedMeals || 0,
    timeline: [{ step: status, time: "Current" }],
  };
}

export function apiInventoryToDistributionRecord(item) {
  return {
    id: item.batchCode || item.id,
    location: item.receivedFrom || "Distribution site",
    dateTime: item.distributedAt
      ? new Date(item.distributedAt).toLocaleString("en-IN")
      : "—",
    foodType: item.itemName,
    quantity: `${item.distributedQuantity} ${item.quantityUnit || "meals"}`,
    mealsServed: item.estimatedMeals || item.distributedQuantity,
    beneficiaries: item.estimatedMeals || 0,
    group: "Community",
    notes: item.notes || "",
    eventType: "individual",
  };
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
  return (data.data.beneficiaries || []).map(apiBeneficiaryToUi);
}

export async function createBeneficiary(payload) {
  const { data } = await ngoApi.createBeneficiary(payload);
  return apiBeneficiaryToUi(data.data.beneficiary);
}

export async function updateBeneficiary(id, payload) {
  const { data } = await ngoApi.updateBeneficiary(id, payload);
  return apiBeneficiaryToUi(data.data.beneficiary);
}

export async function distributeInventory(id, payload) {
  const { data } = await ngoApi.distributeInventory(id, payload);
  return data.data;
}

export async function fetchDistributionRecords(params) {
  const { data } = await ngoApi.listDistributionRecords(params);
  return data.data.records || [];
}

export default {
  fetchNgoDashboard,
  fetchIncomingDonations,
  fetchAcceptedDonations,
  fetchAvailableDonations,
  fetchDonationDetail,
  fetchDonationStatistics,
  fetchIncomingDeliveries,
  fetchNgoImpactStats,
  buildDonationQueryParams,
  acceptDonation,
  rejectDonation,
  completeDonation,
  fetchNgoInventory,
  fetchInventoryStatistics,
  fetchBeneficiaries,
  createBeneficiary,
  updateBeneficiary,
  fetchDistributionRecords,
  distributeInventory,
  apiInventoryToDistributionBatch,
  apiInventoryToDistributionRecord,
};
