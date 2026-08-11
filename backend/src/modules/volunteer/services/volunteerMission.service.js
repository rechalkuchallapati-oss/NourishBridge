import Donation from "../../../models/Donation.model.js";
import DonationStatusHistory from "../../../models/DonationStatusHistory.model.js";
import Delivery from "../../../models/Delivery.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import ApiError from "../../../utils/ApiError.js";
import { DONATION_STATUS, VOLUNTEER_AVAILABILITY } from "../../../constants/enums.js";
import { getVolunteerForUser } from "../../shared/repositories/roleProfiles.repository.js";
import { mapDonationResponse } from "../../donations/utils/donation.mapper.js";
import donationWorkflow from "../../donations/services/donationWorkflow.service.js";
import { DONATION_ACTIONS } from "../../donations/constants/transitions.js";
import deliveryWorkflow from "../../deliveries/services/deliveryWorkflow.service.js";
import { DELIVERY_ACTIONS } from "../../deliveries/constants/transitions.js";
import { mapDeliveryResponse } from "../../deliveries/utils/delivery.mapper.js";

const LEGACY_ACTION_MAP = {
  [DONATION_ACTIONS.SCHEDULE_PICKUP]: DELIVERY_ACTIONS.SCHEDULE_PICKUP,
  [DONATION_ACTIONS.MARK_PICKED_UP]: DELIVERY_ACTIONS.COLLECT_FOOD,
  [DONATION_ACTIONS.MARK_IN_TRANSIT]: DELIVERY_ACTIONS.START_DELIVERY,
  [DONATION_ACTIONS.MARK_DELIVERED]: DELIVERY_ACTIONS.VERIFY_DELIVERY,
};

/** Legacy donation actions expanded into full delivery step chains */
const LEGACY_ACTION_CHAINS = {
  [DONATION_ACTIONS.MARK_PICKED_UP]: [
    DELIVERY_ACTIONS.ARRIVE_AT_PICKUP,
    DELIVERY_ACTIONS.VERIFY_PICKUP,
    DELIVERY_ACTIONS.COLLECT_FOOD,
  ],
  [DONATION_ACTIONS.MARK_IN_TRANSIT]: [DELIVERY_ACTIONS.START_DELIVERY],
  [DONATION_ACTIONS.MARK_DELIVERED]: [
    DELIVERY_ACTIONS.ARRIVE_AT_NGO,
    DELIVERY_ACTIONS.VERIFY_DELIVERY,
  ],
};

const DELIVERY_ADVANCE_ACTIONS = new Set(Object.values(DELIVERY_ACTIONS));

export async function listAvailableMissions(userId) {
  const volunteer = await getVolunteerForUser(userId);

  const donations = await Donation.find({
    status: DONATION_STATUS.NGO_ACCEPTED,
    volunteerId: null,
  })
    .sort({ priority: -1, pickupScheduledAt: 1 })
    .populate("ngoId", "ngoName")
    .populate({ path: "donorId", populate: { path: "userId", select: "fullName" } })
    .lean();

  return {
    missions: donations.map(mapDonationResponse),
    volunteer: { id: volunteer._id, isAvailable: volunteer.isAvailable },
  };
}

export async function listAssignedMissions(userId) {
  const volunteer = await getVolunteerForUser(userId);

  const donations = await Donation.find({
    volunteerId: volunteer._id,
    status: {
      $in: [
        DONATION_STATUS.VOLUNTEER_ASSIGNED,
        DONATION_STATUS.PICKUP_SCHEDULED,
        DONATION_STATUS.PICKED_UP,
        DONATION_STATUS.IN_TRANSIT,
        DONATION_STATUS.DELIVERED,
      ],
    },
  })
    .sort({ updatedAt: -1 })
    .populate("ngoId", "ngoName")
    .populate({ path: "donorId", populate: { path: "userId", select: "fullName" } })
    .lean();

  return { missions: donations.map(mapDonationResponse) };
}

