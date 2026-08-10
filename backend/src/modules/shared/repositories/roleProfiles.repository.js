import Donor from "../../../models/Donor.model.js";
import NGO from "../../../models/NGO.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import ApiError from "../../../utils/ApiError.js";

export async function getDonorForUser(userId) {
  const donor = await Donor.findOne({ userId, isActive: true }).lean();
  if (!donor) throw ApiError.notFound("Donor profile not found for this account");
  return donor;
}

export async function getNgoForUser(userId) {
  const ngo = await NGO.findOne({ userId }).lean();
  if (!ngo) throw ApiError.notFound("NGO profile not found for this account");
  return ngo;
}

export async function getVolunteerForUser(userId) {
  const volunteer = await Volunteer.findOne({ userId, isActive: true }).lean();
  if (!volunteer) throw ApiError.notFound("Volunteer profile not found for this account");
  return volunteer;
}

export default { getDonorForUser, getNgoForUser, getVolunteerForUser };
