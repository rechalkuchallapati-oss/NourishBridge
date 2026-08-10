import { Schema } from "mongoose";

/**
 * GeoJSON Point — used for pickup/delivery locations and volunteer tracking.
 * Enables MongoDB 2dsphere geospatial queries (nearby donations, radius search).
 */
export const geoPointSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude] — GeoJSON standard order
      required: true,
      validate: {
        validator(coords) {
          return (
            Array.isArray(coords) &&
            coords.length === 2 &&
            coords[0] >= -180 &&
            coords[0] <= 180 &&
            coords[1] >= -90 &&
            coords[1] <= 90
          );
        },
        message: "Coordinates must be [longitude, latitude] within valid ranges",
      },
    },
  },
  { _id: false },
);

/**
 * Structured postal address — reused across User, NGO, Donation pickup.
 */
export const addressSchema = new Schema(
  {
    line1: { type: String, required: true, trim: true, maxlength: 200 },
    line2: { type: String, trim: true, maxlength: 200 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    state: { type: String, trim: true, maxlength: 100 },
    pincode: { type: String, trim: true, maxlength: 10 },
    country: { type: String, trim: true, default: "India", maxlength: 100 },
  },
  { _id: false },
);

/**
 * Embedded food line item inside a Donation document.
 */
export const foodItemSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    category: { type: String, trim: true, maxlength: 50 },
    quantity: { type: Number, required: true, min: [0.01, "Quantity must be positive"] },
    unit: { type: String, trim: true, maxlength: 20 },
    notes: { type: String, trim: true, maxlength: 500 },
    isVegetarian: { type: Boolean, default: true },
    allergens: [{ type: String, trim: true }],
  },
  { _id: true, timestamps: false },
);

/**
 * Polymorphic reference to any related entity (notifications, audit context).
 */
export const entityRefSchema = new Schema(
  {
    entityType: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { _id: false },
);

/**
 * Uploaded verification document metadata.
 */
export const verificationDocumentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    url: { type: String, required: true, trim: true },
    mimeType: { type: String, trim: true, maxlength: 100 },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

/**
 * Donor pickup location — supports free-text or structured address.
 */
export const pickupLocationSchema = new Schema(
  {
    label: { type: String, trim: true, maxlength: 100, default: "Pickup" },
    addressLine: { type: String, required: true, trim: true, maxlength: 300 },
    address: { type: addressSchema, default: null },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true },
);
