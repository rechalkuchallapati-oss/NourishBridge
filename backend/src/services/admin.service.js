import User from "../models/User.model.js";
import Donor from "../models/Donor.model.js";
import Volunteer from "../models/Volunteer.model.js";
import NGO from "../models/NGO.model.js";
import Donation from "../models/Donation.model.js";
import Delivery from "../models/Delivery.model.js";
import { USER_ROLES } from "../constants/enums.js";

/**
 * Platform-wide dashboard summary — admin only.
 */
const getDashboard = async () => {
  const [
    totalUsers,
    totalDonors,
    totalVolunteers,
    totalNgos,
    totalDonations,
    activeDeliveries,
  ] = await Promise.all([
    User.countDocuments({ isDeleted: false }),
    Donor.countDocuments(),
    Volunteer.countDocuments(),
    NGO.countDocuments(),
    Donation.countDocuments(),
    Delivery.countDocuments({ status: { $nin: ["completed", "cancelled", "failed"] } }),
  ]);

  const usersByRole = await User.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: "$role", count: { $sum: 1 } } },
  ]);

  const roleBreakdown = Object.values(USER_ROLES).reduce((acc, role) => {
    acc[role] = usersByRole.find((r) => r._id === role)?.count || 0;
    return acc;
  }, {});

  return {
    summary: {
      totalUsers,
      totalDonors,
      totalVolunteers,
      totalNgos,
      totalDonations,
      activeDeliveries,
    },
    roleBreakdown,
    generatedAt: new Date().toISOString(),
  };
};

export default { getDashboard };
