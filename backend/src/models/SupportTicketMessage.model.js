import mongoose from "mongoose";
import { enumValues } from "../constants/enums.js";
import { TICKET_STATUS } from "./SupportTicket.model.js";

const supportTicketMessageSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupportTicket",
      required: true,
      index: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorRole: { type: String, trim: true, maxlength: 50 },
    authorName: { type: String, trim: true, maxlength: 100 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    isInternal: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

supportTicketMessageSchema.index({ ticketId: 1, createdAt: 1 });

const SupportTicketMessage = mongoose.model("SupportTicketMessage", supportTicketMessageSchema);

export { TICKET_STATUS };
export default SupportTicketMessage;