export async function listMissionHistory(userId, query = {}) {
  const volunteer = await getVolunteerForUser(userId);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {
    volunteerId: volunteer._id,
    status: { $in: [DONATION_STATUS.COMPLETED, DONATION_STATUS.CANCELLED, DONATION_STATUS.REJECTED] },
  };

  const [donations, total] = await Promise.all([
    Donation.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit)
      .populate("ngoId", "ngoName")
      .lean(),
    Donation.countDocuments(filter),
  ]);

  return {
    missions: donations.map(mapDonationResponse),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function getMissionDetail(userId, donationId) {
  const volunteer = await getVolunteerForUser(userId);

  const donation = await Donation.findById(donationId)
    .populate("ngoId", "ngoName address")
    .populate({ path: "donorId", populate: { path: "userId", select: "fullName phone" } })
    .lean();

  if (!donation) throw ApiError.notFound("Mission not found");

  const isAvailable =
    donation.status === DONATION_STATUS.NGO_ACCEPTED && !donation.volunteerId;
  const isAssigned =
    donation.volunteerId && String(donation.volunteerId) === String(volunteer._id);

  if (!isAvailable && !isAssigned) {
    throw ApiError.forbidden("You do not have access to this mission");
  }

  const delivery = await deliveryWorkflow.findDeliveryByDonation(donationId);
  const history = await DonationStatusHistory.find({ donationId }).sort({ createdAt: 1 }).lean();

  return {
    mission: mapDonationResponse(donation),
    delivery: delivery ? mapDeliveryResponse(delivery) : null,
    history,
  };
}

export async function acceptMission(userId, donationId, actor, req) {
  await getVolunteerForUser(userId);
  return donationWorkflow.executeDonationTransition(
    donationId,
    DONATION_ACTIONS.ASSIGN_VOLUNTEER,
    actor,
    { req },
  );
}

export async function rejectMission(userId, donationId, actor, reason) {
  await getVolunteerForUser(userId);
  const donation = await Donation.findById(donationId);

  if (!donation) throw ApiError.notFound("Mission not found");
  if (donation.status !== DONATION_STATUS.NGO_ACCEPTED || donation.volunteerId) {
    throw ApiError.badRequest("Mission is no longer available");
  }

  await Volunteer.findOneAndUpdate(
    { userId, isActive: true },
    { isAvailable: true, availability: VOLUNTEER_AVAILABILITY.AVAILABLE },
  );

  await DonationStatusHistory.create({
    donationId,
    fromStatus: donation.status,
    toStatus: donation.status,
    action: "reject_mission",
    actorId: actor.id,
    actorRole: actor.role,
    actorName: actor.fullName,
    reason,
  });

  return { declined: true, donationId };
}

export async function advanceMission(userId, donationId, action, actor, req, payload = {}) {
  await getVolunteerForUser(userId);

  const delivery = await Delivery.findOne({ donationId });
  const transitionPayload = {
    req,
    quantity: payload.quantity,
    location: payload.location,
    notes: payload.notes,
    verificationCode: payload.verificationCode,
    scheduledAt: payload.scheduledAt,
  };

  const legacyChain = LEGACY_ACTION_CHAINS[action];
  if (legacyChain) {
    if (!delivery) throw ApiError.notFound("Delivery record not found");

    for (const step of legacyChain) {
      await deliveryWorkflow.executeDeliveryTransition(delivery._id, step, actor, transitionPayload);
    }

    const updated = await Donation.findById(donationId)
      .populate("ngoId", "ngoName")
      .populate("volunteerId", "vehicleType rating")
      .lean();

    return mapDonationResponse(updated);
  }

  const deliveryAction = DELIVERY_ADVANCE_ACTIONS.has(action)
    ? action
    : LEGACY_ACTION_MAP[action];

  if (deliveryAction) {
    if (!delivery) throw ApiError.notFound("Delivery record not found");

    await deliveryWorkflow.executeDeliveryTransition(
      delivery._id,
      deliveryAction,
      actor,
      transitionPayload,
    );

    const updated = await Donation.findById(donationId)
      .populate("ngoId", "ngoName")
      .populate("volunteerId", "vehicleType rating")
      .lean();

    return mapDonationResponse(updated);
  }

  return donationWorkflow.executeDonationTransition(donationId, action, actor, { req, ...payload });
}

export async function getVolunteerPerformance(userId) {
  const volunteer = await getVolunteerForUser(userId);

  const [completed, active, cancelled] = await Promise.all([
    Donation.countDocuments({ volunteerId: volunteer._id, status: DONATION_STATUS.COMPLETED }),
    Donation.countDocuments({
      volunteerId: volunteer._id,
      status: {
        $in: [
          DONATION_STATUS.VOLUNTEER_ASSIGNED,
          DONATION_STATUS.PICKUP_SCHEDULED,
          DONATION_STATUS.PICKED_UP,
          DONATION_STATUS.IN_TRANSIT,
          DONATION_STATUS.DELIVERED,
        ],
      },
    }),
    Donation.countDocuments({
      volunteerId: volunteer._id,
      status: { $in: [DONATION_STATUS.CANCELLED, DONATION_STATUS.REJECTED] },
    }),
  ]);

  const mealsDelivered = await Donation.aggregate([
    { $match: { volunteerId: volunteer._id, status: DONATION_STATUS.COMPLETED } },
    { $group: { _id: null, total: { $sum: "$estimatedMeals" } } },
  ]);

  return {
    missionsCompleted: completed,
    activeMissions: active,
    cancelledMissions: cancelled,
    mealsDelivered: mealsDelivered[0]?.total || 0,
    rating: volunteer.rating || 0,
    successRate: volunteer.successRate || 100,
    completedMissionsCount: volunteer.completedMissions || 0,
  };
}

export default {
  listAvailableMissions,
  listAssignedMissions,
  listMissionHistory,
  getMissionDetail,
  acceptMission,
  rejectMission,
  advanceMission,
  getVolunteerPerformance,
};
