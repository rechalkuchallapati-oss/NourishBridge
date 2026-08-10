function formatTs(date) {
  if (!date) return null;
  return new Date(date).toISOString();
}

export function mapDeliveryResponse(delivery) {
  if (!delivery) return null;

  const donation = delivery.donationId;

  return {
    id: delivery._id,
    deliveryCode: delivery.deliveryCode,
    donationId: donation?._id || delivery.donationId,
    donationCode: donation?.donationCode,
    foodName: donation?.foodType,
    volunteerId: delivery.volunteerId?._id || delivery.volunteerId,
    volunteer: delivery.volunteerId,
    ngoId: delivery.ngoId?._id || delivery.ngoId,
    ngo: delivery.ngoId?.ngoName || delivery.ngoId,
    status: delivery.status,
    pickupLocation: delivery.pickupLocation,
    deliveryLocation: delivery.deliveryLocation,
    currentLocation: delivery.currentLocation,
    pickupScheduledAt: formatTs(delivery.pickupScheduledAt),
    arrivedAtPickupAt: formatTs(delivery.arrivedAtPickupAt),
    pickupVerifiedAt: formatTs(delivery.pickupVerifiedAt),
    pickedUpAt: formatTs(delivery.pickedUpAt),
    deliveryStartedAt: formatTs(delivery.deliveryStartedAt),
    arrivedAtNgoAt: formatTs(delivery.arrivedAtNgoAt),
    deliveryVerifiedAt: formatTs(delivery.deliveryVerifiedAt),
    deliveredAt: formatTs(delivery.deliveredAt),
    completedAt: formatTs(delivery.completedAt),
    assignedAt: formatTs(delivery.assignedAt),
    expectedQuantity: delivery.expectedQuantity,
    pickupQuantity: delivery.pickupQuantity,
    deliveryQuantity: delivery.deliveryQuantity,
    quantityUnit: delivery.quantityUnit,
    pickupProofImages: delivery.pickupProofImages || [],
    deliveryProofImages: delivery.deliveryProofImages || delivery.proofImages || [],
    pickupVerificationCode: delivery.pickupVerificationCode,
    deliveryVerificationCode: delivery.deliveryVerificationCode,
    timeline: delivery.timeline || [],
    eta: formatTs(delivery.eta),
    distanceKm: delivery.distanceKm,
    failureReason: delivery.failureReason,
    notes: delivery.notes,
    createdAt: formatTs(delivery.createdAt),
    updatedAt: formatTs(delivery.updatedAt),
  };
}

export default { mapDeliveryResponse };
