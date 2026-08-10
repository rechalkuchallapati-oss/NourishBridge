import mongoose from "mongoose";
import { FOOD_REQUEST_STATUS, USER_ROLES, enumValues } from "../constants/enums.js";

const foodRequestStatusHistorySchema = new mongoose.Schema(
  {
    foodRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodRequest",
      required: true,
      index: true,
    },

    fromStatus: {
      type: String,
      enum: [...enumValues(FOOD_REQUEST_STATUS), null],
      default: null,
    },

    toStatus: {
      type: String,
      enum: enumValues(FOOD_REQUEST_STATUS),
      required: true,
    },

    action: { type: String, required: true, trim: true, maxlength: 80 },

    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    actorRole: {
      type: String,
      enum: enumValues(USER_ROLES),
      required: true,
    },

    actorName: { type: String, trim: true, maxlength: 100 },
    reason: { type: String, trim: true, maxlength: 500 },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    ipAddress: { type: String, trim: true, maxlength: 45 },
    userAgent: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

foodRequestStatusHistorySchema.index({ foodRequestId: 1, createdAt: -1 });

const FoodRequestStatusHistory = mongoose.model(
  "FoodRequestStatusHistory",
  foodRequestStatusHistorySchema,
);

export default FoodRequestStatusHistory;
