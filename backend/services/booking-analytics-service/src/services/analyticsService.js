import { fn, col, literal } from "sequelize";
import Booking from "../models/bookingModel.js";
import UsageAnalytics from "../models/usageAnalyticsModel.js";

export const trackBookingEvent = async (eventType, booking, metadata = {}) => {
  return await UsageAnalytics.create({
    eventType,
    resourceId: booking.resourceId,
    userId: booking.userId,
    bookingId: booking.id,
    status: booking.status,
    startTime: booking.startTime,
    endTime: booking.endTime,
    metadata,
  });
};

export const getAnalyticsSummary = async () => {
  const totalBookings = await Booking.count();
  const pendingBookings = await Booking.count({ where: { status: "pending" } });
  const approvedBookings = await Booking.count({ where: { status: "approved" } });
  const cancelledBookings = await Booking.count({ where: { status: "cancelled" } });
  const completedBookings = await Booking.count({ where: { status: "completed" } });
  const noShowBookings = await Booking.count({ where: { status: "no-show" } });

  return {
    totalBookings,
    pendingBookings,
    approvedBookings,
    cancelledBookings,
    completedBookings,
    noShowBookings,
  };
};

export const getMostUsedResources = async () => {
  return await Booking.findAll({
    attributes: [
      "resourceId",
      [fn("COUNT", col("id")), "totalBookings"],
    ],
    group: ["resourceId"],
    order: [[literal("totalBookings"), "DESC"]],
    limit: 10,
  });
};

export const getTopUsers = async () => {
  return await Booking.findAll({
    attributes: [
      "userId",
      [fn("COUNT", col("id")), "totalBookings"],
    ],
    group: ["userId"],
    order: [[literal("totalBookings"), "DESC"]],
    limit: 10,
  });
};

export const getBookingsByDay = async () => {
  return await Booking.findAll({
    attributes: [
      [fn("DATE", col("createdAt")), "day"],
      [fn("COUNT", col("id")), "totalBookings"],
    ],
    group: [fn("DATE", col("createdAt"))],
    order: [[fn("DATE", col("createdAt")), "ASC"]],
  });
};

export const getPeakHours = async () => {
  return await Booking.findAll({
    attributes: [
      [fn("HOUR", col("start_time")), "hour"],
      [fn("COUNT", col("id")), "totalBookings"],
    ],
    group: [fn("HOUR", col("start_time"))],
    order: [[literal("totalBookings"), "DESC"]],
  });
};
