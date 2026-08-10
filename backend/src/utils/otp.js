import crypto from "crypto";
import config from "../config/index.js";

const OTP_LENGTH = 6;

/**
 * Generate a cryptographically secure numeric OTP.
 */
export const generateOtp = () => {
  const max = 10 ** OTP_LENGTH;
  const min = 10 ** (OTP_LENGTH - 1);
  return String(crypto.randomInt(min, max));
};

/**
 * Hash OTP before persisting — never store plain OTP in the database.
 */
export const hashOtp = (otp) => {
  return crypto
    .createHmac("sha256", config.otp.secret)
    .update(String(otp))
    .digest("hex");
};

/**
 * Constant-time comparison to prevent timing attacks.
 */
export const verifyOtp = (plainOtp, storedHash) => {
  if (!plainOtp || !storedHash) return false;

  const computed = hashOtp(plainOtp);
  const computedBuf = Buffer.from(computed, "hex");
  const storedBuf = Buffer.from(storedHash, "hex");

  if (computedBuf.length !== storedBuf.length) return false;

  return crypto.timingSafeEqual(computedBuf, storedBuf);
};

/**
 * Calculate OTP expiry timestamp from configured minutes.
 */
export const getOtpExpiryDate = () => {
  return new Date(Date.now() + config.otp.expiryMinutes * 60 * 1000);
};

export default {
  generateOtp,
  hashOtp,
  verifyOtp,
  getOtpExpiryDate,
  OTP_LENGTH,
};
