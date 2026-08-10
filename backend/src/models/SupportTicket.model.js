import mongoose from "mongoose";
import { enumValues } from "../constants/enums.js";

export const TICKET_STATUS = Object.freeze({
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
});

export const TICKET_PRIORITY = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
});

export const TICKET_CATEGORY = Object.freeze({
  ACCOUNT: "account",
  DONATION: "donation",
  DELIVERY: "delivery",
  TECHNICAL: "technical",
  OTHER: "other",
});

const supportTicketSchema = new mongoose.Schema(
  {
    ticketCode: {
      type: String,
      unique: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    status: {
      type: String,
      enum: enumValues(TICKET_STATUS),
      default: TICKET_STATUS.OPEN,
    },
    priority: {
      type: String,
      enum: enumValues(TICKET_PRIORITY),
      default: TICKET_PRIORITY.MEDIUM,
    },
    category: {
      type: String,
      enum: enumValues(TICKET_CATEGORY),
      default: TICKET_CATEGORY.OTHER,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    submitterRole: {
      type: String,
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    resolution: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

supportTicketSchema.index({ status: 1, priority: 1, createdAt: -1 });
supportTicketSchema.index({ submittedBy: 1, createdAt: -1 });

supportTicketSchema.pre("save", async function generateCode(next) {
  if (this.ticketCode) return next();
  const count = await mongoose.model("SupportTicket").countDocuments();
  this.ticketCode = `TKT-${String(count + 1).padStart(5, "0")}`;
  next();
});

const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

export default SupportTicket;
