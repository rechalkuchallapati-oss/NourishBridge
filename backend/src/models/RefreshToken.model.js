import mongoose from "mongoose";

/**
 * RefreshToken — persisted refresh tokens for secure session renewal and revocation.
 * Only the SHA-256 hash is stored — never the raw token.
 */
const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    isRevoked: {
      type: Boolean,
      default: false,
      index: true,
    },

    revokedAt: {
      type: Date,
      default: null,
    },

    userAgent: {
      type: String,
      trim: true,
      maxlength: 500,
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

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;
