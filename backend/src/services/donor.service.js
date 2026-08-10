import Donor from "../models/Donor.model.js";
import Donation from "../models/Donation.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * Donor dashboard scoped to the authenticated donor's profile.
 */
const getDashboard = async (userId) => {
  const donor = await Donor.findOne({ userId });

  if (!donor) {
    throw ApiError.notFound("Donor profile not found for this account");
  }

  const [totalDonations, activeDonations, completedDonations] = await Promise.all([
    Donation.countDocuments({ donorId: donor._id }),
    Donation.countDocuments({
      donorId: donor._id,
      status: { $nin: ["completed", "cancelled", "rejected", "expired"] },
    }),
    Donation.countDocuments({ donorId: donor._id, status: "completed" }),
  ]);

  return {
    donor: {
      id: donor._id,
      donorType: donor.donorType,
      organizationName: donor.organizationName,
      tier: donor.tier,
    },
    summary: {
      totalDonations,
      activeDonations,
      completedDonations,
    },
    generatedAt: new Date().toISOString(),
  };
};

export default { getDashboard };
