import mongoose from "mongoose";
import {
  VEHICLE_TYPES,
  VOLUNTEER_AVAILABILITY,
  VERIFICATION_STATUS,
  enumValues,
} from "../constants/enums.js";
import { geoPointSchema, verificationDocumentSchema } from "./shared/schemas.js";
import { nonNegative, percentValidator, ratingValidator } from "../utils/validators.js";

/**
 * Volunteer — role-specific profile for food pickup and delivery personnel.
 */
const volunteerSchema = new mongoose.Schema(
  {
    /** Reference to base User account */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      unique: true,
    },

    /** Transport used for pickups — affects assignment matching */
    vehicleType: {
      type: String,
      required: [true, "Vehicle type is required"],
      enum: enumValues(VEHICLE_TYPES),
    },

    /** Real-time availability for dispatch algorithms */
    availability: {
      type: String,
      enum: enumValues(VOLUNTEER_AVAILABILITY),
      default: VOLUNTEER_AVAILABILITY.OFFLINE,
    },

    /** Live GPS position for route tracking and nearby assignment */
    currentLocation: {
      type: geoPointSchema,
      default: null,
    },

    /** Cities / zones volunteer is willing to serve */
    serviceAreas: {
      type: [String],
      default: [],
    },

    /** Background check / ID verification */
    verificationStatus: {
      type: String,
      enum: enumValues(VERIFICATION_STATUS),
      default: VERIFICATION_STATUS.PENDING,
    },

    /** Completed delivery count — performance KPI */
    completedMissions: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Active mission reference for quick lookup */
    currentDeliveryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      default: null,
    },

    /** Average star rating from NGOs/donors */
    rating: {
      type: Number,
      default: 0,
      validate: ratingValidator,
    },

    /** Successful deliveries / total assigned — quality metric */
    successRate: {
      type: Number,
      default: 100,
      validate: percentValidator,
    },

    /** Maximum cargo capacity in kg */
    maxCapacityKg: {
      type: Number,
      default: 50,
      validate: nonNegative,
    },

    /** Driver license or vehicle registration document ref */
    licenseNumber: {
      type: String,
      trim: true,
    },

    /** Display vehicle description e.g. "Bike — KA 05 VL 4521" */
    vehicleDetails: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    /** Weekly availability time slots chosen by volunteer */
    availabilitySchedule: {
      type: [String],
      default: [],
    },

    /** Willingness radius in km */
    serviceRadiusKm: {
      type: Number,
      default: 10,
      validate: nonNegative,
    },

    /** Quick toggle for dispatch UI */
    isAvailable: {
      type: Boolean,
      default: true,
    },

    /** Uploaded ID / license documents */
    verificationDocuments: {
      type: [verificationDocumentSchema],
      default: [],
    },

    lastActiveAt: {
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
volunteerSchema.index({ availability: 1, isActive: 1 });
volunteerSchema.index({ verificationStatus: 1 });
volunteerSchema.index({ rating: -1, completedMissions: -1 });
volunteerSchema.index({ serviceAreas: 1 });
volunteerSchema.index({ currentLocation: "2dsphere" });

volunteerSchema.virtual("deliveries", {
  ref: "Delivery",
  localField: "_id",
  foreignField: "volunteerId",
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
