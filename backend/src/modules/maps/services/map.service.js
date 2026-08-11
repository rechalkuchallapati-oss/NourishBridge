import Donation from "../../../models/Donation.model.js";
import Delivery from "../../../models/Delivery.model.js";
import Donor from "../../../models/Donor.model.js";
import NGO from "../../../models/NGO.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import ApiError from "../../../utils/ApiError.js";
import { extractCoords, routeSummary } from "../../../utils/geo.js";
import { broadcastVolunteerLocation } from "../../../services/socket.service.js";

async function getDonationLocations(donationId) {
  const donation = await Donation.findById(donationId)
    .populate("ngoId", "ngoName location address")
    .populate("volunteerId", "currentLocation vehicleType")
    .lean();

  if (!donation) throw ApiError.notFound("Donation not found");

  const delivery = await Delivery.findOne({ donationId }).lean();
  const donor = await Donor.findById(donation.donorId).populate("userId", "fullName").lean();

  const pickup = extractCoords(donation.pickupLocation || delivery?.pickupLocation);
  const ngo = donation.ngoId
    ? extractCoords(donation.ngoId.location) || extractCoords(delivery?.deliveryLocation)
    : extractCoords(delivery?.deliveryLocation);
  const volunteer = extractCoords(
    delivery?.currentLocation || donation.volunteerId?.currentLocation,
  );

  const pickupToNgo = pickup && ngo ? routeSummary(pickup, ngo) : { distanceKm: null, etaMinutes: null };
  const volunteerToPickup =
    volunteer && pickup ? routeSummary(volunteer, pickup) : { distanceKm: null, etaMinutes: null };
  const volunteerToNgo =
    volunteer && ngo ? routeSummary(volunteer, ngo) : { distanceKm: null, etaMinutes: null };

  return {
    donationId: donation._id,
    donationCode: donation.donationCode,
    donor: {
      name: donor?.userId?.fullName || "Donor",
      location: pickup,
      address: donation.pickupAddress,
    },
    ngo: donation.ngoId
      ? {
          id: donation.ngoId._id,
          name: donation.ngoId.ngoName,
          location: ngo,
          address: donation.ngoId.address,
        }
      : null,
    volunteer: donation.volunteerId
      ? {
          id: donation.volunteerId._id,
          location: volunteer,
          vehicleType: donation.volunteerId.vehicleType,
        }
      : null,
    delivery: delivery
      ? {
          id: delivery._id,
          status: delivery.status,
          currentLocation: volunteer,
        }
      : null,
    routes: {
      pickupToNgo,
      volunteerToPickup,
      volunteerToNgo,
      totalDistanceKm:
        pickupToNgo.distanceKm != null && volunteerToPickup.distanceKm != null
          ? Math.round((pickupToNgo.distanceKm + volunteerToPickup.distanceKm) * 100) / 100
          : pickupToNgo.distanceKm,
      etaMinutes:
        (pickupToNgo.etaMinutes || 0) + (volunteerToPickup.etaMinutes || 0) || null,
    },
  };
}

async function getDeliveryRoute(deliveryId, userId, role) {
  const delivery = await Delivery.findById(deliveryId)
    .populate("ngoId", "ngoName location address")
    .populate("volunteerId", "currentLocation vehicleType")
    .populate({ path: "donationId", select: "donationCode pickupLocation pickupAddress donorId" })
    .lean();

  if (!delivery) throw ApiError.notFound("Delivery not found");

  if (role === "volunteer") {
    const volunteer = await Volunteer.findOne({ userId }).lean();
    if (!volunteer || String(delivery.volunteerId?._id) !== String(volunteer._id)) {
      throw ApiError.forbidden("Not your delivery");
    }
  }

  const pickup = extractCoords(delivery.pickupLocation || delivery.donationId?.pickupLocation);
  const ngoLoc = extractCoords(delivery.deliveryLocation || delivery.ngoId?.location);
  const volunteerLoc = extractCoords(
    delivery.currentLocation || delivery.volunteerId?.currentLocation,
  );

  const leg1 = volunteerLoc && pickup ? routeSummary(volunteerLoc, pickup) : { distanceKm: null, etaMinutes: null };
  const leg2 = pickup && ngoLoc ? routeSummary(pickup, ngoLoc) : { distanceKm: null, etaMinutes: null };

  return {
    deliveryId: delivery._id,
    deliveryCode: delivery.deliveryCode,
    status: delivery.status,
    pickup: { location: pickup, address: delivery.donationId?.pickupAddress },
    ngo: {
      name: delivery.ngoId?.ngoName,
      location: ngoLoc,
      address: delivery.ngoId?.address,
    },
    volunteer: { location: volunteerLoc, vehicleType: delivery.volunteerId?.vehicleType },
    routes: {
      toPickup: leg1,
      toNgo: leg2,
      totalDistanceKm:
        leg1.distanceKm != null && leg2.distanceKm != null
          ? Math.round((leg1.distanceKm + leg2.distanceKm) * 100) / 100
          : leg2.distanceKm ?? leg1.distanceKm,
      etaMinutes: (leg1.etaMinutes || 0) + (leg2.etaMinutes || 0) || null,
    },
  };
}

async function updateVolunteerLocation(userId, coordinates) {
  const volunteer = await Volunteer.findOne({ userId, isActive: true });
  if (!volunteer) throw ApiError.notFound("Volunteer profile not found");

  if (!coordinates || coordinates.length !== 2) {
    throw ApiError.badRequest("coordinates must be [lng, lat]");
  }

  volunteer.currentLocation = { type: "Point", coordinates };
  await volunteer.save();

  const activeDelivery = await Delivery.findOne({
    volunteerId: volunteer._id,
    status: { $nin: ["completed", "cancelled", "failed"] },
  });

  if (activeDelivery) {
    activeDelivery.currentLocation = volunteer.currentLocation;
    await activeDelivery.save();

    broadcastVolunteerLocation({
      deliveryId: activeDelivery._id,
      volunteerId: volunteer._id,
      missionId: activeDelivery.donationId,
      coordinates: volunteer.currentLocation.coordinates,
    });
  }

  return { updated: true, coordinates: volunteer.currentLocation.coordinates, deliveryId: activeDelivery?._id };
}

export default { getDonationLocations, getDeliveryRoute, updateVolunteerLocation };
