import mongoose from "mongoose";
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  enumValues,
} from "../constants/enums.js";
import { entityRefSchema } from "./shared/schemas.js";

/**
 * Notification — in-app and push alerts for users across all roles.
 */
const notificationSchema = new mongoose.Schema(
  {
    /** Recipient user */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    /** Category for filtering and icon display */
    type: {
      type: String,
      enum: enumValues(NOTIFICATION_TYPES),
      required: [true, "Notification type is required"],
    },

    /** Short headline */
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },

    /** Full message body */
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 2000,
    },

    /** Urgency level */
    priority: {
      type: String,
      enum: enumValues(NOTIFICATION_PRIORITY),
      default: NOTIFICATION_PRIORITY.MEDIUM,
    },

    /** Read/unread state */
    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },

    /** Polymorphic link to related donation, delivery, etc. */
    relatedEntity: {
      type: entityRefSchema,
      default: null,
    },

    /** Deep link path for frontend navigation e.g. /dashboard/donations/123 */
    actionUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /** Optional metadata for rich notifications */
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    /** Soft expiry — old notifications can be archived */
    expiresAt: {
      type: Date,
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
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, type: 1 });
notificationSchema.index({ priority: 1, createdAt: -1 });
notificationSchema.index({ "relatedEntity.entityType": 1, "relatedEntity.entityId": 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { expiresAt: { $type: "date" } } });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
