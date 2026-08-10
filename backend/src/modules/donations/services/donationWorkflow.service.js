import Donation from "../../../models/Donation.model.js";
import DonationStatusHistory from "../../../models/DonationStatusHistory.model.js";
import Delivery from "../../../models/Delivery.model.js";
import Donor from "../../../models/Donor.model.js";
import NGO from "../../../models/NGO.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import ApiError from "../../../utils/ApiError.js";
import { DONATION_STATUS, USER_ROLES, AUDIT_ACTIONS, AUDIT_MODULES, DELIVERY_STATUS } from "../../../constants/enums.js";
import { logAudit, auditFromRequest } from "../../../services/audit.service.js";
import { mapDonationResponse } from "../utils/donation.mapper.js";
import {
  DONATION_ACTIONS,
  DONATION_TRANSITIONS,
  TERMINAL_DONATION_STATUSES,
} from "../constants/transitions.js";
import {
  notifyDonationAccepted,
  notifyVolunteerAssigned,
} from "../../../services/notificationEvents.service.js";
import { initializeDeliveryVerification } from "../../deliveries/utils/deliveryInit.js";

async function recordHistory(donationId, fromStatus, toStatus, action, actor, reason, reqMeta) {
  return DonationStatusHistory.create({
    donationId,
    fromStatus,
    toStatus,
    action,
    actorId: actor.id,
    actorRole: actor.role,
    actorName: actor.fullName || actor.name || "User",
    reason,
    metadata: {},
    ipAddress: reqMeta?.ipAddress,
    userAgent: reqMeta?.userAgent,
  });
}

async function populateDonation(donationId) {
  return Donation.findById(donationId)
    .populate("ngoId", "ngoName")
    .populate("volunteerId", "vehicleType rating")
    .populate({ path: "donorId", populate: { path: "userId", select: "fullName" } })
    .lean();
}

function assertRole(action, actorRole) {
  const rule = DONATION_TRANSITIONS[action];
  if (!rule) {
    throw ApiError.badRequest(`Unknown workflow action: ${action}`);
  }
  if (!rule.roles.includes(actorRole)) {
    throw ApiError.forbidden(`Role '${actorRole}' cannot perform '${action}'`);
  }
  return rule;
}

async function assertNgoOwnsDonation(donation, ngoId) {
  if (String(donation.ngoId) !== String(ngoId)) {
    throw ApiError.forbidden("This donation is not assigned to your NGO");
  }
}

async function assertVolunteerOwnsDonation(donation, volunteerId) {
  if (donation.volunteerId && String(donation.volunteerId) !== String(volunteerId)) {
    throw ApiError.forbidden("This donation is assigned to another volunteer");
  }
}

