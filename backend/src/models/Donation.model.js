import mongoose from "mongoose";
import {
  DONATION_STATUS,
  DONATION_PRIORITY,
  FOOD_CATEGORIES,
  QUANTITY_UNITS,
  FOOD_FRESHNESS,
  enumValues,
} from "../constants/enums.js";
import { addressSchema, foodItemSchema, geoPointSchema } from "./shared/schemas.js";
import { nonNegative, positive } from "../utils/validators.js";

/**
 * Donation — surplus food offered by a donor for NGO distribution.
 * Central entity in the NourishBridge workflow.
 */
const donationSchema = new mongoose.Schema(
  {
    /** Human-readable reference e.g. DON-2045 */
    donationCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    /** Donor who created this donation */
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: [true, "Donor is required"],
    },

    /** Matched receiving NGO (null until accepted) */
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      default: null,
    },

    /** Assigned volunteer (null until dispatch) */
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      default: null,
    },

    /** Workflow state */
    status: {
      type: String,
      enum: enumValues(DONATION_STATUS),
      default: DONATION_STATUS.PENDING,
    },

    /** Urgency for matching priority */
    priority: {
      type: String,
      enum: enumValues(DONATION_PRIORITY),
      default: DONATION_PRIORITY.MEDIUM,
    },

    /** Primary food category for filtering */
    category: {
      type: String,
      enum: enumValues(FOOD_CATEGORIES),
      required: [true, "Food category is required"],
    },

    /** Summary description e.g. "Veg Biryani" */
    foodType: {
      type: String,
      required: [true, "Food type is required"],
      trim: true,
      maxlength: 200,
    },

    /** Total quantity across all items */
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      validate: positive,
    },

    quantityUnit: {
      type: String,
      enum: enumValues(QUANTITY_UNITS),
      default: QUANTITY_UNITS.KG,
    },

    /** Individual food line items (embedded — avoids separate collection joins) */
    items: {
      type: [foodItemSchema],
      default: [],
      validate: {
        validator(items) {
          return items.length <= 50;
        },
        message: "Cannot exceed 50 food items per donation",
      },
    },

    /** When food expires — must be monitored for safety */
    expiryTime: {
      type: Date,
      required: [true, "Expiry time is required"],
    },

    /** Pickup location details */
    pickupAddress: {
      type: addressSchema,
      required: [true, "Pickup address is required"],
    },

    pickupLocation: {
      type: geoPointSchema,
      default: null,
    },

    /** Delivery destination (usually NGO address) */
    deliveryAddress: {
      type: addressSchema,
      default: null,
    },

    deliveryLocation: {
      type: geoPointSchema,
      default: null,
    },

    /** Food safety / proof photos */
    images: {
      type: [String],
      default: [],
    },

    /** Special handling instructions */
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    /** Estimated number of meals this donation provides */
    estimatedMeals: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Food freshness indicator */
    freshness: {
      type: String,
      enum: enumValues(FOOD_FRESHNESS),
      default: FOOD_FRESHNESS.GOOD,
    },

    /** When food was prepared */
    preparationTime: {
      type: Date,
      default: null,
    },

    /** Pickup window end */
    pickupEndAt: {
      type: Date,
      default: null,
    },

    /** Diet classification for safety matching */
    dietType: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    /** Packaging description */
    packagingStatus: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    /** Allergen declaration */
    allergenInfo: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /** Scheduled pickup window start */
    pickupScheduledAt: {
      type: Date,
      default: null,
    },

    /** Actual pickup timestamp */
    pickedUpAt: {
      type: Date,
      default: null,
    },

    /** Delivery completion timestamp */
    deliveredAt: {
      type: Date,
      default: null,
    },

    /** Reason if rejected or cancelled */
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /** Link to active delivery record */
    deliveryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
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
donationSchema.index({ donorId: 1, status: 1, createdAt: -1 });
donationSchema.index({ ngoId: 1, status: 1 });
donationSchema.index({ volunteerId: 1, status: 1 });
donationSchema.index({ status: 1, priority: -1, expiryTime: 1 });
donationSchema.index({ category: 1, status: 1 });
donationSchema.index({ expiryTime: 1 });
donationSchema.index({ pickupLocation: "2dsphere" });
donationSchema.index({ createdAt: -1 });
donationSchema.index({ foodType: "text", notes: "text" });

/** Auto-generate donation code before save */
donationSchema.pre("save", async function generateCode(next) {
  if (this.donationCode) return next();
  const count = await mongoose.model("Donation").countDocuments();
  this.donationCode = `DON-${String(count + 1).padStart(4, "0")}`;
  next();
});

donationSchema.virtual("delivery", {
  ref: "Delivery",
  localField: "deliveryId",
  foreignField: "_id",
  justOne: true,
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
