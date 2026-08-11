import Donation from "../../../models/Donation.model.js";
import NGO from "../../../models/NGO.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import FoodRequest from "../../../models/FoodRequest.model.js";
import { DONATION_STATUS, FOOD_REQUEST_STATUS } from "../../../constants/enums.js";
import { extractCoords, distanceKm } from "../../../utils/geo.js";

const CATEGORY_COMPAT = {
  cooked_meals: ["cooked_meals", "mixed"],
  fruits: ["fruits", "vegetables", "mixed"],
  vegetables: ["fruits", "vegetables", "mixed"],
  bakery: ["bakery", "packaged", "mixed"],
  packaged: ["packaged", "dry_goods", "mixed"],
  dairy: ["dairy", "mixed"],
  dry_goods: ["dry_goods", "packaged", "mixed"],
};

function foodCompatibilityScore(donationCategory, ngoCategories = []) {
  if (!donationCategory) return 50;
  const compatible = CATEGORY_COMPAT[donationCategory] || [donationCategory, "mixed"];
  if (ngoCategories.includes(donationCategory)) return 100;
  if (ngoCategories.some((c) => compatible.includes(c))) return 75;
  return 30;
}

function urgencyScore(priority, expiryTime) {
  let score = priority === "critical" ? 100 : priority === "high" ? 80 : priority === "medium" ? 50 : 30;
  if (expiryTime) {
    const hoursLeft = (new Date(expiryTime) - Date.now()) / 3600000;
    if (hoursLeft < 2) score = Math.max(score, 95);
    else if (hoursLeft < 6) score = Math.max(score, 75);
    else if (hoursLeft < 24) score = Math.max(score, 55);
  }
  return score;
}

function distanceScore(km, maxRadius = 30) {
  if (km == null) return 40;
  if (km <= 2) return 100;
  if (km >= maxRadius) return 0;
  return Math.round(100 * (1 - km / maxRadius));
}

function buildNgoMatchReasons({ foodScore, qtyScore, expiryScore, distScore, demandScore, dist, donation, ngo }) {
  const reasons = [];
  if (foodScore >= 75) reasons.push("Food category compatible");
  if (qtyScore >= 80) reasons.push(`NGO capacity supports ${donation.quantity} ${donation.quantityUnit}`);
  if (demandScore >= 50) reasons.push("NGO has open food requests");
  if (dist != null) reasons.push(`${dist.toFixed(1)} km away`);
  if (donation.expiryTime) {
    const hours = Math.max(0, Math.round((new Date(donation.expiryTime) - Date.now()) / 3600000));
    reasons.push(`Expires in ${hours} hours`);
  }
  if (expiryScore >= 75) reasons.push("Urgency aligned with expiry window");
  if (ngo.acceptedFoodCategories?.length) reasons.push("Storage/category fit");
  return reasons.slice(0, 5);
}

function buildVolunteerMatchReasons({ distScore, availScore, vehicleScore, ratingScore, workloadScore, dist, v }) {
  const reasons = [];
  if (dist != null) reasons.push(`${dist.toFixed(1)} km from pickup`);
  if (availScore >= 90) reasons.push("Currently available");
  if (vehicleScore >= 80) reasons.push(`${v.vehicleType} suitable for transport`);
  if (ratingScore >= 70) reasons.push(`Rating ${v.rating || 4}/5`);
  if (workloadScore >= 70) reasons.push("Low current workload");
  return reasons.slice(0, 5);
}

