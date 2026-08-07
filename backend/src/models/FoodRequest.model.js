import mongoose from "mongoose";
import {
  FOOD_CATEGORIES,
  FOOD_REQUEST_STATUS,
  DONATION_PRIORITY,
  QUANTITY_UNITS,
  enumValues,
} from "../constants/enums.js";
import { nonNegative, positive } from "../utils/validators.js";

/**
 * FoodRequest — NGO-initiated request for specific food needs from donors.
 */
const foodRequestSchema = new mongoose.Schema(
  {
    /** Human-readable reference e.g. REQ-2048 */
    requestCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    /** NGO that created the request */
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: [true, "NGO is required"],
    },

    /** User who submitted (NGO admin) */
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Requester is required"],
    },

    /** Short title for dashboard display */
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },

    /** Detailed requirements for donors/volunteers */
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    /** Type of food needed */
    foodCategory: {
      type: String,
      enum: enumValues(FOOD_CATEGORIES),
      required: [true, "Food category is required"],
    },

    /** Amount needed */
    quantityNeeded: {
      type: Number,
      required: [true, "Quantity needed is required"],
      validate: positive,
    },

    quantityUnit: {
      type: String,
      enum: enumValues(QUANTITY_UNITS),
      default: QUANTITY_UNITS.MEALS,
    },

    /** How much has been fulfilled so far */
    quantityFulfilled: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Urgency for donor matching */
    priority: {
      type: String,
      enum: enumValues(DONATION_PRIORITY),
      default: DONATION_PRIORITY.MEDIUM,
    },

    /** Request lifecycle state */
    status: {
      type: String,
      enum: enumValues(FOOD_REQUEST_STATUS),
      default: FOOD_REQUEST_STATUS.OPEN,
    },

    /** Deadline by which food is needed */
    neededBy: {
      type: Date,
      required: [true, "Needed-by date is required"],
    },

    /** Target delivery date */
    deliveryDate: {
      type: Date,
      default: null,
    },

    /** Number of beneficiaries this request serves */
    beneficiaryCount: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    /** Dietary constraints e.g. vegetarian only */
    dietaryRequirements: {
      type: [String],
      default: [],
    },

    /** Donations matched to this request */
    matchedDonationIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donation",
      },
    ],

    /** Special instructions for donors */
    specialInstructions: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    fulfilledAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    cancellationReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ───
foodRequestSchema.index({ ngoId: 1, status: 1, createdAt: -1 });
foodRequestSchema.index({ status: 1, priority: -1, neededBy: 1 });
foodRequestSchema.index({ foodCategory: 1, status: 1 });
foodRequestSchema.index({ neededBy: 1 });
foodRequestSchema.index({ requestedBy: 1 });
foodRequestSchema.index({ title: "text", description: "text" });

foodRequestSchema.pre("save", async function generateCode(next) {
  if (this.requestCode) return next();
  const count = await mongoose.model("FoodRequest").countDocuments();
  this.requestCode = `REQ-${String(count + 1).padStart(4, "0")}`;
  next();
});

const FoodRequest = mongoose.model("FoodRequest", foodRequestSchema);

export default FoodRequest;
