import mongoose from "mongoose";

const usageAnalyticsSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true },
    resourceId: Number,
    userId: Number,
    bookingId: Number,
    status: String,
    startTime: Date,
    endTime: Date,
    metadata: Object,
  },
  { timestamps: true }
);

const UsageAnalytics = mongoose.model("UsageAnalytics", usageAnalyticsSchema);

export default UsageAnalytics;
