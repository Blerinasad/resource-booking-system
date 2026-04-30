import AuditLog from "../models/auditLogModel.js";

export const createAuditLog = async ({ userId, action, entity, entityId, details, ipAddress }) => {
  return await AuditLog.create({
    userId,
    action,
    entity,
    entityId: entityId ? String(entityId) : null,
    details,
    ipAddress,
  });
};
