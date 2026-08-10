import mongoose from "mongoose";
import { DELIVERY_STATUS, enumValues } from "../constants/enums.js";
import { geoPointSchema } from "./shared/schemas.js";
import { nonNegative } from "../utils/validators.js";

const deliveryEventSchema = new mongoose.Schema(
  {
    status: { type: String, enum: enumValues(DELIVERY_STATUS), required: true },
    timestamp: { type: Date, default: Date.now },
    location: { type: geoPointSchema, default: null },
    note: { type: String, trim: true, maxlength: 500 },
    quantity: { type: Number, default: null },
  },
  { _id: true },
);

const deliverySchema = new mongoose.Schema(
  {
    deliveryCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },

    donationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },

    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },

    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NGO",
      required: true,
    },

    status: {
      type: String,
      enum: enumValues(DELIVERY_STATUS),
      default: DELIVERY_STATUS.PENDING,
    },

    pickupLocation: { type: geoPointSchema, default: null },
    deliveryLocation: { type: geoPointSchema, default: null },
    currentLocation: { type: geoPointSchema, default: null },

    pickupScheduledAt: { type: Date, default: null },
    arrivedAtPickupAt: { type: Date, default: null },
    pickupVerifiedAt: { type: Date, default: null },
    pickedUpAt: { type: Date, default: null },
    deliveryStartedAt: { type: Date, default: null },
    arrivedAtNgoAt: { type: Date, default: null },
    deliveryVerifiedAt: { type: Date, default: null },
    deliveredAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
    assignedAt: { type: Date, default: null },

    expectedQuantity: { type: Number, default: null },
    pickupQuantity: { type: Number, default: null },
    deliveryQuantity: { type: Number, default: null },
    quantityUnit: { type: String, trim: true, default: "kg" },

    pickupProofImages: { type: [String], default: [] },
    deliveryProofImages: { type: [String], default: [] },
    /** @deprecated use deliveryProofImages */
    proofImages: { type: [String], default: [] },

    pickupVerificationCode: { type: String, trim: true },
    deliveryVerificationCode: { type: String, trim: true },
    pickupQrVerifiedAt: { type: Date, default: null },
    deliveryQrVerifiedAt: { type: Date, default: null },

    eta: { type: Date, default: null },
    distanceKm: { type: Number, default: 0, validate: nonNegative },

    timeline: { type: [deliveryEventSchema], default: [] },

    failureReason: { type: String, trim: true, maxlength: 500 },
    notes: { type: String, trim: true, maxlength: 1000 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

deliverySchema.index({ donationId: 1 }, { unique: true });
deliverySchema.index({ volunteerId: 1, status: 1 });
deliverySchema.index({ ngoId: 1, status: 1, createdAt: -1 });
deliverySchema.index({ status: 1, eta: 1 });
deliverySchema.index({ currentLocation: "2dsphere" });

deliverySchema.pre("save", async function generateCode(next) {
  if (this.deliveryCode) return next();
  const count = await mongoose.model("Delivery").countDocuments();
  this.deliveryCode = `DEL-${String(count + 1).padStart(4, "0")}`;
  next();
});

deliverySchema.methods.addTimelineEvent = function addTimelineEvent(
  status,
  note = null,
  location = null,
  quantity = null,
) {
  this.timeline.push({ status, note, location, quantity, timestamp: new Date() });
  this.status = status;
};

const Delivery = mongoose.model("Delivery", deliverySchema);
export default Delivery;
