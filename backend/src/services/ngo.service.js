import NGO from "../models/NGO.model.js";
import FoodRequest from "../models/FoodRequest.model.js";
import Inventory from "../models/Inventory.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * NGO dashboard scoped to the authenticated NGO user's profile.
 */
const getDashboard = async (userId) => {
  const ngo = await NGO.findOne({ userId });

  if (!ngo) {
    throw ApiError.notFound("NGO profile not found for this account");
  }

  const [openRequests, inventoryItems, lowStockItems] = await Promise.all([
    FoodRequest.countDocuments({ ngoId: ngo._id, status: { $in: ["requested", "under_review", "approved"] } }),
    Inventory.countDocuments({ ngoId: ngo._id }),
    Inventory.countDocuments({ ngoId: ngo._id, status: "low_stock" }),
  ]);

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
    },
    generatedAt: new Date().toISOString(),
  };
};

export default { getDashboard };
