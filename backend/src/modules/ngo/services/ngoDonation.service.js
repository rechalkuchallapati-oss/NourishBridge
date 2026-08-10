import Donation from "../../../models/Donation.model.js";
import Donor from "../../../models/Donor.model.js";
import ApiError from "../../../utils/ApiError.js";
import { DONATION_STATUS } from "../../../constants/enums.js";
import { mapDonationResponse } from "../../donations/utils/donation.mapper.js";
import { getNgoForUser } from "../../shared/repositories/roleProfiles.repository.js";
import donationWorkflow from "../../donations/services/donationWorkflow.service.js";
import { DONATION_ACTIONS } from "../../donations/constants/transitions.js";

function buildDonationFilter(query = {}) {
  const filter = {};

  if (query.category && query.category !== "all") {
    filter.category = query.category;
  }

  if (query.priority && query.priority !== "all") {
    filter.priority = query.priority;
  }

  if (query.search) {
    filter.$or = [
      { foodType: { $regex: query.search, $options: "i" } },
      { donationCode: { $regex: query.search, $options: "i" } },
    ];
  }

  return filter;
}

async function populateDonations(filter, options = {}) {
  const { page = 1, limit = 50, sort = { createdAt: -1 } } = options;
  const skip = (page - 1) * limit;

  const [donations, total] = await Promise.all([
    Donation.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("ngoId", "ngoName")
      .populate("volunteerId", "vehicleType rating")
      .populate({ path: "donorId", populate: { path: "userId", select: "fullName email" } })
      .lean(),
    Donation.countDocuments(filter),
  ]);

  return {
    donations: donations.map(mapDonationResponse),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

/** Verified donations available for any NGO to accept */
export async function browseAvailableDonations(userId, query = {}) {
  await getNgoForUser(userId);

  const filter = {
    status: DONATION_STATUS.VERIFIED,
    ngoId: null,
    ...buildDonationFilter(query),
  };

  return populateDonations(filter, query);
}

/** Incoming queue: verified (open) + donations assigned to this NGO in active workflow */
export async function listIncomingDonations(userId, query = {}) {
  const ngo = await getNgoForUser(userId);

  const filter = {
    $or: [
      { status: DONATION_STATUS.VERIFIED, ngoId: null },
      {
        ngoId: ngo._id,
        status: {
          $in: [
            DONATION_STATUS.NGO_ACCEPTED,
            DONATION_STATUS.VOLUNTEER_ASSIGNED,
            DONATION_STATUS.PICKUP_SCHEDULED,
            DONATION_STATUS.PICKED_UP,
            DONATION_STATUS.IN_TRANSIT,
            DONATION_STATUS.DELIVERED,
          ],
        },
      },
    ],
    ...buildDonationFilter(query),
  };

  return populateDonations(filter, query);
}

/** Donations accepted by this NGO (post-acceptance workflow) */
export async function listAcceptedDonations(userId, query = {}) {
  const ngo = await getNgoForUser(userId);

  const filter = {
    ngoId: ngo._id,
    status: {
      $in: [
        DONATION_STATUS.NGO_ACCEPTED,
        DONATION_STATUS.VOLUNTEER_ASSIGNED,
        DONATION_STATUS.PICKUP_SCHEDULED,
        DONATION_STATUS.PICKED_UP,
        DONATION_STATUS.IN_TRANSIT,
        DONATION_STATUS.DELIVERED,
        DONATION_STATUS.COMPLETED,
      ],
    },
    ...buildDonationFilter(query),
  };

  return populateDonations(filter, query);
}

export async function getDonationDetail(userId, donationId) {
  const ngo = await getNgoForUser(userId);

  const donation = await Donation.findById(donationId)
    .populate("ngoId", "ngoName")
    .populate("volunteerId", "vehicleType rating")
    .populate({ path: "donorId", populate: { path: "userId", select: "fullName email" } })
    .lean();

  if (!donation) throw ApiError.notFound("Donation not found");

  const isAvailable =
    donation.status === DONATION_STATUS.VERIFIED && !donation.ngoId;
  const isOwned = donation.ngoId && String(donation.ngoId._id || donation.ngoId) === String(ngo._id);

  if (!isAvailable && !isOwned) {
    throw ApiError.forbidden("You do not have access to this donation");
  }

  return mapDonationResponse(donation);
}

export async function acceptDonation(userId, donationId, actor, req) {
  await getNgoForUser(userId);
  return donationWorkflow.executeDonationTransition(
    donationId,
    DONATION_ACTIONS.ACCEPT,
    actor,
    { req },
  );
}

export async function rejectDonation(userId, donationId, actor, reason, req) {
  await getNgoForUser(userId);
  return donationWorkflow.executeDonationTransition(
    donationId,
    DONATION_ACTIONS.REJECT,
    actor,
    { reason, req },
  );
}

export async function completeDonation(userId, donationId, actor, req) {
  await getNgoForUser(userId);
  return donationWorkflow.executeDonationTransition(
    donationId,
    DONATION_ACTIONS.COMPLETE,
    actor,
    { req },
  );
}

export async function getNgoDonationStatistics(userId) {
  const ngo = await getNgoForUser(userId);

  const [incoming, accepted, completed, rejected] = await Promise.all([
    Donation.countDocuments({
      $or: [
        { status: DONATION_STATUS.VERIFIED, ngoId: null },
        { ngoId: ngo._id, status: { $nin: [DONATION_STATUS.COMPLETED, DONATION_STATUS.REJECTED, DONATION_STATUS.CANCELLED] } },
      ],
    }),
    Donation.countDocuments({ ngoId: ngo._id, status: { $ne: DONATION_STATUS.COMPLETED } }),
    Donation.countDocuments({ ngoId: ngo._id, status: DONATION_STATUS.COMPLETED }),
    Donation.countDocuments({ ngoId: ngo._id, status: DONATION_STATUS.REJECTED }),
  ]);

  return { incoming, accepted, completed, rejected };
}

export default {
  browseAvailableDonations,
  listIncomingDonations,
  listAcceptedDonations,
  getDonationDetail,
  acceptDonation,
  rejectDonation,
  completeDonation,
  getNgoDonationStatistics,
};
