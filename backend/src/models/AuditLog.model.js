import mongoose from "mongoose";
import {
  AUDIT_ACTIONS,
  AUDIT_MODULES,
  AUDIT_SEVERITY,
  enumValues,
} from "../constants/enums.js";
import { entityRefSchema } from "./shared/schemas.js";

/**
 * AuditLog — immutable record of sensitive platform actions for compliance and security.
 * Never update or delete audit records in production.
 */
const auditLogSchema = new mongoose.Schema(
  {
    /** User who performed the action (null for system-initiated events) */
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    /** Role at time of action — preserved even if user role changes later */
    actorRole: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    /** Actor display name snapshot */
    actorName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    /** What was done */
    action: {
      type: String,
      enum: enumValues(AUDIT_ACTIONS),
      required: [true, "Action is required"],
    },

    /** Which module/domain was affected */
    module: {
      type: String,
      enum: enumValues(AUDIT_MODULES),
      required: [true, "Module is required"],
    },

    /** Target entity reference */
    entity: {
      type: entityRefSchema,
      default: null,
    },

    /** Human-readable description */
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    /** Before/after diff or additional context */
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    /** Client IP for security investigations */
    ipAddress: {
      type: String,
      trim: true,
      maxlength: 45,
    },

    /** Browser/client identifier */
    userAgent: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /** Event severity for alerting rules */
    severity: {
      type: String,
      enum: enumValues(AUDIT_SEVERITY),
      default: AUDIT_SEVERITY.INFO,
    },

    /** Whether action succeeded or failed */
    success: {
      type: Boolean,
      default: true,
    },

    /** Error message if action failed */
    errorMessage: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    /** Request correlation ID for distributed tracing */
    requestId: {
      type: String,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes ───
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ actorId: 1, createdAt: -1 });
auditLogSchema.index({ module: 1, action: 1, createdAt: -1 });
auditLogSchema.index({ severity: 1, createdAt: -1 });
auditLogSchema.index({ "entity.entityType": 1, "entity.entityId": 1 });
auditLogSchema.index({ ipAddress: 1 });
auditLogSchema.index({ requestId: 1 });

/** Prevent updates — audit logs must be append-only */
auditLogSchema.pre("findOneAndUpdate", function blockUpdate() {
  throw new Error("Audit logs are immutable and cannot be updated");
});

auditLogSchema.pre("updateOne", function blockUpdate() {
  throw new Error("Audit logs are immutable and cannot be updated");
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
