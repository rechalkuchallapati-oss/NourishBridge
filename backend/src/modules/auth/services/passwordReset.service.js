import User from "../../../models/User.model.js";
import PasswordResetOtp from "../../../models/PasswordResetOtp.model.js";
import ApiError from "../../../utils/ApiError.js";
import { hashPassword } from "../../../utils/password.js";
import { generateOtp, hashOtp, verifyOtp, getOtpExpiryDate } from "../../../utils/otp.js";
import config from "../../../config/index.js";
import logger from "../../../utils/logger.js";
import { RESET_MESSAGES } from "../constants/messages.js";
import { revokeAllUserTokens } from "./token.service.js";
import { sendPasswordResetOtp } from "./email.service.js";

const countRecentOtpRequests = async (email) => {
  const windowStart = new Date(
    Date.now() - config.otp.resendCooldownMinutes * 60 * 1000,
  );

  return PasswordResetOtp.countDocuments({
    email: email.toLowerCase(),
    purpose: "password_reset",
    createdAt: { $gte: windowStart },
  });
};

/**
 * POST /auth/forgot-password
 */
export async function requestPasswordReset(email, meta = {}) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
    isDeleted: false,
  })
    .select("_id fullName email")
    .lean();

  if (!user) {
    logger.debug(`Password reset requested for unknown email: ${normalizedEmail}`);
    return {
      message: RESET_MESSAGES.GENERIC_SENT,
      expiresInMinutes: config.otp.expiryMinutes,
    };
  }

  const recentCount = await countRecentOtpRequests(normalizedEmail);
  if (recentCount >= config.otp.maxRequestsPerWindow) {
    throw ApiError.tooManyRequests(
      `Too many reset requests. Please try again in ${config.otp.resendCooldownMinutes} minutes.`,
    );
  }

  await PasswordResetOtp.updateMany(
    { email: normalizedEmail, purpose: "password_reset", isUsed: false },
    { $set: { isUsed: true, usedAt: new Date() } },
  );

  const plainOtp = generateOtp();
  const otpHash = hashOtp(plainOtp);
  let otpRecord = null;

  try {
    otpRecord = await PasswordResetOtp.create({
      email: normalizedEmail,
      userId: user._id,
      otpHash,
      purpose: "password_reset",
      expiresAt: getOtpExpiryDate(),
      ipAddress: meta.ipAddress || null,
    });

    await sendPasswordResetOtp({
      to: normalizedEmail,
      otp: plainOtp,
      fullName: user.fullName,
    });
  } catch (error) {
    if (otpRecord?._id) {
      await PasswordResetOtp.findByIdAndDelete(otpRecord._id);
    }

    logger.error(
      `Failed to send reset OTP email to ${normalizedEmail}: ${error.message}`,
    );
    throw ApiError.internal(RESET_MESSAGES.EMAIL_SEND_FAILED);
  }

  return {
    message: RESET_MESSAGES.GENERIC_SENT,
    expiresInMinutes: config.otp.expiryMinutes,
  };
}

/**
 * POST /auth/reset-password
 */
export async function resetPassword({ email, otp, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail,
    isDeleted: false,
  }).select("+password");

  if (!user) {
    throw ApiError.badRequest(RESET_MESSAGES.INVALID_OTP);
  }

  const otpRecord = await PasswordResetOtp.findOne({
    email: normalizedEmail,
    purpose: "password_reset",
    isUsed: false,
    expiresAt: { $gt: new Date() },
  })
    .sort({ createdAt: -1 })
    .lean();

  if (!otpRecord) {
    throw ApiError.badRequest(RESET_MESSAGES.INVALID_OTP);
  }

  if (otpRecord.attempts >= otpRecord.maxAttempts) {
    throw ApiError.badRequest(RESET_MESSAGES.TOO_MANY_ATTEMPTS);
  }

  const isValid = verifyOtp(otp, otpRecord.otpHash);

  if (!isValid) {
    await PasswordResetOtp.updateOne(
      { _id: otpRecord._id },
      { $inc: { attempts: 1 } },
    );
    throw ApiError.badRequest(RESET_MESSAGES.INVALID_OTP);
  }

  user.password = await hashPassword(password);
  await user.save();

  await PasswordResetOtp.deleteMany({
    email: normalizedEmail,
    purpose: "password_reset",
  });

  await revokeAllUserTokens(user._id);

  return { message: RESET_MESSAGES.RESET_SUCCESS };
}

export default { requestPasswordReset, resetPassword };
