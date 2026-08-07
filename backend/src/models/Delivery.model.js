import mongoose from "mongoose";
import { DELIVERY_STATUS, enumValues } from "../constants/enums.js";
import { geoPointSchema } from "./shared/schemas.js";
import { nonNegative } from "../utils/validators.js";

/**
 * Delivery timeline event — embedded subdocument for audit trail of a delivery.
 */
const deliveryEventSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: enumValues(DELIVERY_STATUS),
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: geoPointSchema,
      default: null,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  { _id: true },
);

/**
 * Delivery — tracks volunteer movement from donor pickup to NGO drop-off.
 */
const deliverySchema = new mongoose.Schema(
  {
    /** Human-readable reference e.g. DEL-8821 */
    deliveryCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    /** Associated donation */
    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: [true, "Donation is required"],
    },

    /** Assigned volunteer */
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: [true, "Volunteer is required"],
    },

    /** Destination NGO */
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: [true, "NGO is required"],
    },

    /** Current delivery state */
    status: {
      type: String,
      enum: enumValues(DELIVERY_STATUS),
      default: DELIVERY_STATUS.PENDING,
    },

    /** Pickup geo point (copied from donation for route calc) */
    pickupLocation: {
      type: geoPointSchema,
      default: null,
    },

    /** Drop-off geo point */
    deliveryLocation: {
      type: geoPointSchema,
      default: null,
    },

    /** Live volunteer position during transit */
    currentLocation: {
      type: geoPointSchema,
      default: null,
    },

    /** Estimated time of arrival */
    eta: {
      type: Date,
      default: null,
    },

    /** Route distance in kilometres */
    distanceKm: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Ordered status history for timeline UI */
    timeline: {
      type: [deliveryEventSchema],
      default: [],
    },

    /** When volunteer was assigned */
    assignedAt: {
      type: Date,
      default: null,
    },

    /** When food was collected from donor */
    pickedUpAt: {
      type: Date,
      default: null,
    },

    /** When food arrived at NGO */
    deliveredAt: {
      type: Date,
      default: null,
    },

    /** When delivery was confirmed complete */
    completedAt: {
      type: Date,
      default: null,
    },

    /** Proof-of-delivery photo URLs */
    proofImages: {
      type: [String],
      default: [],
    },

    /** Failure / cancellation reason */
    failureReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /** Recipient signature or OTP verification code */
    verificationCode: {
      type: String,
      trim: true,
    },

    /** Admin or system notes */
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ───
deliverySchema.index({ donationId: 1 }, { unique: true });
deliverySchema.index({ volunteerId: 1, status: 1 });
deliverySchema.index({ ngoId: 1, status: 1, createdAt: -1 });
deliverySchema.index({ status: 1, eta: 1 });
deliverySchema.index({ currentLocation: "2dsphere" });
deliverySchema.index({ createdAt: -1 });

deliverySchema.pre("save", async function generateCode(next) {
  if (this.deliveryCode) return next();
  const count = await mongoose.model("Delivery").countDocuments();
  this.deliveryCode = `DEL-${String(count + 1).padStart(4, "0")}`;
  next();
});

deliverySchema.methods.addTimelineEvent = function addTimelineEvent(status, note = null, location = null) {
  this.timeline.push({ status, note, location, timestamp: new Date() });
  this.status = status;
};

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
