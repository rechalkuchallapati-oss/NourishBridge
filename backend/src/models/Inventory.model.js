import mongoose from "mongoose";
import {
  FOOD_CATEGORIES,
  INVENTORY_STATUS,
  STORAGE_TYPES,
  QUANTITY_UNITS,
  enumValues,
} from "../constants/enums.js";
import { nonNegative, positive } from "../utils/validators.js";

const inventorySchema = new mongoose.Schema(
  {
    batchCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
      index: true,
    },

    sourceDonationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      default: null,
    },

    sourceDeliveryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Delivery",
      default: null,
    },

    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      default: null,
    },

    itemName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    category: {
      type: String,
      enum: enumValues(FOOD_CATEGORIES),
      required: true,
    },

    /** Available quantity remaining in stock */
    quantity: {
      type: Number,
      required: true,
      validate: nonNegative,
    },

    initialQuantity: {
      type: Number,
      required: true,
      validate: positive,
    },

    /** Cumulative quantity distributed from this batch */
    distributedQuantity: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    quantityUnit: {
      type: String,
      enum: enumValues(QUANTITY_UNITS),
      default: QUANTITY_UNITS.KG,
    },

    storageType: {
      type: String,
      enum: enumValues(STORAGE_TYPES),
      default: STORAGE_TYPES.AMBIENT,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: enumValues(INVENTORY_STATUS),
      default: INVENTORY_STATUS.AVAILABLE,
    },

    lowStockThreshold: {
      type: Number,
      default: 10,
      validate: nonNegative,
    },

    receivedFrom: { type: String, trim: true, maxlength: 150 },
    receivedAt: { type: Date, default: Date.now },
    distributedAt: { type: Date, default: null },
    estimatedMeals: { type: Number, default: 0, validate: nonNegative },

    pickupProofImages: { type: [String], default: [] },
    deliveryProofImages: { type: [String], default: [] },

    notes: { type: String, trim: true, maxlength: 1000 },
    loggedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

inventorySchema.virtual("availableQuantity").get(function availableQuantity() {
  return this.quantity;
});

inventorySchema.index({ ngoId: 1, status: 1, expiryDate: 1 });
inventorySchema.index({ status: 1, expiryDate: 1 });
inventorySchema.index({ sourceDeliveryId: 1 });

inventorySchema.pre("save", async function generateCode(next) {
  if (this.batchCode) return next();
  const count = await mongoose.model("Inventory").countDocuments();
  this.batchCode = `INV-${String(count + 1).padStart(4, "0")}`;
  next();
});

inventorySchema.pre("save", function updateExpiryStatus(next) {
  if (!this.expiryDate || this.status === INVENTORY_STATUS.DISTRIBUTED) {
    return next();
  }
  const now = Date.now();
  const expiry = this.expiryDate.getTime();
  if (expiry < now) {
    this.status = INVENTORY_STATUS.EXPIRED;
  } else if (expiry - now < 24 * 60 * 60 * 1000) {
    this.status = INVENTORY_STATUS.EXPIRING;
  } else if (this.quantity <= this.lowStockThreshold) {
    this.status = INVENTORY_STATUS.LOW_STOCK;
  } else if (this.quantity > 0) {
    this.status = INVENTORY_STATUS.AVAILABLE;
  }
  next();
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
