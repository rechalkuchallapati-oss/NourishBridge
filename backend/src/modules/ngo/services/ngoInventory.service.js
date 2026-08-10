import Inventory from "../../../models/Inventory.model.js";
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
  return { items: items.map(mapInventoryItem) };
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

  item.quantity -= distributeQty;
  item.distributedQuantity = (item.distributedQuantity || 0) + distributeQty;

  if (item.quantity <= 0) {
    item.quantity = 0;
    item.status = INVENTORY_STATUS.DISTRIBUTED;
    item.distributedAt = new Date();
  }

  if (payload.notes) item.notes = payload.notes;
  await item.save();

  return mapInventoryItem(item.toObject());
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

export default { listInventory, getExpiryAlerts, distributeInventory, getInventoryStatistics };
