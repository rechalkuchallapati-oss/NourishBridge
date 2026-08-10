import User from "../../../models/User.model.js";
import ApiError from "../../../utils/ApiError.js";
import { comparePassword } from "../../../utils/password.js";
import { AUTH_MESSAGES } from "../constants/messages.js";
import {
  findUserByEmail,
  findUserById,
  assertUserCanAuthenticate,
} from "../utils/user.repository.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";
import { issueTokenPair, revokeRefreshToken, rotateRefreshToken } from "./token.service.js";

/**
 * Authenticate credentials and issue a new token pair.
 */
export async function loginUser({ email, password }, meta = {}) {
  const user = await findUserByEmail(email, { withPassword: true });

  if (!user) {
    throw ApiError.unauthorized(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  assertUserCanAuthenticate(user);

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  await User.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

  const tokens = await issueTokenPair(user, meta);

  return {
    user: sanitizeUser(user),
    ...tokens,
  };
}

/**
 * Exchange a valid refresh token for a rotated token pair.
 */
export async function refreshSession(refreshToken, meta = {}) {
  return rotateRefreshToken(refreshToken, meta);
}

/**
 * Revoke refresh token on logout.
 */
export async function logoutUser(refreshToken) {
  await revokeRefreshToken(refreshToken);
  return { message: AUTH_MESSAGES.LOGOUT_SUCCESS };
}

/**
 * Fetch current user profile by ID.
 */
export async function getCurrentUser(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return sanitizeUser(user);
}

export default {
  loginUser,
  refreshSession,
  logoutUser,
  getCurrentUser,
};
