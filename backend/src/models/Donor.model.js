import mongoose from "mongoose";
import {
  DONOR_TYPES,
  DONOR_TIERS,
  VERIFICATION_STATUS,
  enumValues,
} from "../constants/enums.js";
import { nonNegative } from "../utils/validators.js";

/**
 * Donor — role-specific profile linked 1:1 to a User with role=donor.
 * Stores donation history aggregates and business metadata.
 */
const donorSchema = new mongoose.Schema(
  {
    /** Reference to base User account */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true,
    },

    /** Business or individual donor classification */
    donorType: {
      type: String,
      required: [true, "Donor type is required"],
      enum: enumValues(DONOR_TYPES),
    },

    /** Organization / business name (optional for individuals) */
    organizationName: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    /** Primary contact person for business donors */
    contactPerson: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    /** Business registration or FSSAI license number */
    businessLicense: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    /** Document verification for admin approval */
    verificationStatus: {
      type: String,
      enum: enumValues(VERIFICATION_STATUS),
      default: VERIFICATION_STATUS.PENDING,
    },

    /** Gamification tier based on donation frequency */
    tier: {
      type: String,
      enum: enumValues(DONOR_TIERS),
      default: DONOR_TIERS.MEMBER,
    },

    /** Denormalized count — updated when donations complete (fast admin KPI queries) */
    totalDonations: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Estimated meals contributed — impact reporting */
    mealsContributed: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Average donation size in kg — logistics planning */
    avgQuantityKg: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Whether donor donates on a recurring schedule */
    isRecurring: {
      type: Boolean,
      default: false,
    },

    /** Preferred pickup window e.g. "morning", "evening" */
    preferredPickupTime: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    /** Average rating from NGOs/volunteers */
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    /** Last successful donation timestamp */
    lastDonationAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ───
donorSchema.index({ donorType: 1, isActive: 1 });
donorSchema.index({ tier: 1, totalDonations: -1 });
donorSchema.index({ verificationStatus: 1 });
donorSchema.index({ mealsContributed: -1 });

// ─── Virtual: all donations by this donor ───
donorSchema.virtual("donations", {
  ref: "Donation",
  localField: "_id",
  foreignField: "donorId",
});

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
