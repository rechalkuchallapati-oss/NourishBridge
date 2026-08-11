import {
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  USER_ROLES,
} from "../constants/enums.js";
import notificationService from "./notification.service.js";
import {
  emitNewDonation,
  emitNgoAccepted,
  emitVolunteerAssigned,
  emitPickupStatus,
  emitDeliveryStatus,
  emitCriticalAlert,
} from "./realtimeEvents.service.js";

const { notifyUsers, notifyRole, getDonationParticipantUserIds, createNotification } =
  notificationService;

function donationRef(donation) {
  return donation.donationCode || String(donation._id).slice(-6).toUpperCase();
}

export async function notifyDonationCreated(donation, donorName) {
  await notifyRole(USER_ROLES.ADMIN, {
    type: NOTIFICATION_TYPES.VERIFICATION,
    title: "New donation pending review",
    message: `${donorName || "A donor"} submitted ${donation.foodType} (${donation.quantity} ${donation.quantityUnit}) for verification.`,
    priority: NOTIFICATION_PRIORITY.MEDIUM,
    relatedEntity: { entityType: "Donation", entityId: donation._id },
    actionUrl: `/admin/donations`,
    metadata: { event: "donation_created", donationCode: donation.donationCode },
  });
  emitNewDonation(donation, donorName);
}

export async function notifyDonationAccepted(donation) {
  const { donorUserId, ngoUserId } = await getDonationParticipantUserIds(donation);
  await notifyUsers([donorUserId], {
    type: NOTIFICATION_TYPES.DONATION,
    title: "Donation accepted by NGO",
    message: `Your donation ${donationRef(donation)} was accepted and will be scheduled for pickup.`,
    priority: NOTIFICATION_PRIORITY.MEDIUM,
    relatedEntity: { entityType: "Donation", entityId: donation._id },
    actionUrl: `/dashboard/donor/donations`,
    metadata: { event: "donation_accepted" },
  });
  emitNgoAccepted(donation, [donorUserId, ngoUserId]);
}

export async function notifyVolunteerAssigned(donation) {
  const { donorUserId, ngoUserId, volunteerUserId } =
    await getDonationParticipantUserIds(donation);

  await notifyUsers([donorUserId, ngoUserId, volunteerUserId], {
    type: NOTIFICATION_TYPES.DELIVERY,
    title: "Volunteer assigned",
    message: `A volunteer has been assigned to donation ${donationRef(donation)}.`,
    priority: NOTIFICATION_PRIORITY.HIGH,
    relatedEntity: { entityType: "Donation", entityId: donation._id },
    actionUrl: `/dashboard/volunteer/active`,
    metadata: { event: "volunteer_assigned" },
  });
  emitVolunteerAssigned(donation, [donorUserId, ngoUserId, volunteerUserId]);
}

export async function notifyPickupScheduled(donation) {
  const { donorUserId, volunteerUserId } = await getDonationParticipantUserIds(donation);

  await notifyUsers([donorUserId, volunteerUserId], {
    type: NOTIFICATION_TYPES.DELIVERY,
    title: "Pickup scheduled",
    message: `Pickup for donation ${donationRef(donation)} has been scheduled.`,
    priority: NOTIFICATION_PRIORITY.MEDIUM,
    relatedEntity: { entityType: "Donation", entityId: donation._id },
    metadata: { event: "pickup_scheduled" },
  });
  emitPickupStatus(donation, "pickup_scheduled", [donorUserId, volunteerUserId]);
}

export async function notifyPickupCompleted(donation) {
  const { donorUserId, ngoUserId, volunteerUserId } =
    await getDonationParticipantUserIds(donation);

  await notifyUsers([donorUserId, ngoUserId, volunteerUserId], {
    type: NOTIFICATION_TYPES.DELIVERY,
    title: "Pickup completed",
    message: `Food from donation ${donationRef(donation)} has been collected and is ready for delivery.`,
    priority: NOTIFICATION_PRIORITY.MEDIUM,
    relatedEntity: { entityType: "Donation", entityId: donation._id },
    metadata: { event: "pickup_completed" },
  });
  emitPickupStatus(donation, "pickup_completed", [donorUserId, ngoUserId, volunteerUserId]);
}

