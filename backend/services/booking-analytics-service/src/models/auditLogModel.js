import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    userId: Number,
    action: { type: String, required: true },
    entity: { type: String, required: true },
    entityId: String,
    details: Object,
    ipAddress: String,
  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
