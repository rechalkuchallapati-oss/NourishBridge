import User from "../models/User.model.js";
import Donor from "../models/Donor.model.js";
import Volunteer from "../models/Volunteer.model.js";
import NGO from "../models/NGO.model.js";
import Donation from "../models/Donation.model.js";
import Delivery from "../models/Delivery.model.js";
import { USER_ROLES } from "../constants/enums.js";
import analyticsService from "./analytics.service.js";

/**
 * Platform-wide dashboard summary — admin only.
 */
const getDashboard = async () => {
  const [summary, analytics, trend, byCategory, activity, topNgos, pendingVerifications, recentDonations] =
    await Promise.all([
      getBasicCounts(),
      analyticsService.getPlatformAnalytics(),
      analyticsService.getDonationTrend(7),
      analyticsService.getDonationsByCategory(),
      analyticsService.getRecentActivity(8),
      analyticsService.getTopNgos(5),
      Donation.countDocuments({ status: "pending" }),
      Donation.find()
        .sort({ createdAt: -1 })
        .limit(8)
        .populate("ngoId", "ngoName")
        .populate({ path: "donorId", populate: { path: "userId", select: "fullName" } })
        .lean(),
    ]);

  return {
    summary: {
      ...summary,
      pendingVerifications,
      mealsGenerated: analytics.mealsGenerated,
      foodRescuedKg: analytics.foodRescuedKg,
      onTimeDeliveryRate: analytics.onTimeDeliveryRate,
      livesImpacted: analytics.livesImpacted,
    },
    analytics,
    trend,
    byCategory,
    activity,
    topNgos,
    recentDonations: recentDonations.map((d) => ({
      id: d._id,
      donationCode: d.donationCode,
      foodName: d.foodType,
      status: d.status,
      donorName: d.donorId?.userId?.fullName || "Donor",
      ngoName: d.ngoId?.ngoName,
      createdAt: d.createdAt,
    })),
    roleBreakdown: summary.roleBreakdown,
    generatedAt: new Date().toISOString(),
  };
};

async function getBasicCounts() {
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
    totalUsers,
    totalDonors,
    totalVolunteers,
    totalNgos,
    totalDonations,
    activeDeliveries,
    roleBreakdown,
  };
}

export default { getDashboard };