export async function notifyDeliveryStarted(donation) {
  const { donorUserId, ngoUserId } = await getDonationParticipantUserIds(donation);

  await notifyUsers([donorUserId, ngoUserId], {
    type: NOTIFICATION_TYPES.DELIVERY,
    title: "Delivery started",
    message: `Volunteer is en route with donation ${donationRef(donation)}.`,
    priority: NOTIFICATION_PRIORITY.MEDIUM,
    relatedEntity: { entityType: "Donation", entityId: donation._id },
    metadata: { event: "delivery_started" },
  });
  emitDeliveryStatus(donation, "delivery_started", [donorUserId, ngoUserId]);
}

export async function notifyDeliveryCompleted(donation) {
  const { donorUserId, ngoUserId, volunteerUserId } =
    await getDonationParticipantUserIds(donation);

  await notifyUsers([donorUserId, ngoUserId, volunteerUserId], {
    type: NOTIFICATION_TYPES.DELIVERY,
    title: "Delivery completed",
    message: `Donation ${donationRef(donation)} has been delivered. NGO will confirm receipt.`,
    priority: NOTIFICATION_PRIORITY.HIGH,
    relatedEntity: { entityType: "Donation", entityId: donation._id },
    metadata: { event: "delivery_completed" },
  });

  await notifyRole(USER_ROLES.ADMIN, {
    type: NOTIFICATION_TYPES.DELIVERY,
    title: "Delivery completed",
    message: `Donation ${donationRef(donation)} was delivered successfully.`,
    priority: NOTIFICATION_PRIORITY.LOW,
    relatedEntity: { entityType: "Donation", entityId: donation._id },
    metadata: { event: "delivery_completed_admin" },
  });
  emitDeliveryStatus(
    donation,
    "delivery_completed",
    [donorUserId, ngoUserId, volunteerUserId],
  );
}

export async function notifyFoodRequestCreated(foodRequest, ngoName) {
  await notifyRole(USER_ROLES.ADMIN, {
    type: NOTIFICATION_TYPES.FOOD_REQUEST,
    title: "New food request",
    message: `${ngoName || "An NGO"} requested ${foodRequest.quantityNeeded} ${foodRequest.quantityUnit} of ${foodRequest.foodItem || foodRequest.title}.`,
    priority: NOTIFICATION_PRIORITY.MEDIUM,
    relatedEntity: { entityType: "FoodRequest", entityId: foodRequest._id },
    actionUrl: `/admin/food-requests`,
    metadata: { event: "food_request_created", requestCode: foodRequest.requestCode },
  });
}

export async function notifyFoodRequestFulfilled(foodRequest, ngoUserId) {
  await notifyUsers([ngoUserId], {
    type: NOTIFICATION_TYPES.FOOD_REQUEST,
    title: "Food request fulfilled",
    message: `Your request ${foodRequest.requestCode || ""} has been fulfilled.`,
    priority: NOTIFICATION_PRIORITY.MEDIUM,
    relatedEntity: { entityType: "FoodRequest", entityId: foodRequest._id },
    actionUrl: `/dashboard/ngo/food-requests`,
    metadata: { event: "food_request_fulfilled" },
  });
}

export async function notifyInventoryNearExpiry(ngoUserId, items) {
  if (!items?.length || !ngoUserId) return;

  const names = items
    .slice(0, 3)
    .map((i) => i.itemName || i.batchCode)
    .join(", ");

  await createNotification({
    userId: ngoUserId,
    type: NOTIFICATION_TYPES.INVENTORY,
    title: "Inventory expiry alert",
    message: `${items.length} batch(es) nearing expiry: ${names}${items.length > 3 ? "…" : ""}.`,
    priority: NOTIFICATION_PRIORITY.HIGH,
    relatedEntity: items[0]?.id
      ? { entityType: "Inventory", entityId: items[0].id }
      : null,
    actionUrl: `/dashboard/ngo/inventory`,
    metadata: { event: "inventory_near_expiry", count: items.length },
  });
  emitCriticalAlert(
    "Inventory expiry alert",
    `${items.length} batch(es) nearing expiry`,
    [ngoUserId],
  );
}

export default {
  notifyDonationCreated,
  notifyDonationAccepted,
  notifyVolunteerAssigned,
  notifyPickupScheduled,
  notifyPickupCompleted,
  notifyDeliveryStarted,
  notifyDeliveryCompleted,
  notifyFoodRequestCreated,
  notifyFoodRequestFulfilled,
  notifyInventoryNearExpiry,
};
