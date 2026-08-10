import donationApi, { resolveImageUrl } from "../api/client.js";
import {
  categoryToApi,
  categoryToUi,
  parseQuantityString,
  parseDateTimeParts,
  buildAddressFromText,
  isoToDateTimeParts,
} from "../utils/donationMappers.js";
import { getDonationFoodImage } from "../../../data/donationFoodAssets";
import { getStatusLabel } from "../../../constants/donationStatus";

const PICKUP_STATUSES = new Set([
  "ngo_accepted",
  "volunteer_assigned",
  "pickup_scheduled",
  "picked_up",
]);

export function createFormToPayload(form) {
  const { quantity, quantityUnit } = parseQuantityString(form.quantity);

  return {
    foodName: form.foodName,
    category: categoryToApi(form.category),
    quantity,
    quantityUnit,
    estimatedMeals: Number(form.estimatedServings) || 0,
    freshness: form.freshness || "good",
    preparationTime: parseDateTimeParts(form.preparationDate, form.preparationTime),
    expiryTime: parseDateTimeParts(form.consumptionDate, form.consumptionTime),
    pickupScheduledAt: parseDateTimeParts(form.pickupStartDate, form.pickupStartTime),
    pickupEndAt: parseDateTimeParts(form.pickupEndDate, form.pickupEndTime),
    pickupAddress: buildAddressFromText(form.pickupAddress),
    notes: [form.allergenInfo, form.packagingStatus ? `Packaging: ${form.packagingStatus}` : ""]
      .filter(Boolean)
      .join("\n"),
    dietType: form.dietType,
    packagingStatus: form.packagingStatus,
    allergenInfo: form.allergenInfo,
  };
}

export function donationToForm(donation) {
  const prep = isoToDateTimeParts(donation.preparationTime);
  const expiry = isoToDateTimeParts(donation.expiryTime);
  const pickupStart = isoToDateTimeParts(donation.pickupScheduledAt);
  const pickupEnd = isoToDateTimeParts(donation.pickupEndAt);

  return {
    category: categoryToUi(donation.category),
    foodName: donation.foodName || donation.food || "",
    dietType: donation.dietType || "vegetarian",
    quantity: donation.quantityLabel || `${donation.quantity} ${donation.quantityUnit || "kg"}`,
    estimatedServings: String(donation.estimatedMeals ?? ""),
    freshness: donation.freshness || "good",
    preparationDate: prep.date,
    preparationTime: prep.time,
    consumptionDate: expiry.date,
    consumptionTime: expiry.time,
    packagingStatus: donation.packagingStatus || "",
    allergenInfo: donation.allergenInfo || "",
    pickupAddress: donation.pickupAddress || "",
    pickupStartDate: pickupStart.date,
    pickupStartTime: pickupStart.time,
    pickupEndDate: pickupEnd.date,
    pickupEndTime: pickupEnd.time,
  };
}

export function apiDonationToUi(donation) {
  const imageUrl = donation.images?.[0] ? resolveImageUrl(donation.images[0]) : getDonationFoodImage(donation);

  return {
    ...donation,
    id: donation.donationCode || donation.id,
    mongoId: donation.id,
    food: donation.foodName || donation.food,
    category: categoryToUi(donation.category),
    quantity: donation.quantityLabel || `${donation.quantity} ${donation.quantityUnit || "kg"}`,
    ngo: donation.ngo || donation.matchedNgo || "Awaiting match",
    matchedNgo: donation.matchedNgo || donation.ngo || "Awaiting match",
    image: imageUrl,
    images: (donation.images || []).map(resolveImageUrl),
    eventType: "individual",
    isActive: donation.isActive,
    statusLabel: donation.statusLabel || getStatusLabel(donation.status),
    postedAt: donation.postedAt || donation.dateLabel,
    canEdit: donation.status === "pending",
    canCancel: ["pending", "verified", "ngo_accepted"].includes(donation.status),
  };
}

export function apiHistoryToUi(entry) {
  return {
    id: entry._id,
    fromStatus: entry.fromStatus,
    toStatus: entry.toStatus,
    action: entry.action,
    actorName: entry.actorName,
    actorRole: entry.actorRole,
    notes: entry.reason || "",
    timestamp: entry.createdAt,
    dateLabel: entry.createdAt
      ? new Date(entry.createdAt).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "",
  };
}

export async function createDonation(form, photoFiles = []) {
  const payload = createFormToPayload(form);
  const { data } = await donationApi.create(payload);
  let donation = data.data.donation;

  if (photoFiles.length > 0) {
    const { data: uploadData } = await donationApi.uploadImages(donation.id, photoFiles);
    donation = uploadData.data.donation;
  }

  return apiDonationToUi(donation);
}

export async function updateDonation(id, form, photoFiles = []) {
  const payload = createFormToPayload(form);
  const { data } = await donationApi.update(id, payload);
  let donation = data.data.donation;

  if (photoFiles.length > 0) {
    const { data: uploadData } = await donationApi.uploadImages(id, photoFiles);
    donation = uploadData.data.donation;
  }

  return apiDonationToUi(donation);
}

export async function fetchMyDonations(params = {}) {
  const { data } = await donationApi.listMine(params);
  const result = data.data;

  return {
    donations: (result.donations || []).map(apiDonationToUi),
    statistics: result.statistics,
    pagination: result.pagination,
  };
}

export async function fetchDonationById(id) {
  const { data } = await donationApi.getById(id);
  return apiDonationToUi(data.data.donation);
}

export async function fetchDonationHistory(id) {
  const { data } = await donationApi.getHistory(id);
  return (data.data.history || []).map(apiHistoryToUi);
}

export async function cancelDonation(id) {
  const { data } = await donationApi.cancel(id);
  return apiDonationToUi(data.data.donation);
}

export function getScheduledPickups(donations) {
  return donations.filter((d) => PICKUP_STATUSES.has(d.status));
}

export function getActiveDonations(donations) {
  return donations.filter((d) => d.isActive);
}

export function getHistoryDonations(donations) {
  return donations.filter((d) => !d.isActive);
}

export function filterDonationsLocal(donations, { dateFilter, statusFilter, view }) {
  const now = new Date();

  return donations.filter((donation) => {
    if (view === "history" && donation.isActive) return false;
    if (view === "active" && !donation.isActive) return false;

    if (statusFilter === "active" && !donation.isActive) return false;
    if (statusFilter && statusFilter !== "all" && statusFilter !== "active") {
      if (donation.status !== statusFilter) return false;
    }

    if (!dateFilter || dateFilter === "all") return true;
    if (!donation.createdAt && !donation.date) return true;

    const donationDate = new Date(donation.createdAt || donation.date);
    const days = Number(dateFilter);
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    return donationDate >= cutoff;
  });
}

export default {
  createDonation,
  updateDonation,
  fetchMyDonations,
  fetchDonationById,
  fetchDonationHistory,
  cancelDonation,
  createFormToPayload,
  donationToForm,
  apiDonationToUi,
  apiHistoryToUi,
  getScheduledPickups,
  getActiveDonations,
  getHistoryDonations,
  filterDonationsLocal,
};
