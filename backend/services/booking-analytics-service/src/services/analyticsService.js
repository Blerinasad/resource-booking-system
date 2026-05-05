import { QueryTypes } from "sequelize";
import Booking from "../models/bookingModel.js";
import UsageAnalytics from "../models/usageAnalyticsModel.js";
import sequelize from "../config/mysql.js";

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
  return await sequelize.query(
    `
    SELECT
      b.resource_id AS resourceId,
      COALESCE(r.name, CONCAT('Resource #', b.resource_id)) AS resourceName,
      COUNT(b.id) AS bookingCount
    FROM smart_booking_bookings.bookings b
    LEFT JOIN smart_booking_resources.resources r
      ON r.id = b.resource_id
    GROUP BY b.resource_id, r.name
    ORDER BY bookingCount DESC
    LIMIT 5
    `,
    { type: QueryTypes.SELECT }
  );
};

export const getTopUsers = async () => {
  return await sequelize.query(
    `
    SELECT
      b.user_id AS userId,
      COALESCE(u.name, CONCAT('User #', b.user_id)) AS userName,
      COUNT(b.id) AS bookingCount
    FROM smart_booking_bookings.bookings b
    LEFT JOIN smart_booking_auth.users u
      ON u.id = b.user_id
    GROUP BY b.user_id, u.name
    ORDER BY bookingCount DESC
    LIMIT 5
    `,
    { type: QueryTypes.SELECT }
  );
};

export const getBookingsByDay = async () => {
  return await sequelize.query(
    `
    SELECT
      DATE_FORMAT(createdAt, '%a') AS day,
      COUNT(id) AS count
    FROM smart_booking_bookings.bookings
    WHERE createdAt >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY DATE(createdAt), DATE_FORMAT(createdAt, '%a')
    ORDER BY DATE(createdAt) ASC
    `,
    { type: QueryTypes.SELECT }
  );
};

export const getPeakHours = async () => {
  return await sequelize.query(
    `
    SELECT
      DATE_FORMAT(start_time, '%H:00') AS hour,
      COUNT(id) AS count
    FROM smart_booking_bookings.bookings
    GROUP BY HOUR(start_time), DATE_FORMAT(start_time, '%H:00')
    ORDER BY HOUR(start_time) ASC
    `,
    { type: QueryTypes.SELECT }
  );
};