import mongoose from "mongoose";

/**
 * PasswordResetOtp — stores hashed OTPs for password reset verification.
 * Raw OTP is never persisted; TTL index auto-deletes expired documents.
 */
const passwordResetOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    otpHash: {
      type: String,
      required: true,
    },

    purpose: {
      type: String,
      enum: ["password_reset"],
      default: "password_reset",
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    maxAttempts: {
      type: Number,
      default: 5,
    },

    isUsed: {
      type: Boolean,
      default: false,
      index: true,
    },

    usedAt: {
      type: Date,
      default: null,
    },

    ipAddress: {
      type: String,
      trim: true,
      maxlength: 45,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

passwordResetOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
passwordResetOtpSchema.index({ email: 1, purpose: 1, isUsed: 1 });

const PasswordResetOtp = mongoose.model("PasswordResetOtp", passwordResetOtpSchema);

export default PasswordResetOtp;
