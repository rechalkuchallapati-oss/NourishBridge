import NGO from "../models/NGO.model.js";
import FoodRequest from "../models/FoodRequest.model.js";
import Inventory from "../models/Inventory.model.js";
import Donation from "../models/Donation.model.js";
import ApiError from "../utils/ApiError.js";
import { DONATION_STATUS } from "../constants/enums.js";

/**
 * NGO dashboard scoped to the authenticated NGO user's profile.
 */
const getDashboard = async (userId) => {
  const ngo = await NGO.findOne({ userId });

  if (!ngo) {
    throw ApiError.notFound("NGO profile not found for this account");
  }

  const [
    openRequests,
    inventoryItems,
    lowStockItems,
    incomingDonations,
    activeDeliveries,
    completedDonations,
    mealsAggregate,
  ] = await Promise.all([
    FoodRequest.countDocuments({ ngoId: ngo._id, status: { $in: ["requested", "under_review", "approved"] } }),
    Inventory.countDocuments({ ngoId: ngo._id }),
    Inventory.countDocuments({ ngoId: ngo._id, status: "low_stock" }),
    Donation.countDocuments({
      $or: [
        { status: DONATION_STATUS.VERIFIED, ngoId: null },
        {
          ngoId: ngo._id,
          status: {
            $in: [
              DONATION_STATUS.NGO_ACCEPTED,
              DONATION_STATUS.VOLUNTEER_ASSIGNED,
              DONATION_STATUS.PICKUP_SCHEDULED,
            ],
          },
        },
      ],
    }),
    Donation.countDocuments({
      ngoId: ngo._id,
      status: { $in: [DONATION_STATUS.PICKED_UP, DONATION_STATUS.IN_TRANSIT, DONATION_STATUS.DELIVERED] },
    }),
    Donation.countDocuments({ ngoId: ngo._id, status: DONATION_STATUS.COMPLETED }),
    Donation.aggregate([
      { $match: { ngoId: ngo._id, status: DONATION_STATUS.COMPLETED } },
      { $group: { _id: null, meals: { $sum: "$estimatedMeals" } } },
    ]),
  ]);

  const mealsDistributed = mealsAggregate[0]?.meals ?? 0;

  return {
    ngo: {
      id: ngo._id,
      ngoName: ngo.ngoName,
      registrationNumber: ngo.registrationNumber,
      status: ngo.status,
      verificationStatus: ngo.verificationStatus,
    },
    summary: {
      openFoodRequests: openRequests,
      inventoryItems,
      lowStockItems,
      incomingDonations,
      activeDeliveries,
      completedDonations,
      mealsDistributed,
      foodReceivedKg: ngo.maxDailyCapacityKg ?? 0,
      peopleSupported: ngo.dailyBeneficiaryCapacity ?? 0,
    },
    generatedAt: new Date().toISOString(),
  };
};

export default { getDashboard };