export async function executeDonationTransition(
  donationId,
  action,
  actor,
  { reason = null, req = null, volunteerId = null, ngoId = null } = {},
) {
  const rule = assertRole(action, actor.role);
  const reqMeta = req ? auditFromRequest(req) : {};

  const donation = await Donation.findById(donationId);
  if (!donation) {
    throw ApiError.notFound("Donation not found");
  }

  if (TERMINAL_DONATION_STATUSES.has(donation.status)) {
    throw ApiError.badRequest(`Donation is already ${donation.status} and cannot be updated`);
  }

  if (!rule.from.includes(donation.status)) {
    throw ApiError.badRequest(
      `Cannot '${action}' from status '${donation.status}'. Allowed from: ${rule.from.join(", ")}`,
    );
  }

  const fromStatus = donation.status;
  const toStatus = rule.to;

  if (action === DONATION_ACTIONS.CANCEL) {
    const donor = await Donor.findOne({ userId: actor.id, isActive: true });
    if (!donor || String(donation.donorId) !== String(donor._id)) {
      throw ApiError.forbidden("You can only cancel your own donations");
    }
  }

  if (action === DONATION_ACTIONS.ACCEPT) {
    const ngo = await NGO.findOne({ userId: actor.id });
    if (!ngo) throw ApiError.notFound("NGO profile not found");
    if (donation.ngoId && String(donation.ngoId) !== String(ngo._id)) {
      throw ApiError.conflict("Donation already accepted by another NGO");
    }
    donation.ngoId = ngo._id;
    ngoId = ngo._id;
  }

  if (action === DONATION_ACTIONS.REJECT && actor.role === USER_ROLES.NGO) {
    const ngo = await NGO.findOne({ userId: actor.id });
    if (!ngo) throw ApiError.notFound("NGO profile not found");
    if (fromStatus === DONATION_STATUS.VERIFIED && !donation.ngoId) {
      // NGO declining before accept — no ownership required
    } else {
      await assertNgoOwnsDonation(donation, ngo._id);
    }
    if (reason) donation.rejectionReason = reason;
  }

  if (action === DONATION_ACTIONS.REJECT && actor.role === USER_ROLES.ADMIN && reason) {
    donation.rejectionReason = reason;
  }

  if (action === DONATION_ACTIONS.ASSIGN_VOLUNTEER) {
    let volunteer;
    if (actor.role === USER_ROLES.VOLUNTEER) {
      volunteer = await Volunteer.findOne({ userId: actor.id, isActive: true });
    } else if (volunteerId) {
      volunteer = await Volunteer.findById(volunteerId);
    }
    if (!volunteer) throw ApiError.notFound("Volunteer not found");
    if (!donation.ngoId) throw ApiError.badRequest("Donation must be accepted by an NGO first");

    await assertVolunteerOwnsDonation(donation, volunteer._id);
    donation.volunteerId = volunteer._id;

    const existingDelivery = await Delivery.findOne({ donationId: donation._id });
    if (!existingDelivery) {
      const delivery = new Delivery({
        donationId: donation._id,
        volunteerId: volunteer._id,
        ngoId: donation.ngoId,
        pickupLocation: donation.pickupLocation,
        deliveryLocation: null,
        expectedQuantity: donation.quantity,
        quantityUnit: donation.quantityUnit,
        pickupScheduledAt: donation.pickupScheduledAt,
        status: DELIVERY_STATUS.ASSIGNED,
        assignedAt: new Date(),
      });
      await initializeDeliveryVerification(delivery, donation.ngoId);
      delivery.addTimelineEvent(DELIVERY_STATUS.ASSIGNED, "Volunteer assigned to mission");
      await delivery.save();
      donation.deliveryId = delivery._id;
    }

    volunteer.isAvailable = false;
    volunteer.availability = "on_mission";
    await volunteer.save();
  }

  if (
    [
      DONATION_ACTIONS.SCHEDULE_PICKUP,
      DONATION_ACTIONS.MARK_PICKED_UP,
      DONATION_ACTIONS.MARK_IN_TRANSIT,
      DONATION_ACTIONS.MARK_DELIVERED,
    ].includes(action)
  ) {
    const volunteer = await Volunteer.findOne({ userId: actor.id, isActive: true });
    if (!volunteer) throw ApiError.notFound("Volunteer profile not found");
    await assertVolunteerOwnsDonation(donation, volunteer._id);

    const delivery = await Delivery.findOne({ donationId: donation._id });
    if (!delivery) throw ApiError.notFound("Delivery record not found");

    const deliveryStatusMap = {
      [DONATION_ACTIONS.SCHEDULE_PICKUP]: DELIVERY_STATUS.EN_ROUTE_PICKUP,
      [DONATION_ACTIONS.MARK_PICKED_UP]: DELIVERY_STATUS.PICKED_UP,
      [DONATION_ACTIONS.MARK_IN_TRANSIT]: DELIVERY_STATUS.IN_TRANSIT,
      [DONATION_ACTIONS.MARK_DELIVERED]: DELIVERY_STATUS.DELIVERED,
    };

    delivery.addTimelineEvent(deliveryStatusMap[action], `Donation ${action.replace(/_/g, " ")}`);

    if (action === DONATION_ACTIONS.MARK_PICKED_UP) {
      donation.pickedUpAt = new Date();
      delivery.pickedUpAt = new Date();
    }
    if (action === DONATION_ACTIONS.MARK_DELIVERED) {
      donation.deliveredAt = new Date();
      delivery.deliveredAt = new Date();
    }

    await delivery.save();
  }

  if (action === DONATION_ACTIONS.COMPLETE) {
    const ngo = await NGO.findOne({ userId: actor.id });
    if (!ngo) throw ApiError.notFound("NGO profile not found");
    await assertNgoOwnsDonation(donation, ngo._id);

    const delivery = await Delivery.findOne({ donationId: donation._id });
    if (delivery && delivery.status !== DELIVERY_STATUS.COMPLETED) {
      const { executeDeliveryTransition } = await import(
        "../../deliveries/services/deliveryWorkflow.service.js"
      );
      const { DELIVERY_ACTIONS: DA } = await import(
        "../../deliveries/constants/transitions.js"
      );

      if ([DELIVERY_STATUS.DELIVERY_VERIFIED, DELIVERY_STATUS.DELIVERED].includes(delivery.status)) {
        await executeDeliveryTransition(delivery._id, DA.COMPLETE, actor, { req });
      }
    }

    if (donation.status !== DONATION_STATUS.COMPLETED) {
      const from = donation.status;
      donation.status = DONATION_STATUS.COMPLETED;
      await donation.save();
      await recordHistory(donation._id, from, DONATION_STATUS.COMPLETED, action, actor, reason, reqMeta);
    }

    await logAudit({
      actorId: actor.id,
      actorRole: actor.role,
      actorName: actor.fullName,
      action: AUDIT_ACTIONS.STATUS_CHANGE,
      module: AUDIT_MODULES.DONATIONS,
      entity: { entityType: "Donation", entityId: donation._id },
      description: `Donation ${donation.donationCode || donation._id} completed`,
      details: { action, reason },
      ...reqMeta,
    });

    const populated = await populateDonation(donation._id);
    return mapDonationResponse(populated);
  }

  donation.status = toStatus;
  await donation.save();

  await recordHistory(donation._id, fromStatus, toStatus, action, actor, reason, reqMeta);

  await logAudit({
    actorId: actor.id,
    actorRole: actor.role,
    actorName: actor.fullName,
    action: AUDIT_ACTIONS.STATUS_CHANGE,
    module: AUDIT_MODULES.DONATIONS,
    entity: { entityType: "Donation", entityId: donation._id },
    description: `Donation ${donation.donationCode || donation._id}: ${fromStatus} → ${toStatus}`,
    details: { action, fromStatus, toStatus, reason },
    ...reqMeta,
  });

  if (action === DONATION_ACTIONS.ACCEPT) {
    notifyDonationAccepted(donation.toObject()).catch(() => {});
  }
  if (action === DONATION_ACTIONS.ASSIGN_VOLUNTEER) {
    notifyVolunteerAssigned(donation.toObject()).catch(() => {});
  }

  const populated = await populateDonation(donation._id);
  return mapDonationResponse(populated);
}

export async function getDonationStatusHistory(donationId) {
  return DonationStatusHistory.find({ donationId })
    .sort({ createdAt: 1 })
    .lean();
}

export async function recordInitialPending(donationId, actor, req = null) {
  const reqMeta = req ? auditFromRequest(req) : {};

  return recordHistory(
    donationId,
    null,
    DONATION_STATUS.PENDING,
    "created",
    actor,
    "Donation submitted",
    reqMeta,
  );
}

export default {
  executeDonationTransition,
  getDonationStatusHistory,
  recordInitialPending,
  DONATION_ACTIONS,
};
