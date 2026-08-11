import SupportTicket, { TICKET_STATUS, TICKET_PRIORITY, TICKET_CATEGORY } from "../../models/SupportTicket.model.js";
import SupportTicketMessage from "../../models/SupportTicketMessage.model.js";
import ApiError from "../../utils/ApiError.js";
import { logAudit, auditFromRequest } from "../../services/audit.service.js";
import { AUDIT_ACTIONS, AUDIT_MODULES } from "../../constants/enums.js";
import { emitToAdmins, REALTIME_EVENTS } from "../../services/socket.service.js";

function mapTicket(t) {
  return {
    id: t._id,
    ticketCode: t.ticketCode,
    subject: t.subject,
    description: t.description,
    status: t.status,
    priority: t.priority,
    category: t.category,
    submittedBy: t.submittedBy,
    submitterRole: t.submitterRole,
    assignedTo: t.assignedTo,
    resolution: t.resolution,
    resolvedAt: t.resolvedAt,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
}

function mapMessage(m) {
  return {
    id: m._id,
    ticketId: m.ticketId,
    authorId: m.authorId,
    authorRole: m.authorRole,
    authorName: m.authorName,
    message: m.message,
    isInternal: m.isInternal,
    createdAt: m.createdAt,
  };
}

export async function createTicket(userId, role, fullName, payload, req) {
  const ticket = await SupportTicket.create({
    subject: payload.subject,
    description: payload.description,
    priority: payload.priority || TICKET_PRIORITY.MEDIUM,
    category: payload.category || TICKET_CATEGORY.OTHER,
    submittedBy: userId,
    submitterRole: role,
  });

  await SupportTicketMessage.create({
    ticketId: ticket._id,
    authorId: userId,
    authorRole: role,
    authorName: fullName,
    message: payload.description,
  });

  await logAudit({
    actorId: userId,
    actorRole: role,
    actorName: fullName,
    action: AUDIT_ACTIONS.CREATE,
    module: AUDIT_MODULES.SUPPORT,
    entity: { entityType: "SupportTicket", entityId: ticket._id },
    description: `Support ticket ${ticket.ticketCode} created`,
    ...auditFromRequest(req),
  });

  emitToAdmins(REALTIME_EVENTS.ADMIN_UPDATE, {
    type: "support_ticket_created",
    ticketId: ticket._id,
    ticketCode: ticket.ticketCode,
  });

  return mapTicket(ticket.toObject());
}

export async function listMyTickets(userId, { page = 1, limit = 20 } = {}) {
  const skip = (page - 1) * limit;
  const filter = { submittedBy: userId };
  const [items, total] = await Promise.all([
    SupportTicket.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    SupportTicket.countDocuments(filter),
  ]);
  return {
    tickets: items.map(mapTicket),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function getTicket(userId, role, ticketId) {
  const ticket = await SupportTicket.findById(ticketId).lean();
  if (!ticket) throw ApiError.notFound("Ticket not found");
  if (role !== "admin" && String(ticket.submittedBy) !== String(userId)) {
    throw ApiError.forbidden("Access denied");
  }
  return mapTicket(ticket);
}

export async function getTicketHistory(userId, role, ticketId) {
  await getTicket(userId, role, ticketId);
  const messages = await SupportTicketMessage.find({ ticketId })
    .sort({ createdAt: 1 })
    .lean();
  return messages
    .filter((m) => role === "admin" || !m.isInternal)
    .map(mapMessage);
}

export async function addTicketReply(userId, role, fullName, ticketId, message, req) {
  const ticket = await SupportTicket.findById(ticketId);
  if (!ticket) throw ApiError.notFound("Ticket not found");
  if (role !== "admin" && String(ticket.submittedBy) !== String(userId)) {
    throw ApiError.forbidden("Access denied");
  }
  if ([TICKET_STATUS.CLOSED, TICKET_STATUS.RESOLVED].includes(ticket.status) && role !== "admin") {
    throw ApiError.badRequest("Ticket is closed");
  }

  const entry = await SupportTicketMessage.create({
    ticketId: ticket._id,
    authorId: userId,
    authorRole: role,
    authorName: fullName,
    message,
    isInternal: false,
  });

  if (role !== "admin" && ticket.status === TICKET_STATUS.RESOLVED) {
    ticket.status = TICKET_STATUS.OPEN;
  } else if (role === "admin" && ticket.status === TICKET_STATUS.OPEN) {
    ticket.status = TICKET_STATUS.IN_PROGRESS;
  }

  await ticket.save();
  return mapMessage(entry.toObject());
}

export async function closeTicket(userId, role, fullName, ticketId, resolution, req) {
  const ticket = await SupportTicket.findById(ticketId);
  if (!ticket) throw ApiError.notFound("Ticket not found");
  if (role !== "admin" && String(ticket.submittedBy) !== String(userId)) {
    throw ApiError.forbidden("Access denied");
  }

  ticket.status = TICKET_STATUS.CLOSED;
  ticket.resolution = resolution || ticket.resolution;
  ticket.resolvedAt = new Date();
  await ticket.save();

  await logAudit({
    actorId: userId,
    actorRole: role,
    actorName: fullName,
    action: AUDIT_ACTIONS.UPDATE,
    module: AUDIT_MODULES.SUPPORT,
    entity: { entityType: "SupportTicket", entityId: ticket._id },
    description: `Ticket ${ticket.ticketCode} closed`,
    ...auditFromRequest(req),
  });

  return mapTicket(ticket.toObject());
}

export default {
  createTicket,
  listMyTickets,
  getTicket,
  getTicketHistory,
  addTicketReply,
  closeTicket,
};
