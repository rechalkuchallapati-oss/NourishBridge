import mongoose from "mongoose";
import {
  FOOD_CATEGORIES,
  INVENTORY_STATUS,
  STORAGE_TYPES,
  QUANTITY_UNITS,
  enumValues,
} from "../constants/enums.js";
import { nonNegative, positive } from "../utils/validators.js";

/**
 * Inventory — NGO warehouse batch tracking (stock levels, expiry, utilization).
 */
const inventorySchema = new mongoose.Schema(
  {
    /** Human-readable batch reference e.g. INV-2043 */
    batchCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    /** Owning NGO */
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: [true, "NGO is required"],
    },

    /** Source donation if received via platform */
    sourceDonationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      default: null,
    },

    /** Item name e.g. "Veg Biryani" */
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
      maxlength: 200,
    },

    /** Food category for filtering and reports */
    category: {
      type: String,
      enum: enumValues(FOOD_CATEGORIES),
      required: [true, "Category is required"],
    },

    /** Current quantity in stock */
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      validate: positive,
    },

    /** Original quantity when batch was received */
    initialQuantity: {
      type: Number,
      required: [true, "Initial quantity is required"],
      validate: positive,
    },

    quantityUnit: {
      type: String,
      enum: enumValues(QUANTITY_UNITS),
      default: QUANTITY_UNITS.KG,
    },

    /** Storage requirement */
    storageType: {
      type: String,
      enum: enumValues(STORAGE_TYPES),
      default: STORAGE_TYPES.AMBIENT,
    },

    /** Batch expiry — critical for food safety alerts */
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },

    /** Stock lifecycle state */
    status: {
      type: String,
      enum: enumValues(INVENTORY_STATUS),
      default: INVENTORY_STATUS.AVAILABLE,
    },

    /** Minimum threshold for low-stock alerts */
    lowStockThreshold: {
      type: Number,
      default: 10,
      validate: nonNegative,
    },

    /** Supplier / donor name for traceability */
    receivedFrom: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    /** Date batch entered inventory */
    receivedAt: {
      type: Date,
      default: Date.now,
    },

    /** Date batch was fully distributed */
    distributedAt: {
      type: Date,
      default: null,
    },

    /** Estimated meals remaining in this batch */
    estimatedMeals: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    /** User who logged this batch */
    loggedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
inventorySchema.index({ ngoId: 1, status: 1, expiryDate: 1 });
inventorySchema.index({ status: 1, expiryDate: 1 });
inventorySchema.index({ category: 1, ngoId: 1 });
inventorySchema.index({ sourceDonationId: 1 });
inventorySchema.index({ expiryDate: 1 });
inventorySchema.index({ itemName: "text" });

inventorySchema.pre("save", async function generateCode(next) {
  if (this.batchCode) return next();
  const count = await mongoose.model("Inventory").countDocuments();
  this.batchCode = `INV-${String(count + 1).padStart(4, "0")}`;
  next();
});

/** Auto-set status based on expiry proximity */
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
  }
  next();
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
