import Delivery from "../../../models/Delivery.model.js";
import ApiError from "../../../utils/ApiError.js";
import { getVolunteerForUser, getNgoForUser } from "../../shared/repositories/roleProfiles.repository.js";
import { mapDeliveryResponse } from "../utils/delivery.mapper.js";
import deliveryWorkflow from "./deliveryWorkflow.service.js";

export async function getDelivery(userId, role, deliveryId) {
  const delivery = await Delivery.findById(deliveryId)
    .populate("volunteerId", "vehicleType rating")
    .populate("ngoId", "ngoName address")
    .populate({ path: "donationId", select: "foodType donationCode quantity quantityUnit images" })
    .lean();

  if (!delivery) throw ApiError.notFound("Delivery not found");

  if (role === "volunteer") {
    const volunteer = await getVolunteerForUser(userId);
    if (String(delivery.volunteerId?._id || delivery.volunteerId) !== String(volunteer._id)) {
      throw ApiError.forbidden("Access denied");
    }
  } else if (role === "ngo") {
    const ngo = await getNgoForUser(userId);
    if (String(delivery.ngoId?._id || delivery.ngoId) !== String(ngo._id)) {
      throw ApiError.forbidden("Access denied");
    }
  }

  return mapDeliveryResponse(delivery);
}

export async function getDeliveryByDonation(userId, role, donationId) {
  const delivery = await deliveryWorkflow.findDeliveryByDonation(donationId);
  if (!delivery) throw ApiError.notFound("Delivery not found for this donation");
  return getDelivery(userId, role, delivery._id);
}

export async function listVolunteerActiveDeliveries(userId) {
  const volunteer = await getVolunteerForUser(userId);
  const deliveries = await Delivery.find({
    volunteerId: volunteer._id,
    status: { $nin: ["completed", "failed", "cancelled"] },
  })
    .sort({ updatedAt: -1 })
    .populate("ngoId", "ngoName")
    .populate({ path: "donationId", select: "foodType donationCode" })
    .lean();

  return { deliveries: deliveries.map(mapDeliveryResponse) };
}

export async function listNgoIncomingDeliveries(userId) {
  const ngo = await getNgoForUser(userId);
  const deliveries = await Delivery.find({
    ngoId: ngo._id,
    status: { $in: ["in_transit", "at_dropoff", "delivery_verified", "delivered"] },
  })
    .sort({ updatedAt: -1 })
    .populate("volunteerId", "vehicleType rating")
    .populate({ path: "donationId", select: "foodType donationCode quantity" })
    .lean();

  return { deliveries: deliveries.map(mapDeliveryResponse) };
}

export async function addProofImages(deliveryId, proofType, filenames, actor) {
  const delivery = await Delivery.findById(deliveryId);
  if (!delivery) throw ApiError.notFound("Delivery not found");

  if (proofType === "pickup") {
    delivery.pickupProofImages = [...(delivery.pickupProofImages || []), ...filenames];
  } else {
    delivery.deliveryProofImages = [...(delivery.deliveryProofImages || []), ...filenames];
    delivery.proofImages = delivery.deliveryProofImages;
  }

  await delivery.save();
  return mapDeliveryResponse(delivery.toObject());
}

export default {
  getDelivery,
  getDeliveryByDonation,
  listVolunteerActiveDeliveries,
  listNgoIncomingDeliveries,
  addProofImages,
};
