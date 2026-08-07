import Volunteer from "../models/Volunteer.model.js";
import Delivery from "../models/Delivery.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * Volunteer dashboard scoped to the authenticated volunteer's profile.
 */
const getDashboard = async (userId) => {
  const volunteer = await Volunteer.findOne({ userId });

  if (!volunteer) {
    throw ApiError.notFound("Volunteer profile not found for this account");
  }

  const [activeDeliveries, completedDeliveries] = await Promise.all([
    Delivery.countDocuments({
      volunteerId: volunteer._id,
      status: { $nin: ["completed", "cancelled", "failed"] },
    }),
    Delivery.countDocuments({
      volunteerId: volunteer._id,
      status: "completed",
    }),
  ]);

  return {
    volunteer: {
      id: volunteer._id,
      vehicleType: volunteer.vehicleType,
      availability: volunteer.availability,
      completedMissions: volunteer.completedMissions ?? 0,
      rating: volunteer.rating ?? 0,
    },
    summary: {
      activeDeliveries,
      completedDeliveries,
    },
    generatedAt: new Date().toISOString(),
  };
};

export default { getDashboard };
