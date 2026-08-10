import Inventory from "../../../models/Inventory.model.js";
import Donor from "../../../models/Donor.model.js";
import NGO from "../../../models/NGO.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import { INVENTORY_STATUS } from "../../../constants/enums.js";

function inferStorageType(category) {
  const coldCategories = new Set(["dairy", "fruits", "vegetables", "cooked_meals"]);
  if (coldCategories.has(category)) return "cold";
  return "ambient";
}

export async function createInventoryFromDelivery(delivery, donation, ngoId, userId) {
  const existing = await Inventory.findOne({ sourceDeliveryId: delivery._id });
  if (existing) return existing;

  const qty = delivery.deliveryQuantity || delivery.pickupQuantity || donation.quantity;

  const batch = await Inventory.create({
    ngoId,
    sourceDonationId: donation._id,
    sourceDeliveryId: delivery._id,
    volunteerId: delivery.volunteerId,
    itemName: donation.foodType,
    category: donation.category,
    quantity: qty,
    initialQuantity: qty,
    distributedQuantity: 0,
    quantityUnit: delivery.quantityUnit || donation.quantityUnit,
    storageType: inferStorageType(donation.category),
    expiryDate: donation.expiryTime || new Date(Date.now() + 24 * 3600 * 1000),
    estimatedMeals: donation.estimatedMeals || 0,
    receivedFrom: donation.donorId?.userId?.fullName || "Donor",
    receivedAt: delivery.completedAt || delivery.deliveredAt || new Date(),
    pickupProofImages: delivery.pickupProofImages || [],
    deliveryProofImages: delivery.deliveryProofImages || delivery.proofImages || [],
    status: INVENTORY_STATUS.AVAILABLE,
    loggedBy: userId,
    notes: `Auto-created from delivery ${delivery.deliveryCode}`,
  });

  await Donor.updateOne({ _id: donation.donorId }, { $inc: { mealsContributed: donation.estimatedMeals || 0 } });
  await NGO.updateOne({ _id: ngoId }, { $inc: { mealsServed: donation.estimatedMeals || 0 } });

  const volunteer = delivery.volunteerId
    ? await Volunteer.findById(delivery.volunteerId)
    : null;
  if (volunteer) {
    volunteer.completedMissions = (volunteer.completedMissions || 0) + 1;
    volunteer.isAvailable = true;
    volunteer.availability = "available";
    await volunteer.save();
  }

  return batch;
}

export default { createInventoryFromDelivery };
