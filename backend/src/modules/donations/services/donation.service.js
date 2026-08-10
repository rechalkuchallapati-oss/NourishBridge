import Donation from "../../../models/Donation.model.js";
import Donor from "../../../models/Donor.model.js";
import User from "../../../models/User.model.js";
import ApiError from "../../../utils/ApiError.js";
import { DONATION_STATUS, USER_ROLES } from "../../../constants/enums.js";
import {
  DONOR_CANCELLABLE_STATUSES,
  DONOR_EDITABLE_STATUSES,
  ACTIVE_DONATION_STATUSES,
  COMPLETED_DONATION_STATUSES,
} from "../constants/status.js";
import { getDonorForUser, findDonationForDonor } from "../utils/donation.repository.js";
import { mapDonationResponse } from "../utils/donation.mapper.js";
import donationWorkflow from "./donationWorkflow.service.js";
import { DONATION_ACTIONS } from "../constants/transitions.js";
import { notifyDonationCreated } from "../../../services/notificationEvents.service.js";

function buildPickupLocation(coords) {
  if (!coords || coords.length !== 2) return null;
  return { type: "Point", coordinates: coords };
}

function normalizeCreatePayload(payload) {
  const foodType = payload.foodName || payload.foodType;

  return {
    foodType,
    category: payload.category,
    quantity: payload.quantity,
    quantityUnit: payload.quantityUnit,
    estimatedMeals: payload.estimatedMeals ?? 0,
    freshness: payload.freshness,
    preparationTime: payload.preparationTime,
    expiryTime: payload.expiryTime,
    pickupAddress: payload.pickupAddress,
    pickupLocation: buildPickupLocation(payload.pickupLocation?.coordinates),
    pickupScheduledAt: payload.pickupScheduledAt,
    pickupEndAt: payload.pickupEndAt,
    notes: payload.notes,
    dietType: payload.dietType,
    packagingStatus: payload.packagingStatus,
    allergenInfo: payload.allergenInfo,
    priority: payload.priority,
    items: payload.items || [],
    images: payload.images || [],
    status: DONATION_STATUS.PENDING,
  };
}

async function computeStatistics(donorId) {
  const [total, active, completed, aggregate, ngoIds] = await Promise.all([
    Donation.countDocuments({ donorId }),
    Donation.countDocuments({ donorId, status: { $in: [...ACTIVE_DONATION_STATUSES] } }),
    Donation.countDocuments({ donorId, status: { $in: [...COMPLETED_DONATION_STATUSES] } }),
    Donation.aggregate([
      { $match: { donorId } },
      {
        $group: {
          _id: null,
          mealsContributed: { $sum: "$estimatedMeals" },
          totalQuantityKg: {
            $sum: {
              $cond: [{ $eq: ["$quantityUnit", "kg"] }, "$quantity", 0],
            },
          },
        },
      },
    ]),
    Donation.distinct("ngoId", { donorId, ngoId: { $ne: null } }),
  ]);

  const stats = aggregate[0] || { mealsContributed: 0, totalQuantityKg: 0 };

  return {
    totalDonations: total,
    activeDonations: active,
    completedDonations: completed,
    mealsContributed: stats.mealsContributed,
    foodRescuedKg: Math.round(stats.totalQuantityKg * 10) / 10,
    ngosHelped: ngoIds.length,
  };
}

export async function createDonation(userId, payload, req = null) {
  const donor = await getDonorForUser(userId);
  const data = normalizeCreatePayload(payload);

  const donation = await Donation.create({
    ...data,
    donorId: donor._id,
  });

  await Donor.updateOne({ _id: donor._id }, { $inc: { totalDonations: 1 } });

  const donorUser = await User.findById(userId).select("fullName").lean();

  await donationWorkflow.recordInitialPending(
    donation._id,
    { id: userId, role: USER_ROLES.DONOR, fullName: donorUser?.fullName },
    req,
  );

  notifyDonationCreated(donation.toObject(), donorUser?.fullName).catch(() => {});

  const populated = await findDonationForDonor(donation._id, donor._id);
  return mapDonationResponse(populated);
}

export async function listMyDonations(userId, query = {}) {
  const donor = await getDonorForUser(userId);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 50;
  const skip = (page - 1) * limit;

  const filter = { donorId: donor._id };

  if (query.active === "true") {
    filter.status = { $in: [...ACTIVE_DONATION_STATUSES] };
  } else if (query.active === "false") {
    filter.status = { $in: [...COMPLETED_DONATION_STATUSES] };
  } else if (query.status && query.status !== "all") {
    filter.status = query.status;
  }

  const [donations, total, statistics] = await Promise.all([
    Donation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("ngoId", "ngoName")
      .populate("volunteerId", "vehicleType rating")
      .lean(),
    Donation.countDocuments(filter),
    computeStatistics(donor._id),
  ]);

  return {
    donations: donations.map(mapDonationResponse),
    statistics,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function getDonationById(userId, donationId) {
  const donor = await getDonorForUser(userId);
  const donation = await findDonationForDonor(donationId, donor._id);
  return mapDonationResponse(donation);
}

export async function updateDonation(userId, donationId, payload) {
  const donor = await getDonorForUser(userId);
  const donation = await Donation.findOne({ _id: donationId, donorId: donor._id });

  if (!donation) {
    throw ApiError.notFound("Donation not found");
  }

  if (payload.status === DONATION_STATUS.CANCELLED) {
    throw ApiError.badRequest("Use DELETE to cancel a donation");
  }

  if (!DONOR_EDITABLE_STATUSES.has(donation.status)) {
    throw ApiError.badRequest("Only pending donations can be edited");
  }

  const updatable = [
    "foodType",
    "category",
    "quantity",
    "quantityUnit",
    "estimatedMeals",
    "freshness",
    "preparationTime",
    "expiryTime",
    "pickupAddress",
    "pickupScheduledAt",
    "pickupEndAt",
    "notes",
    "dietType",
    "packagingStatus",
    "allergenInfo",
    "items",
    "priority",
  ];

  if (payload.foodName) payload.foodType = payload.foodName;

  updatable.forEach((field) => {
    if (payload[field] !== undefined) donation[field] = payload[field];
  });

  if (payload.pickupLocation?.coordinates) {
    donation.pickupLocation = buildPickupLocation(payload.pickupLocation.coordinates);
  }

  await donation.save();

  const updated = await findDonationForDonor(donation._id, donor._id);
  return mapDonationResponse(updated);
}

export async function cancelDonation(userId, donationId, actor, req) {
  await getDonorForUser(userId);
  return donationWorkflow.executeDonationTransition(
    donationId,
    DONATION_ACTIONS.CANCEL,
    { id: actor.id, role: actor.role, fullName: actor.fullName },
    { req },
  );
}

export async function addDonationImages(userId, donationId, filenames) {
  const donor = await getDonorForUser(userId);
  const donation = await Donation.findOne({ _id: donationId, donorId: donor._id });

  if (!donation) {
    throw ApiError.notFound("Donation not found");
  }

  if (!DONOR_EDITABLE_STATUSES.has(donation.status)) {
    throw ApiError.badRequest("Images can only be added to pending donations");
  }

  donation.images = [...(donation.images || []), ...filenames];
  await donation.save();

  const updated = await findDonationForDonor(donation._id, donor._id);
  return mapDonationResponse(updated);
}

export async function getDonationStatistics(userId) {
  const donor = await getDonorForUser(userId);
  return computeStatistics(donor._id);
}

export default {
  createDonation,
  listMyDonations,
  getDonationById,
  updateDonation,
  cancelDonation,
  addDonationImages,
  getDonationStatistics,
};