export async function scoreNgosForDonation(donationId, { limit = 10 } = {}) {
  const donation = await Donation.findById(donationId).lean();
  if (!donation) throw new Error("Donation not found");

  const pickup = extractCoords(donation.pickupLocation);
  const ngos = await NGO.find({ verificationStatus: { $ne: "rejected" } }).lean();

  const openRequests = await FoodRequest.find({
    status: { $in: [FOOD_REQUEST_STATUS.REQUESTED, FOOD_REQUEST_STATUS.APPROVED, FOOD_REQUEST_STATUS.DONATION_MATCHED] },
  }).lean();

  const demandByNgo = openRequests.reduce((acc, r) => {
    acc[String(r.ngoId)] = (acc[String(r.ngoId)] || 0) + (r.quantityNeeded || 0);
    return acc;
  }, {});

  const activeByNgo = await Donation.aggregate([
    {
      $match: {
        ngoId: { $ne: null },
        status: {
          $nin: [DONATION_STATUS.COMPLETED, DONATION_STATUS.REJECTED, DONATION_STATUS.CANCELLED],
        },
      },
    },
    { $group: { _id: "$ngoId", count: { $sum: 1 } } },
  ]);
  const loadMap = Object.fromEntries(activeByNgo.map((r) => [String(r._id), r.count]));

  const scored = ngos
    .map((ngo) => {
      const ngoLoc = extractCoords(ngo.location);
      const dist = pickup && ngoLoc ? distanceKm(pickup, ngoLoc) : null;
      const maxRadius = ngo.preferredPickupRadiusKm || 25;

      if (dist != null && dist > maxRadius) return null;

      const foodScore = foodCompatibilityScore(
        donation.category,
        ngo.acceptedFoodCategories || [],
      );
      const qtyScore =
        donation.quantity <= (ngo.maxDailyCapacityKg || 500) ? 90 : 40;
      const expiryScore = urgencyScore(donation.priority, donation.expiryTime);
      const distScore = distanceScore(dist, maxRadius);
      const demand = demandByNgo[String(ngo._id)] || 0;
      const demandScore = demand > 0 ? Math.min(100, 50 + demand / 10) : 30;
      const load = loadMap[String(ngo._id)] || 0;
      const loadPenalty = Math.min(30, load * 5);

      const totalScore = Math.round(
        foodScore * 0.25 +
          qtyScore * 0.15 +
          expiryScore * 0.2 +
          distScore * 0.25 +
          demandScore * 0.1 +
          (100 - loadPenalty) * 0.05,
      );

      return {
        ngoId: ngo._id,
        ngoName: ngo.ngoName,
        score: totalScore,
        distanceKm: dist,
        breakdown: { foodScore, qtyScore, expiryScore, distScore, demandScore, load },
        reasons: buildNgoMatchReasons({
          foodScore,
          qtyScore,
          expiryScore,
          distScore,
          demandScore,
          load,
          dist,
          donation,
          ngo,
        }),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return { donationId, matches: scored };
}

export async function scoreVolunteersForDonation(donationId, { limit = 10 } = {}) {
  const donation = await Donation.findById(donationId).lean();
  if (!donation) throw new Error("Donation not found");

  const pickup = extractCoords(donation.pickupLocation);
  const volunteers = await Volunteer.find({ isActive: true, isAvailable: true }).lean();

  const activeCounts = await Donation.aggregate([
    {
      $match: {
        volunteerId: { $ne: null },
        status: {
          $nin: [DONATION_STATUS.COMPLETED, DONATION_STATUS.REJECTED, DONATION_STATUS.CANCELLED],
        },
      },
    },
    { $group: { _id: "$volunteerId", count: { $sum: 1 } } },
  ]);
  const workloadMap = Object.fromEntries(activeCounts.map((r) => [String(r._id), r.count]));

  const scored = volunteers
    .map((v) => {
      const vLoc = extractCoords(v.currentLocation);
      const dist = pickup && vLoc ? distanceKm(pickup, vLoc) : null;
      const maxRadius = v.serviceRadiusKm || 20;

      if (dist != null && dist > maxRadius) return null;

      const distScore = distanceScore(dist, maxRadius);
      const availScore = v.isAvailable ? 100 : 0;
      const vehicleScore =
        v.vehicleType === "van" || v.vehicleType === "car"
          ? 90
          : v.vehicleType === "bike"
            ? 70
            : 50;
      const ratingScore = Math.round((v.rating || 4) * 20);
      const workload = workloadMap[String(v._id)] || 0;
      const workloadScore = Math.max(0, 100 - workload * 25);

      const totalScore = Math.round(
        distScore * 0.3 +
          availScore * 0.2 +
          vehicleScore * 0.15 +
          ratingScore * 0.2 +
          workloadScore * 0.15,
      );

      return {
        volunteerId: v._id,
        score: totalScore,
        distanceKm: dist,
        vehicleType: v.vehicleType,
        rating: v.rating,
        breakdown: { distScore, availScore, vehicleScore, ratingScore, workloadScore },
        reasons: buildVolunteerMatchReasons({
          distScore,
          availScore,
          vehicleScore,
          ratingScore,
          workloadScore,
          dist,
          v,
        }),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return { donationId, matches: scored };
}

export default { scoreNgosForDonation, scoreVolunteersForDonation };
