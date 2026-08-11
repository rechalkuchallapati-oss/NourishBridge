import Inventory from "../../../models/Inventory.model.js";
import DistributionRecord from "../../../models/DistributionRecord.model.js";
import Beneficiary from "../../../models/Beneficiary.model.js";
import NGO from "../../../models/NGO.model.js";
import ApiError from "../../../utils/ApiError.js";
import { INVENTORY_STATUS } from "../../../constants/enums.js";
import { getNgoForUser } from "../../shared/repositories/roleProfiles.repository.js";
import { notifyInventoryNearExpiry } from "../../../services/notificationEvents.service.js";

function mapInventoryItem(item) {
  return {
    id: item._id,
    batchCode: item.batchCode,
    batchId: item.batchCode,
    itemName: item.itemName,
    foodItem: item.itemName,
    category: item.category,
    quantity: item.quantity,
    availableQuantity: item.quantity,
    initialQuantity: item.initialQuantity,
    distributedQuantity: item.distributedQuantity || 0,
    quantityUnit: item.quantityUnit,
    storageType: item.storageType,
    expiryDate: item.expiryDate,
    status: item.status,
    receivedFrom: item.receivedFrom,
    receivedAt: item.receivedAt,
    distributedAt: item.distributedAt,
    estimatedMeals: item.estimatedMeals,
    sourceDonationId: item.sourceDonationId,
    sourceDeliveryId: item.sourceDeliveryId,
    volunteerId: item.volunteerId,
    pickupProofImages: item.pickupProofImages || [],
    deliveryProofImages: item.deliveryProofImages || [],
    notes: item.notes,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

export async function listInventory(userId, query = {}) {
  const ngo = await getNgoForUser(userId);
  const filter = { ngoId: ngo._id };

  if (query.status && query.status !== "all") {
    filter.status = query.status;
  }
  if (query.category && query.category !== "all") {
    filter.category = query.category;
  }

  const items = await Inventory.find(filter).sort({ expiryDate: 1 }).lean();

  const now = new Date();
  const enriched = await Promise.all(
    items.map(async (item) => {
      if (
        item.quantity > 0 &&
        item.expiryDate &&
        item.expiryDate <= now &&
        item.status !== INVENTORY_STATUS.EXPIRED
      ) {
        await Inventory.updateOne({ _id: item._id }, { status: INVENTORY_STATUS.EXPIRED });
        return { ...item, status: INVENTORY_STATUS.EXPIRED };
      }
      if (
        item.quantity > 0 &&
        item.expiryDate &&
        item.expiryDate <= new Date(now.getTime() + 3 * 24 * 3600 * 1000) &&
        item.status === INVENTORY_STATUS.AVAILABLE
      ) {
        await Inventory.updateOne({ _id: item._id }, { status: INVENTORY_STATUS.EXPIRING });
        return { ...item, status: INVENTORY_STATUS.EXPIRING };
      }
      return item;
    }),
  );

  return { items: enriched.map(mapInventoryItem) };
}

export async function getExpiryAlerts(userId, days = 3) {
  const ngo = await getNgoForUser(userId);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() + Number(days));

  const [expiring, expired, lowStock] = await Promise.all([
    Inventory.find({
      ngoId: ngo._id,
      status: INVENTORY_STATUS.EXPIRING,
      quantity: { $gt: 0 },
    }).lean(),
    Inventory.find({
      ngoId: ngo._id,
      status: INVENTORY_STATUS.EXPIRED,
      quantity: { $gt: 0 },
    }).lean(),
    Inventory.find({
      ngoId: ngo._id,
      status: INVENTORY_STATUS.LOW_STOCK,
      quantity: { $gt: 0 },
    }).lean(),
  ]);

  const upcoming = await Inventory.find({
    ngoId: ngo._id,
    expiryDate: { $lte: cutoff, $gt: new Date() },
    status: { $nin: [INVENTORY_STATUS.EXPIRED, INVENTORY_STATUS.DISTRIBUTED] },
    quantity: { $gt: 0 },
  }).lean();

  const alertItems = [...expiring, ...upcoming].map(mapInventoryItem);

  if (alertItems.length) {
    const Notification = (await import("../../../models/Notification.model.js")).default;
    const since = new Date(Date.now() - 24 * 3600 * 1000);
    const recent = await Notification.findOne({
      userId,
      "metadata.event": "inventory_near_expiry",
      createdAt: { $gte: since },
    }).lean();

    if (!recent) {
      notifyInventoryNearExpiry(userId, alertItems).catch(() => {});
    }
  }

  return {
    alerts: {
      expiring: expiring.map(mapInventoryItem),
      expired: expired.map(mapInventoryItem),
      lowStock: lowStock.map(mapInventoryItem),
      upcomingExpiry: upcoming.map(mapInventoryItem),
    },
    summary: {
      expiringCount: expiring.length,
      expiredCount: expired.length,
      lowStockCount: lowStock.length,
      upcomingCount: upcoming.length,
    },
  };
}

export async function distributeInventory(userId, itemId, payload) {
  const ngo = await getNgoForUser(userId);
  const item = await Inventory.findOne({ _id: itemId, ngoId: ngo._id });

  if (!item) throw ApiError.notFound("Inventory item not found");

  const distributeQty = payload.quantity || item.quantity;
  if (distributeQty > item.quantity) {
    throw ApiError.badRequest("Cannot distribute more than available quantity");
  }

  const mealsServed = payload.mealsServed || Math.round(
    (item.estimatedMeals || distributeQty) * (distributeQty / (item.initialQuantity || item.quantity + distributeQty)),
  ) || distributeQty;
  const peopleServed = payload.peopleServed || payload.beneficiaryCount || 0;

  item.quantity -= distributeQty;
  item.distributedQuantity = (item.distributedQuantity || 0) + distributeQty;

  if (item.quantity <= 0) {
    item.quantity = 0;
    item.status = INVENTORY_STATUS.DISTRIBUTED;
    item.distributedAt = new Date();
  }

  if (payload.notes) item.notes = payload.notes;
  await item.save();

  let beneficiary = null;
  if (payload.beneficiaryId) {
    beneficiary = await Beneficiary.findOne({ _id: payload.beneficiaryId, ngoId: ngo._id });
    if (beneficiary) {
      beneficiary.mealsServed = (beneficiary.mealsServed || 0) + mealsServed;
      await beneficiary.save();
    }
  }

  await NGO.updateOne({ _id: ngo._id }, { $inc: { mealsServed: mealsServed } });

  const record = await DistributionRecord.create({
    ngoId: ngo._id,
    inventoryId: item._id,
    beneficiaryId: beneficiary?._id || null,
    beneficiaryGroup: payload.beneficiaryGroup || beneficiary?.name || beneficiary?.category,
    foodItem: item.itemName,
    category: item.category,
    quantity: distributeQty,
    quantityUnit: item.quantityUnit,
    mealsServed,
    peopleServed,
    sourceDonationId: item.sourceDonationId,
    batchCode: item.batchCode,
    location: payload.location || beneficiary?.address,
    notes: payload.notes,
    loggedBy: userId,
  });

  return { item: mapInventoryItem(item.toObject()), distribution: record.toObject() };
}

export async function listDistributionRecords(userId, query = {}) {
  const ngo = await getNgoForUser(userId);
  const filter = { ngoId: ngo._id };
  if (query.beneficiaryId) filter.beneficiaryId = query.beneficiaryId;

  const records = await DistributionRecord.find(filter)
    .sort({ distributedAt: -1 })
    .limit(Number(query.limit) || 50)
    .lean();

  return {
    records: records.map((r) => ({
      id: r._id,
      batchCode: r.batchCode,
      foodItem: r.foodItem,
      quantity: `${r.quantity} ${r.quantityUnit || "meals"}`,
      mealsServed: r.mealsServed,
      peopleServed: r.peopleServed,
      beneficiaryGroup: r.beneficiaryGroup,
      location: r.location,
      distributedAt: r.distributedAt,
      notes: r.notes,
    })),
  };
}

export async function getInventoryStatistics(userId) {
  const ngo = await getNgoForUser(userId);

  const [total, available, expiring, expired] = await Promise.all([
    Inventory.countDocuments({ ngoId: ngo._id }),
    Inventory.aggregate([
      { $match: { ngoId: ngo._id, quantity: { $gt: 0 } } },
      { $group: { _id: null, totalQty: { $sum: "$quantity" }, meals: { $sum: "$estimatedMeals" } } },
    ]),
    Inventory.countDocuments({ ngoId: ngo._id, status: INVENTORY_STATUS.EXPIRING }),
    Inventory.countDocuments({ ngoId: ngo._id, status: INVENTORY_STATUS.EXPIRED }),
  ]);

  const stats = available[0] || { totalQty: 0, meals: 0 };

  return {
    totalBatches: total,
    availableFoodStock: Math.round(stats.totalQty),
    estimatedMeals: stats.meals,
    nearExpiry: expiring,
    expiredItems: expired,
  };
}

export default { listInventory, getExpiryAlerts, distributeInventory, getInventoryStatistics, listDistributionRecords };
