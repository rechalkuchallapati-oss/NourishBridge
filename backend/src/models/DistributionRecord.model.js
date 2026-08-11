import mongoose from "mongoose";
import { nonNegative } from "../utils/validators.js";

const distributionRecordSchema = new mongoose.Schema(
  {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
      index: true,
    },
    inventoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
      index: true,
    },
    beneficiaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      default: null,
    },
    beneficiaryGroup: { type: String, trim: true, maxlength: 200 },
    foodItem: { type: String, trim: true, maxlength: 200 },
    category: { type: String, trim: true, maxlength: 100 },
    quantity: { type: Number, required: true, validate: nonNegative },
    quantityUnit: { type: String, trim: true, maxlength: 30, default: "meals" },
    mealsServed: { type: Number, default: 0, validate: nonNegative },
    peopleServed: { type: Number, default: 0, validate: nonNegative },
    sourceDonationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      default: null,
    },
    batchCode: { type: String, trim: true, maxlength: 50 },
    distributedAt: { type: Date, default: Date.now },
    location: { type: String, trim: true, maxlength: 300 },
    notes: { type: String, trim: true, maxlength: 1000 },
    loggedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

distributionRecordSchema.index({ ngoId: 1, distributedAt: -1 });

const DistributionRecord = mongoose.model("DistributionRecord", distributionRecordSchema);

export default DistributionRecord;
