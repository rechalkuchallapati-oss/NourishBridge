import Delivery from "../../../models/Delivery.model.js";
import Donation from "../../../models/Donation.model.js";
import DonationStatusHistory from "../../../models/DonationStatusHistory.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import NGO from "../../../models/NGO.model.js";
import ApiError from "../../../utils/ApiError.js";
import {
  DELIVERY_STATUS,
  DONATION_STATUS,
  AUDIT_ACTIONS,
  AUDIT_MODULES,
  USER_ROLES,
} from "../../../constants/enums.js";
import { logAudit, auditFromRequest } from "../../../services/audit.service.js";
import { createInventoryFromDelivery } from "./inventoryIntegration.service.js";
import {
  DELIVERY_ACTIONS,
  DELIVERY_TRANSITIONS,
  DELIVERY_TO_DONATION_STATUS,
  TERMINAL_DELIVERY_STATUSES,
} from "../constants/transitions.js";
import { mapDeliveryResponse } from "../utils/delivery.mapper.js";
import {
  notifyPickupScheduled,
  notifyPickupCompleted,
  notifyDeliveryStarted,
  notifyDeliveryCompleted,
} from "../../../services/notificationEvents.service.js";

function buildLocation(coords) {
  if (!coords || coords.length !== 2) return null;
  return { type: "Point", coordinates: coords };
}

async function syncDonationStatus(donation, deliveryStatus, actor, action, reqMeta) {
  const mapped = DELIVERY_TO_DONATION_STATUS[deliveryStatus];
  if (!mapped || donation.status === mapped) return;

  const fromStatus = donation.status;
  donation.status = mapped;

  if (deliveryStatus === DELIVERY_STATUS.PICKED_UP) {
    donation.pickedUpAt = new Date();
  }
  if ([DELIVERY_STATUS.DELIVERY_VERIFIED, DELIVERY_STATUS.DELIVERED].includes(deliveryStatus)) {
    donation.deliveredAt = new Date();
  }
  if (deliveryStatus === DELIVERY_STATUS.COMPLETED) {
    donation.status = DONATION_STATUS.COMPLETED;
  }

  await donation.save();

  await DonationStatusHistory.create({
    donationId: donation._id,
    fromStatus,
    toStatus: donation.status,
    action: `delivery_${action}`,
    actorId: actor.id,
    actorRole: actor.role,
    actorName: actor.fullName,
    metadata: { deliveryStatus },
    ipAddress: reqMeta?.ipAddress,
    userAgent: reqMeta?.userAgent,
  });
}

