import User from "../../../models/User.model.js";
import Donor from "../../../models/Donor.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import NGO from "../../../models/NGO.model.js";
import Admin from "../../../models/Admin.model.js";
import ApiError from "../../../utils/ApiError.js";
import { USER_ROLES } from "../../../constants/enums.js";

const ROLE_MODEL_MAP = {
  [USER_ROLES.DONOR]: Donor,
  [USER_ROLES.VOLUNTEER]: Volunteer,
  [USER_ROLES.NGO]: NGO,
  [USER_ROLES.ADMIN]: Admin,
};

export async function findUserProfile(userId) {
  const user = await User.findOne({ _id: userId, isDeleted: false });

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return user;
}

export async function findRoleProfile(user) {
  const Model = ROLE_MODEL_MAP[user.role];

  if (!Model) {
    return null;
  }

  return Model.findOne({ userId: user._id });
}

export async function ensureRoleProfile(user) {
  const existing = await findRoleProfile(user);
  if (existing) return existing;

  switch (user.role) {
    case USER_ROLES.ADMIN:
      return Admin.create({ userId: user._id });
    default:
      throw ApiError.notFound(`Role profile not found for ${user.role}`);
  }
}

export default {
  findUserProfile,
  findRoleProfile,
  ensureRoleProfile,
  ROLE_MODEL_MAP,
};
