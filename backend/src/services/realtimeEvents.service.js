import {
  emitToUser,
  emitToRole,
  emitToAdmins,
  emitToDelivery,
  REALTIME_EVENTS,
} from "./socket.service.js";
import { USER_ROLES } from "../constants/enums.js";

export function emitRealtimeNotification(userIds, notification, eventType = REALTIME_EVENTS.NOTIFICATION) {
  const payload = {
    type: eventType,
    notification,
    timestamp: new Date().toISOString(),
  };
  (userIds || []).filter(Boolean).forEach((userId) => {
    emitToUser(userId, REALTIME_EVENTS.NOTIFICATION, payload);
  });
}

export function emitVolunteerAssigned(donation, userIds) {
  emitRealtimeNotification(userIds, {
    title: "Volunteer assigned",
    message: `Volunteer assigned to donation ${donation.donationCode || donation._id}`,
    metadata: { donationId: donation._id, event: "volunteer_assigned" },
  }, REALTIME_EVENTS.VOLUNTEER_ASSIGNED);
}

export function emitPickupStatus(donation, status, userIds, deliveryId = null) {
  const payload = {
    type: REALTIME_EVENTS.PICKUP_STATUS,
    donationId: donation._id,
    donationCode: donation.donationCode,
    status,
    timestamp: new Date().toISOString(),
  };
  userIds.filter(Boolean).forEach((id) => emitToUser(id, REALTIME_EVENTS.PICKUP_STATUS, payload));
  if (deliveryId) emitToDelivery(deliveryId, REALTIME_EVENTS.PICKUP_STATUS, payload);
}

export function emitDeliveryStatus(donation, status, userIds, deliveryId = null) {
  const payload = {
    type: REALTIME_EVENTS.DELIVERY_STATUS,
    donationId: donation._id,
    donationCode: donation.donationCode,
    status,
    deliveryId,
    timestamp: new Date().toISOString(),
  };
  userIds.filter(Boolean).forEach((id) => emitToUser(id, REALTIME_EVENTS.DELIVERY_STATUS, payload));
  if (deliveryId) emitToDelivery(deliveryId, REALTIME_EVENTS.DELIVERY_STATUS, payload);
}

export function emitNewDonation(donation, donorName) {
  emitToAdmins(REALTIME_EVENTS.NEW_DONATION, {
    type: REALTIME_EVENTS.NEW_DONATION,
    title: "New donation submitted",
    message: `${donorName || "Donor"} submitted ${donation.foodType}`,
    donationId: donation._id,
    donationCode: donation.donationCode,
    timestamp: new Date().toISOString(),
  });
  emitToRole(USER_ROLES.ADMIN, REALTIME_EVENTS.ADMIN_UPDATE, {
    type: "new_donation",
    donationId: donation._id,
  });
}

export function emitNgoAccepted(donation, userIds) {
  emitRealtimeNotification(userIds, {
    title: "NGO accepted donation",
    message: `Donation ${donation.donationCode || donation._id} accepted by NGO`,
    metadata: { donationId: donation._id, event: "ngo_accepted" },
  }, REALTIME_EVENTS.NGO_ACCEPTED);
}

export function emitCriticalAlert(title, message, userIds = []) {
  const payload = {
    type: REALTIME_EVENTS.CRITICAL_ALERT,
    title,
    message,
    timestamp: new Date().toISOString(),
  };
  emitToAdmins(REALTIME_EVENTS.CRITICAL_ALERT, payload);
  userIds.filter(Boolean).forEach((id) => emitToUser(id, REALTIME_EVENTS.CRITICAL_ALERT, payload));
}

export default {
  emitRealtimeNotification,
  emitVolunteerAssigned,
  emitPickupStatus,
  emitDeliveryStatus,
  emitNewDonation,
  emitNgoAccepted,
  emitCriticalAlert,
};
