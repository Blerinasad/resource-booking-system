import { Op } from "sequelize";
import Booking from "../models/bookingModel.js";
import ApiError from "../utils/ApiError.js";
import { findBookingConflict } from "./conflictService.js";
import { createAuditLog } from "./auditService.js";
import { trackBookingEvent } from "./analyticsService.js";
import { publishBookingEvent } from "../events/bookingProducer.js";

export const createBooking = async (data, user, ipAddress) => {
  const conflict = await findBookingConflict({
    resourceId: data.resourceId,
    startTime: data.startTime,
    endTime: data.endTime,
  });

  if (conflict) {
    throw new ApiError(409, "Resource is already booked for this time range.");
  }

  const booking = await Booking.create({
    userId: user.id,
    resourceId: data.resourceId,
    startTime: data.startTime,
    endTime: data.endTime,
    purpose: data.purpose || null,
    status: "pending",
  });

  await publishBookingEvent("booking.created", booking);
  await trackBookingEvent("booking.created", booking);
  await createAuditLog({
    userId: user.id,
    action: "BOOKING_CREATED",
    entity: "booking",
    entityId: booking.id,
    details: { resourceId: booking.resourceId, startTime: booking.startTime, endTime: booking.endTime },
    ipAddress,
  });

  return booking;
};

export const getBookings = async (query, user) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = (page - 1) * limit;

  const where = {};

  if (user.role !== "admin") {
    where.userId = user.id;
  }

  if (query.status) where.status = query.status;
  if (query.resourceId) where.resourceId = Number(query.resourceId);
  if (query.userId && user.role === "admin") where.userId = Number(query.userId);

  if (query.from || query.to) {
    where.startTime = {};
    if (query.from) where.startTime[Op.gte] = new Date(query.from);
    if (query.to) where.startTime[Op.lte] = new Date(query.to);
  }

  const { rows, count } = await Booking.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  return {
    bookings: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
};

export const getBookingById = async (id, user) => {
  const booking = await Booking.findByPk(id);

  if (!booking) {
    throw new ApiError(404, "Booking not found.");
  }

  if (user.role !== "admin" && booking.userId !== user.id) {
    throw new ApiError(403, "You do not have permission to view this booking.");
  }

  return booking;
};

export const cancelBooking = async (id, user, ipAddress) => {
  const booking = await getBookingById(id, user);

  if (!["pending", "approved"].includes(booking.status)) {
    throw new ApiError(400, "Only pending or approved bookings can be cancelled.");
  }

  await booking.update({ status: "cancelled" });

  await publishBookingEvent("booking.cancelled", booking);
  await trackBookingEvent("booking.cancelled", booking);
  await createAuditLog({
    userId: user.id,
    action: "BOOKING_CANCELLED",
    entity: "booking",
    entityId: booking.id,
    details: { status: booking.status },
    ipAddress,
  });

  return booking;
};

export const approveBooking = async (id, admin, decisionNote, ipAddress) => {
  const booking = await getBookingById(id, admin);

  if (booking.status !== "pending") {
    throw new ApiError(400, "Only pending bookings can be approved.");
  }

  const conflict = await findBookingConflict({
    resourceId: booking.resourceId,
    startTime: booking.startTime,
    endTime: booking.endTime,
    excludeBookingId: booking.id,
  });

  if (conflict) {
    throw new ApiError(409, "Cannot approve. Another booking conflicts with this time range.");
  }

  await booking.update({ status: "approved", decisionNote: decisionNote || null });

  await publishBookingEvent("booking.approved", booking);
  await trackBookingEvent("booking.approved", booking);
  await createAuditLog({
    userId: admin.id,
    action: "BOOKING_APPROVED",
    entity: "booking",
    entityId: booking.id,
    details: { decisionNote },
    ipAddress,
  });

  return booking;
};

export const rejectBooking = async (id, admin, decisionNote, ipAddress) => {
  const booking = await getBookingById(id, admin);

  if (booking.status !== "pending") {
    throw new ApiError(400, "Only pending bookings can be rejected.");
  }

  await booking.update({ status: "rejected", decisionNote: decisionNote || null });

  await publishBookingEvent("booking.rejected", booking);
  await trackBookingEvent("booking.rejected", booking);
  await createAuditLog({
    userId: admin.id,
    action: "BOOKING_REJECTED",
    entity: "booking",
    entityId: booking.id,
    details: { decisionNote },
    ipAddress,
  });

  return booking;
};
