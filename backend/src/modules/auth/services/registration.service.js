import User from "../../../models/User.model.js";
import Donor from "../../../models/Donor.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import NGO from "../../../models/NGO.model.js";
import ApiError from "../../../utils/ApiError.js";
import { hashPassword } from "../../../utils/password.js";
import {
  USER_ROLES,
  USER_STATUS,
  DONOR_TYPES,
  VEHICLE_TYPES,
} from "../../../constants/enums.js";
import { AUTH_MESSAGES } from "../constants/messages.js";
import { findUserByEmail } from "../utils/user.repository.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { issueTokenPair } from "./token.service.js";

async function createRoleProfile(user, profile = {}) {
  switch (user.role) {
    case USER_ROLES.DONOR:
      await Donor.create({
        userId: user._id,
        donorType: profile.donorType || DONOR_TYPES.INDIVIDUAL,
        organizationName: profile.organizationName || user.fullName,
        contactPerson: user.fullName,
      });
      break;

    case USER_ROLES.VOLUNTEER:
      await Volunteer.create({
        userId: user._id,
        vehicleType: profile.vehicleType || VEHICLE_TYPES.BIKE,
        availabilitySchedule: profile.availabilitySchedule || [],
        serviceRadiusKm: profile.serviceRadiusKm ?? 10,
        serviceAreas: profile.serviceAreas?.length
          ? profile.serviceAreas
          : user.address?.city
            ? [user.address.city]
            : [],
      });
      break;

    case USER_ROLES.NGO:
      await NGO.create({
        userId: user._id,
        ngoName: profile.ngoName,
        registrationNumber: profile.registrationNumber.toUpperCase(),
        address: user.address,
        contactPerson: user.fullName,
        contactPhone: user.phone,
      });
      break;

    default:
      break;
  }
}

/**
 * Register a new user with role profile and issue tokens.
 */
export async function registerUser(payload, meta = {}) {
  const { fullName, email, password, phone, role, address, profile = {} } = payload;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw ApiError.conflict(AUTH_MESSAGES.EMAIL_TAKEN);
  }

  const hashedPassword = await hashPassword(password);
  let user = null;

  try {
    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      address,
      status: USER_STATUS.ACTIVE,
    });

    await createRoleProfile(user, profile);

    const tokens = await issueTokenPair(user, meta);

    return {
      user: sanitizeUser(user),
      ...tokens,
    };
  } catch (error) {
    if (user?._id) {
      await User.findByIdAndDelete(user._id);
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0];
      if (field === "email") {
        throw ApiError.conflict(AUTH_MESSAGES.EMAIL_TAKEN);
      }
      throw ApiError.conflict(`Duplicate value for ${field}`);
    }

    throw error;
  }
}

export default { registerUser };
