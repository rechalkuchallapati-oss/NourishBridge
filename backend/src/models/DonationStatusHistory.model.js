import mongoose from "mongoose";
import { DONATION_STATUS, USER_ROLES, enumValues } from "../constants/enums.js";

/**
 * DonationStatusHistory — append-only record of every donation status transition.
 */
const donationStatusHistorySchema = new mongoose.Schema(
  {
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
      index: true,
    },

    fromStatus: {
      type: String,
      enum: [...enumValues(DONATION_STATUS), null],
      default: null,
    },

    toStatus: {
      type: String,
      enum: enumValues(DONATION_STATUS),
      required: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    actorRole: {
      type: String,
      enum: enumValues(USER_ROLES),
      required: true,
    },

    actorName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    reason: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    ipAddress: { type: String, trim: true, maxlength: 45 },
    userAgent: { type: String, trim: true, maxlength: 500 },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

donationStatusHistorySchema.index({ donationId: 1, createdAt: -1 });
donationStatusHistorySchema.index({ actorId: 1, createdAt: -1 });

const DonationStatusHistory = mongoose.model("DonationStatusHistory", donationStatusHistorySchema);

export default DonationStatusHistory;
