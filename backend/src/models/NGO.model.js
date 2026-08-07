import mongoose from "mongoose";
import {
  NGO_STATUS,
  VERIFICATION_STATUS,
  enumValues,
} from "../constants/enums.js";
import { addressSchema, geoPointSchema } from "./shared/schemas.js";
import { nonNegative, percentValidator, ratingValidator } from "../utils/validators.js";

/**
 * NGO — registered non-profit profile linked to a User with role=ngo.
 */
const ngoSchema = new mongoose.Schema(
  {
    /** Reference to base User account (NGO admin login) */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true,
    },

    /** Official registered name */
    ngoName: {
      type: String,
      required: [true, "NGO name is required"],
      trim: true,
      maxlength: 200,
    },

    /** Government registration number — unique per NGO */
    registrationNumber: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },

    /** Structured address for deliveries and verification */
    address: {
      type: addressSchema,
      required: [true, "Address is required"],
    },

    /** Geo coordinates for map views and nearby donor matching */
    location: {
      type: geoPointSchema,
      default: null,
    },

    /** Document / field verification by platform admin */
    verificationStatus: {
      type: String,
      enum: enumValues(VERIFICATION_STATUS),
      default: VERIFICATION_STATUS.PENDING,
    },

    /** Operational status on the platform */
    status: {
      type: String,
      enum: enumValues(NGO_STATUS),
      default: NGO_STATUS.PENDING,
    },

    /** Total cold storage capacity in kg */
    coldStorageCapacityKg: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Total dry storage capacity in kg */
    dryStorageCapacityKg: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Current storage utilization percentage */
    utilizationPercent: {
      type: Number,
      default: 0,
      validate: percentValidator,
    },

    /** Cumulative meals distributed — impact reporting */
    mealsServed: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Average beneficiary rating */
    rating: {
      type: Number,
      default: 0,
      validate: ratingValidator,
    },

    /** Short mission statement for public profile */
    mission: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    /** Geographic areas served */
    serviceAreas: {
      type: [String],
      default: [],
    },

    /** Estimated daily beneficiary capacity */
    dailyBeneficiaryCapacity: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Primary contact (may differ from User.fullName) */
    contactPerson: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    contactPhone: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    logoUrl: {
      type: String,
      trim: true,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ───
ngoSchema.index({ "address.city": 1, status: 1 });
ngoSchema.index({ verificationStatus: 1 });
ngoSchema.index({ status: 1, rating: -1 });
ngoSchema.index({ location: "2dsphere" });
ngoSchema.index({ mealsServed: -1 });
ngoSchema.index({ ngoName: "text", mission: "text" });

ngoSchema.virtual("donations", {
  ref: "Donation",
  localField: "_id",
  foreignField: "ngoId",
});

ngoSchema.virtual("inventory", {
  ref: "Inventory",
  localField: "_id",
  foreignField: "ngoId",
});

ngoSchema.virtual("foodRequests", {
  ref: "FoodRequest",
  localField: "_id",
  foreignField: "ngoId",
});

const NGO = mongoose.model("NGO", ngoSchema);

export default NGO;
