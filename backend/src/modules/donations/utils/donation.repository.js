import Donor from "../../../models/Donor.model.js";
import Donation from "../../../models/Donation.model.js";
import ApiError from "../../../utils/ApiError.js";

export async function getDonorForUser(userId) {
  const donor = await Donor.findOne({ userId, isActive: true }).lean();

  if (!donor) {
    throw ApiError.notFound("Donor profile not found for this account");
  }

  return donor;
}

export async function findDonationForDonor(donationId, donorId) {
  const donation = await Donation.findOne({ _id: donationId, donorId })
    .populate("ngoId", "ngoName")
    .populate("volunteerId", "vehicleType rating")
    .lean();

  if (!donation) {
    throw ApiError.notFound("Donation not found");
  }

  return donation;
}

export default { getDonorForUser, findDonationForDonor };
