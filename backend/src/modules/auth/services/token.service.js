import RefreshToken from "../../../models/RefreshToken.model.js";
import ApiError from "../../../utils/ApiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
  getRefreshExpiryDate,
} from "../../../utils/jwt.js";
import { AUTH_MESSAGES } from "../constants/messages.js";
import { findUserById, assertUserCanAuthenticate } from "../utils/user.repository.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";

/**
 * Persist refresh token hash and return signed token pair.
 */
export async function issueTokenPair(user, meta = {}) {
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
}

/**
 * Revoke a refresh token by raw value (logout).
 */
export async function revokeRefreshToken(refreshToken) {
  const tokenHash = hashToken(refreshToken);

  const result = await RefreshToken.updateOne(
    { tokenHash, isRevoked: false },
    { $set: { isRevoked: true, revokedAt: new Date() } },
  );

  return { revoked: result.modifiedCount > 0 };
}

/**
 * Validate stored refresh token document.
 */
async function findValidStoredToken(refreshToken, userId) {
  const tokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({
    tokenHash,
    userId,
    isRevoked: false,
  }).lean();

  if (!storedToken) {
    throw ApiError.unauthorized(AUTH_MESSAGES.REFRESH_INVALID);
  }

  if (storedToken.expiresAt < new Date()) {
    throw ApiError.unauthorized(AUTH_MESSAGES.REFRESH_EXPIRED);
  }

  return storedToken;
}

/**
 * Rotate refresh token — revoke old, issue new pair.
 */
export async function rotateRefreshToken(refreshToken, meta = {}) {
  const decoded = verifyRefreshToken(refreshToken);
  const storedToken = await findValidStoredToken(refreshToken, decoded.sub);

  const user = await findUserById(decoded.sub);
  assertUserCanAuthenticate(user);

  await RefreshToken.updateOne(
    { _id: storedToken._id },
    { $set: { isRevoked: true, revokedAt: new Date() } },
  );

  const tokens = await issueTokenPair(user, meta);

  return {
    user: sanitizeUser(user),
    ...tokens,
  };
}

/**
 * Revoke all active refresh tokens for a user (password reset).
 */
export async function revokeAllUserTokens(userId) {
  return RefreshToken.updateMany(
    { userId, isRevoked: false },
    { $set: { isRevoked: true, revokedAt: new Date() } },
  );
}

export default {
  issueTokenPair,
  revokeRefreshToken,
  rotateRefreshToken,
  revokeAllUserTokens,
};