export async function executeDeliveryTransition(
  deliveryId,
  action,
  actor,
  {
    req = null,
    quantity = null,
    location = null,
    notes = null,
    verificationCode = null,
    scheduledAt = null,
  } = {},
) {
  const rule = DELIVERY_TRANSITIONS[action];
  if (!rule) throw ApiError.badRequest(`Unknown delivery action: ${action}`);
  if (!rule.roles.includes(actor.role)) {
    throw ApiError.forbidden(`Role '${actor.role}' cannot perform '${action}'`);
  }

  const delivery = await Delivery.findById(deliveryId);
  if (!delivery) throw ApiError.notFound("Delivery not found");

  if (TERMINAL_DELIVERY_STATUSES.has(delivery.status)) {
    throw ApiError.badRequest(`Delivery is already ${delivery.status}`);
  }

  if (!rule.from.includes(delivery.status)) {
    throw ApiError.badRequest(
      `Cannot '${action}' from '${delivery.status}'. Allowed: ${rule.from.join(", ")}`,
    );
  }

  if (actor.role === USER_ROLES.VOLUNTEER) {
    const volunteer = await Volunteer.findOne({ userId: actor.id, isActive: true });
    if (!volunteer || String(delivery.volunteerId) !== String(volunteer._id)) {
      throw ApiError.forbidden("This delivery is not assigned to you");
    }
  }

  if (actor.role === USER_ROLES.NGO && action === DELIVERY_ACTIONS.COMPLETE) {
    const ngo = await NGO.findOne({ userId: actor.id });
    if (!ngo || String(delivery.ngoId) !== String(ngo._id)) {
      throw ApiError.forbidden("This delivery is not for your NGO");
    }
  }

  const now = new Date();
  const loc = buildLocation(location?.coordinates || location);

  switch (action) {
    case DELIVERY_ACTIONS.SCHEDULE_PICKUP:
      delivery.pickupScheduledAt = scheduledAt ? new Date(scheduledAt) : now;
      delivery.addTimelineEvent(rule.to, notes || "Pickup scheduled", loc);
      break;

    case DELIVERY_ACTIONS.ARRIVE_AT_PICKUP:
      delivery.arrivedAtPickupAt = now;
      if (loc) delivery.currentLocation = loc;
      delivery.addTimelineEvent(rule.to, notes || "Arrived at pickup location", loc);
      break;

    case DELIVERY_ACTIONS.VERIFY_PICKUP:
      delivery.pickupVerifiedAt = now;
      delivery.pickupQuantity = quantity ?? delivery.expectedQuantity;
      if (verificationCode) delivery.pickupVerificationCode = verificationCode;
      if (loc) delivery.currentLocation = loc;
      delivery.addTimelineEvent(rule.to, notes || "Pickup verified", loc, delivery.pickupQuantity);
      break;

    case DELIVERY_ACTIONS.COLLECT_FOOD:
      delivery.pickedUpAt = now;
      delivery.pickupQuantity = quantity ?? delivery.pickupQuantity ?? delivery.expectedQuantity;
      if (loc) delivery.currentLocation = loc;
      delivery.addTimelineEvent(rule.to, notes || "Food collected", loc, delivery.pickupQuantity);
      break;

    case DELIVERY_ACTIONS.START_DELIVERY:
      delivery.deliveryStartedAt = now;
      if (loc) delivery.currentLocation = loc;
      delivery.addTimelineEvent(rule.to, notes || "Delivery started", loc);
      break;

    case DELIVERY_ACTIONS.ARRIVE_AT_NGO:
      delivery.arrivedAtNgoAt = now;
      if (loc) {
        delivery.currentLocation = loc;
        delivery.deliveryLocation = loc;
      }
      delivery.addTimelineEvent(rule.to, notes || "Arrived at NGO", loc);
      break;

    case DELIVERY_ACTIONS.VERIFY_DELIVERY:
      delivery.deliveryVerifiedAt = now;
      delivery.deliveredAt = now;
      delivery.deliveryQuantity = quantity ?? delivery.pickupQuantity ?? delivery.expectedQuantity;
      if (verificationCode) delivery.deliveryVerificationCode = verificationCode;
      delivery.status = DELIVERY_STATUS.DELIVERED;
      delivery.addTimelineEvent(
        DELIVERY_STATUS.DELIVERY_VERIFIED,
        notes || "Delivery verified",
        loc,
        delivery.deliveryQuantity,
      );
      break;

    case DELIVERY_ACTIONS.COMPLETE:
      delivery.completedAt = now;
      delivery.addTimelineEvent(rule.to, notes || "Delivery completed", loc);
      break;

    case DELIVERY_ACTIONS.FAIL:
      delivery.failureReason = notes || "Delivery failed";
      delivery.addTimelineEvent(rule.to, delivery.failureReason, loc);
      break;

    case DELIVERY_ACTIONS.CANCEL:
      delivery.failureReason = notes || "Delivery cancelled";
      delivery.addTimelineEvent(rule.to, delivery.failureReason, loc);
      break;

    default:
      delivery.addTimelineEvent(rule.to, notes, loc, quantity);
  }

  if (action !== DELIVERY_ACTIONS.VERIFY_DELIVERY) {
    delivery.status = rule.to;
  }

  await delivery.save();

  const donation = await Donation.findById(delivery.donationId).populate({
    path: "donorId",
    populate: { path: "userId", select: "fullName" },
  });

  const reqMeta = req ? auditFromRequest(req) : {};
  await syncDonationStatus(donation, delivery.status, actor, action, reqMeta);

  if (action === DELIVERY_ACTIONS.COMPLETE) {
    await createInventoryFromDelivery(delivery, donation, delivery.ngoId, actor.id);
  }

  await logAudit({
    actorId: actor.id,
    actorRole: actor.role,
    actorName: actor.fullName,
    action: AUDIT_ACTIONS.STATUS_CHANGE,
    module: AUDIT_MODULES.DELIVERIES,
    entity: { entityType: "Delivery", entityId: delivery._id },
    description: `Delivery ${delivery.deliveryCode}: ${action}`,
    details: { action, status: delivery.status, quantity, notes },
    ...reqMeta,
  });

  const donationObj = donation?.toObject ? donation.toObject() : donation;
  if (donationObj) {
    const notifyMap = {
      [DELIVERY_ACTIONS.SCHEDULE_PICKUP]: () => notifyPickupScheduled(donationObj),
      [DELIVERY_ACTIONS.COLLECT_FOOD]: () => notifyPickupCompleted(donationObj),
      [DELIVERY_ACTIONS.START_DELIVERY]: () => notifyDeliveryStarted(donationObj),
      [DELIVERY_ACTIONS.VERIFY_DELIVERY]: () => notifyDeliveryCompleted(donationObj),
      [DELIVERY_ACTIONS.COMPLETE]: () => notifyDeliveryCompleted(donationObj),
    };
    notifyMap[action]?.()?.catch?.(() => {});
  }

  return mapDeliveryResponse(
    await Delivery.findById(delivery._id)
      .populate("volunteerId", "vehicleType rating")
      .populate("ngoId", "ngoName")
      .populate({ path: "donationId", select: "foodType donationCode quantity quantityUnit" })
      .lean(),
  );
}

export async function findDeliveryByDonation(donationId) {
  return Delivery.findOne({ donationId })
    .populate("volunteerId", "vehicleType rating")
    .populate("ngoId", "ngoName address")
    .populate({ path: "donationId", select: "foodType donationCode quantity quantityUnit expiryTime" })
    .lean();
}

export default { executeDeliveryTransition, findDeliveryByDonation, DELIVERY_ACTIONS };
