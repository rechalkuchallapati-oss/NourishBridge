import Donation from "../models/Donation.model.js";
import Delivery from "../models/Delivery.model.js";
import Donor from "../models/Donor.model.js";
import Volunteer from "../models/Volunteer.model.js";
import NGO from "../models/NGO.model.js";
import User from "../models/User.model.js";
import FoodRequest from "../models/FoodRequest.model.js";
import Inventory from "../models/Inventory.model.js";
import Beneficiary from "../models/Beneficiary.model.js";
import {
  DONATION_STATUS,
  DELIVERY_STATUS,
  FOOD_REQUEST_STATUS,
  USER_ROLES,
} from "../constants/enums.js";

function msToMinutes(ms) {
  return Math.round(ms / 60000);
}

export async function getPlatformAnalytics() {
  const [
    totalDonations,
    completedDonations,
    donationAgg,
    uniqueNgosServed,
    activeVolunteers,
    completedDeliveries,
    deliveryTimeAgg,
    onTimeDeliveries,
    fulfilledRequests,
    totalRequests,
    beneficiariesServed,
    totalUsers,
  ] = await Promise.all([
    Donation.countDocuments(),
    Donation.countDocuments({ status: DONATION_STATUS.COMPLETED }),
    Donation.aggregate([
      {
        $group: {
          _id: null,
          mealsGenerated: { $sum: "$estimatedMeals" },
          foodRescuedKg: {
            $sum: {
              $cond: [{ $eq: ["$quantityUnit", "kg"] }, "$quantity", 0],
            },
          },
          completedMeals: {
            $sum: {
              $cond: [
                { $eq: ["$status", DONATION_STATUS.COMPLETED] },
                "$estimatedMeals",
                0,
              ],
            },
          },
        },
      },
    ]),
    Donation.distinct("ngoId", { ngoId: { $ne: null }, status: DONATION_STATUS.COMPLETED }),
    Volunteer.countDocuments({ isActive: true, availability: { $ne: "offline" } }),
    Delivery.countDocuments({ status: DELIVERY_STATUS.COMPLETED }),
    Delivery.aggregate([
      {
        $match: {
          status: DELIVERY_STATUS.COMPLETED,
          pickedUpAt: { $ne: null },
          deliveredAt: { $ne: null },
        },
      },
      {
        $project: {
          durationMs: { $subtract: ["$deliveredAt", "$pickedUpAt"] },
          onTime: {
            $cond: [
              {
                $and: [
                  { $ne: ["$pickupScheduledAt", null] },
                  { $lte: ["$deliveredAt", "$pickupScheduledAt"] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          avgDurationMs: { $avg: "$durationMs" },
          onTimeCount: { $sum: "$onTime" },
          total: { $sum: 1 },
        },
      },
    ]),
    Delivery.countDocuments({
      status: DELIVERY_STATUS.COMPLETED,
      deliveredAt: { $ne: null },
      pickupScheduledAt: { $ne: null },
      $expr: { $lte: ["$deliveredAt", "$pickupScheduledAt"] },
    }),
    FoodRequest.countDocuments({ status: FOOD_REQUEST_STATUS.FULFILLED }),
    FoodRequest.countDocuments(),
    Beneficiary.countDocuments({ isActive: true }),
    User.countDocuments({ isDeleted: false }),
  ]);

  const agg = donationAgg[0] || {};
  const timeStats = deliveryTimeAgg[0] || {};
  const deliverySampleSize = timeStats.total || 0;
  const onTimeRate =
    deliverySampleSize > 0
      ? Math.round(((timeStats.onTimeCount || onTimeDeliveries) / deliverySampleSize) * 100)
      : 0;

  const mealsGenerated = agg.mealsGenerated || 0;
  const livesImpacted = (agg.completedMeals || 0) + (beneficiariesServed || 0);

  return {
    totalDonations,
    completedDonations,
    foodRescuedKg: Math.round(agg.foodRescuedKg || 0),
    mealsGenerated,
    ngosServed: uniqueNgosServed.filter(Boolean).length,
    activeVolunteers,
    deliveriesCompleted: completedDeliveries,
    foodRequestsFulfilled: fulfilledRequests,
    foodRequestsTotal: totalRequests,
    beneficiariesServed,
    livesImpacted,
    totalUsers,
    onTimeDeliveryRate: onTimeRate,
    averageDeliveryTimeMinutes:
      timeStats.avgDurationMs != null ? msToMinutes(timeStats.avgDurationMs) : null,
    generatedAt: new Date().toISOString(),
  };
}

export async function getDonationTrend(days = 7) {
  const start = new Date();
  start.setDate(start.getDate() - days);
  start.setHours(0, 0, 0, 0);

  const rows = await Donation.aggregate([
    { $match: { createdAt: { $gte: start } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return rows.map((r) => {
    const d = new Date(r._id);
    return {
      date: dayLabels[d.getDay()],
      donations: r.count,
      fullDate: r._id,
    };
  });
}

export async function getDonationsByCategory() {
  const rows = await Donation.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const total = rows.reduce((s, r) => s + r.count, 0) || 1;
  const colors = ["#16A34A", "#22C55E", "#F59E0B", "#2563EB", "#8B5CF6", "#64748B"];

  return rows.map((r, i) => ({
    id: r._id || "other",
    label: (r._id || "other").replace(/_/g, " "),
    share: Math.round((r.count / total) * 100),
    count: r.count,
    color: colors[i % colors.length],
  }));
}

export async function getRecentActivity(limit = 10) {
  const [donations, deliveries] = await Promise.all([
    Donation.find()
      .sort({ updatedAt: -1 })
      .limit(limit)
      .populate({ path: "donorId", populate: { path: "userId", select: "fullName" } })
      .populate("ngoId", "ngoName")
      .lean(),
    Delivery.find()
      .sort({ updatedAt: -1 })
      .limit(limit)
      .populate({ path: "donationId", select: "donationCode foodType" })
      .lean(),
  ]);

  const events = [];

  for (const d of donations) {
    events.push({
      id: d._id,
      type: d.status,
      message: `Donation ${d.donationCode || d._id} — ${d.status.replace(/_/g, " ")}`,
      ref: d.donationCode,
      time: d.updatedAt,
    });
  }

  for (const del of deliveries) {
    events.push({
      id: del._id,
      type: del.status,
      message: `Delivery ${del.deliveryCode || del._id} — ${del.status.replace(/_/g, " ")}`,
      ref: del.deliveryCode || del.donationId?.donationCode,
      time: del.updatedAt,
    });
  }

  return events
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, limit);
}

export async function getTopNgos(limit = 5) {
  const rows = await Donation.aggregate([
    { $match: { status: DONATION_STATUS.COMPLETED, ngoId: { $ne: null } } },
    {
      $group: {
        _id: "$ngoId",
        donations: { $sum: 1 },
        meals: { $sum: "$estimatedMeals" },
      },
    },
    { $sort: { meals: -1 } },
    { $limit: limit },
  ]);

  const ngoIds = rows.map((r) => r._id);
  const ngos = await NGO.find({ _id: { $in: ngoIds } }).select("ngoName").lean();
  const nameMap = Object.fromEntries(ngos.map((n) => [String(n._id), n.ngoName]));

  return rows.map((r) => ({
    id: r._id,
    name: nameMap[String(r._id)] || "NGO",
    donations: r.donations,
    meals: r.meals,
  }));
}

export default {
  getPlatformAnalytics,
  getDonationTrend,
  getDonationsByCategory,
  getRecentActivity,
  getTopNgos,
};
