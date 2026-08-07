import User from "../models/User.model.js";
import Donor from "../models/Donor.model.js";
import Volunteer from "../models/Volunteer.model.js";
import NGO from "../models/NGO.model.js";
import RefreshToken from "../models/RefreshToken.model.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
  getRefreshExpiryDate,
} from "../utils/jwt.js";
import { USER_ROLES, USER_STATUS, DONOR_TYPES, VEHICLE_TYPES } from "../constants/enums.js";

/**
 * Strip sensitive fields before sending user to client.
 */
const sanitizeUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  role: user.role,
  profileImage: user.profileImage,
  address: user.address,
  status: user.status,
  verificationStatus: user.verificationStatus,
  lastLoginAt: user.lastLoginAt,
  createdAt: user.createdAt,
});

/**
 * Create role-specific profile document after User registration.
 */
const createRoleProfile = async (user, profile = {}) => {
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
};

/**
 * Persist refresh token hash and return token pair.
 */
const issueTokenPair = async (user, meta = {}) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({
    userId: user._id,
    tokenHash: hashToken(refreshToken),
    expiresAt: getRefreshExpiryDate(),
    userAgent: meta.userAgent || null,
    ipAddress: meta.ipAddress || null,
  });

  return { accessToken, refreshToken };
};

/**
 * Register a new user with role profile.
 * Uses compensating delete if profile creation fails (works on standalone MongoDB).
 */
const register = async (payload, meta = {}) => {
  const { fullName, email, password, phone, role, address, profile = {} } = payload;

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
    isDeleted: false,
  });

  if (existingUser) {
    throw ApiError.conflict("Email is already registered");
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
        throw ApiError.conflict("Email is already registered");
      }
      throw ApiError.conflict(`Duplicate value for ${field}`);
    }

    throw error;
  }
};

/**
 * Authenticate user credentials and issue tokens.
 */
const login = async ({ email, password }, meta = {}) => {
  const user = await User.findOne({
    email: email.toLowerCase(),
    isDeleted: false,
  }).select("+password");

  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  if (user.status === USER_STATUS.SUSPENDED) {
    throw ApiError.forbidden("Your account has been suspended");
  }

  if (user.status === USER_STATUS.INACTIVE) {
    throw ApiError.forbidden("Your account is inactive");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  user.lastLoginAt = new Date();
  await user.save();

  const tokens = await issueTokenPair(user, meta);

  return {
    user: sanitizeUser(user),
    ...tokens,
  };
};

/**
 * Exchange a valid refresh token for a new access token (with rotation).
 */
const refreshAccessToken = async (refreshToken, meta = {}) => {
  const decoded = verifyRefreshToken(refreshToken);
  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({
    tokenHash,
    userId: decoded.sub,
    isRevoked: false,
  });

  if (!storedToken) {
    throw ApiError.unauthorized("Refresh token is invalid or has been revoked");
  }

  if (storedToken.expiresAt < new Date()) {
    throw ApiError.unauthorized("Refresh token expired — please login again");
  }

  const user = await User.findOne({
    _id: decoded.sub,
    isDeleted: false,
  });

  if (!user) {
    throw ApiError.unauthorized("User account not found");
  }

  if (user.status === USER_STATUS.SUSPENDED) {
    throw ApiError.forbidden("Your account has been suspended");
  }

  // Rotate refresh token — revoke old, issue new pair
  storedToken.isRevoked = true;
  storedToken.revokedAt = new Date();
  await storedToken.save();

  const tokens = await issueTokenPair(user, meta);

  return {
    user: sanitizeUser(user),
    ...tokens,
  };
};

/**
 * Revoke a refresh token (logout).
 */
const logout = async (refreshToken) => {
  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({ tokenHash });

  if (storedToken && !storedToken.isRevoked) {
    storedToken.isRevoked = true;
    storedToken.revokedAt = new Date();
    await storedToken.save();
  }

  return { message: "Logged out successfully" };
};

/**
 * Get current user by ID (for /me endpoint).
 */
const getCurrentUser = async (userId) => {
  const user = await User.findOne({ _id: userId, isDeleted: false });

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return sanitizeUser(user);
};

export default {
  register,
  login,
  refreshAccessToken,
  logout,
  getCurrentUser,
  sanitizeUser,
};
