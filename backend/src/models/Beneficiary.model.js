import mongoose from "mongoose";
import { nonNegative } from "../utils/validators.js";

/**
 * Beneficiary — people or groups served by an NGO.
 */
const beneficiarySchema = new mongoose.Schema(
  {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    category: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "general",
    },

    contactPhone: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    householdSize: {
      type: Number,
      default: 1,
      validate: nonNegative,
    },

    mealsServed: {
      type: Number,
      default: 0,
      validate: nonNegative,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true },
);

beneficiarySchema.index({ ngoId: 1, isActive: 1, name: 1 });

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);

export default Beneficiary;
