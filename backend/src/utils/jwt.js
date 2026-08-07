import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index.js";
import ApiError from "./ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

/**
 * Build JWT payload shared by access and refresh tokens.
 */
const buildPayload = (user) => ({
  sub: user._id.toString(),
  email: user.email,
  role: user.role,
  fullName: user.fullName,
});

/**
 * Sign a short-lived access token for API authorization.
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    { ...buildPayload(user), type: "access" },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessExpiresIn },
  );
};

/**
 * Sign a long-lived refresh token for session renewal.
 */
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      type: "refresh",
      jti: crypto.randomUUID(),
    },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshExpiresIn },
  );
};

/**
 * Verify access token and return decoded payload.
 */
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret);
    if (decoded.type !== "access") {
      throw ApiError.unauthorized("Invalid access token type");
    }
    return decoded;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err.name === "TokenExpiredError") {
      throw ApiError.unauthorized("Access token expired");
    }
    throw ApiError.unauthorized("Invalid access token");
  }
};

/**
 * Verify refresh token and return decoded payload.
 */
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret);
    if (decoded.type !== "refresh") {
      throw ApiError.unauthorized("Invalid refresh token type");
    }
    return decoded;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err.name === "TokenExpiredError") {
      throw ApiError.unauthorized("Refresh token expired — please login again");
    }
    throw ApiError.unauthorized("Invalid refresh token");
  }
};

/**
 * Hash refresh token before persisting to database.
 */
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

/**
 * Parse JWT expiry string (e.g. "7d", "15m") to Date.
 */
export const getRefreshExpiryDate = () => {
  const expiresIn = config.jwt.refreshExpiresIn;
  const now = Date.now();

  const match = /^(\d+)([smhd])$/.exec(expiresIn);
  if (!match) {
    return new Date(now + 7 * 24 * 60 * 60 * 1000);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return new Date(now + value * multipliers[unit]);
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken,
  getRefreshExpiryDate,
};
