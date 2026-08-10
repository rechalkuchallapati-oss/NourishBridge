import AuditLog from "../models/AuditLog.model.js";
import { AUDIT_ACTIONS, AUDIT_MODULES, AUDIT_SEVERITY } from "../constants/enums.js";

export async function logAudit({
  actorId = null,
  actorRole = "system",
  actorName = "System",
  action = AUDIT_ACTIONS.UPDATE,
  module,
  entity = null,
  description = "",
  details = {},
  ipAddress = null,
  userAgent = null,
  severity = AUDIT_SEVERITY.INFO,
  success = true,
  errorMessage = null,
  requestId = null,
}) {
  return AuditLog.create({
    actorId,
    actorRole,
    actorName,
    action,
    module,
    entity,
    description,
    details,
    ipAddress,
    userAgent,
    severity,
    success,
    errorMessage,
    requestId,
  });
}

export function auditFromRequest(req) {
  return {
    ipAddress: req.ip || req.headers["x-forwarded-for"] || null,
    userAgent: req.headers["user-agent"] || null,
    requestId: req.headers["x-request-id"] || null,
  };
}

export default { logAudit, auditFromRequest };
