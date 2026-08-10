import { STATUS_LABELS, ACTIVE_DONATION_STATUSES } from "../constants/status.js";

function formatAddress(address) {
  if (!address) return "";
  return [address.line1, address.line2, address.city, address.state, address.pincode]
    .filter(Boolean)
    .join(", ");
}

function formatDateLabel(date) {
  if (!date) return "";
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatQuantity(donation) {
  const unit = donation.quantityUnit || "kg";
  const itemCount = donation.items?.length || 0;
  if (itemCount > 1) {
    return `${donation.quantity} ${unit} · ${itemCount} items`;
  }
  return `${donation.quantity} ${unit}`;
}

export function mapDonationResponse(donation) {
  const isActive = ACTIVE_DONATION_STATUSES.has(donation.status);
  const ngoName = donation.ngoId?.ngoName || null;
  const volunteerLabel = donation.volunteerId
    ? `Volunteer #${String(donation.volunteerId._id || donation.volunteerId).slice(-4)}`
    : null;

  return {
    id: donation._id,
    donationCode: donation.donationCode,
    donorId: donation.donorId,
    foodName: donation.foodType,
    foodType: donation.foodType,
    food: donation.foodType,
    category: donation.category,
    quantity: donation.quantity,
    quantityUnit: donation.quantityUnit,
    quantityLabel: formatQuantity(donation),
    estimatedMeals: donation.estimatedMeals,
    freshness: donation.freshness,
    preparationTime: donation.preparationTime,
    expiryTime: donation.expiryTime,
    images: donation.images || [],
    image: donation.images?.[0] || null,
    pickupAddress: formatAddress(donation.pickupAddress),
    pickupAddressStructured: donation.pickupAddress,
    pickupLocation: donation.pickupLocation,
    pickupScheduledAt: donation.pickupScheduledAt,
    pickupEndAt: donation.pickupEndAt,
    pickupDate: donation.pickupScheduledAt,
    pickupTime: formatDateLabel(donation.pickupScheduledAt),
    notes: donation.notes,
    dietType: donation.dietType,
    packagingStatus: donation.packagingStatus,
    allergenInfo: donation.allergenInfo,
    items: donation.items || [],
    itemCount: donation.items?.length || 0,
    ngoId: donation.ngoId?._id || donation.ngoId || null,
    ngo: ngoName,
    matchedNgo: ngoName,
    volunteerId: donation.volunteerId?._id || donation.volunteerId || null,
    volunteer: volunteerLabel,
    status: donation.status,
    statusLabel: STATUS_LABELS[donation.status] || donation.status,
    priority: donation.priority,
    isActive,
    date: donation.createdAt,
    dateLabel: formatDateLabel(donation.pickupScheduledAt || donation.createdAt),
    postedAt: formatDateLabel(donation.createdAt),
    pickedUpAt: donation.pickedUpAt,
    deliveredAt: donation.deliveredAt,
    rejectionReason: donation.rejectionReason,
    createdAt: donation.createdAt,
    updatedAt: donation.updatedAt,
  };
}

export default { mapDonationResponse };
