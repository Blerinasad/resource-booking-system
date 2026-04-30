import asyncHandler from "../utils/asyncHandler.js";
import {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
} from "../services/bookingService.js";

export const create = asyncHandler(async (req, res) => {
  const booking = await createBooking(req.body, req.user, req.ip);

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: booking,
  });
});

export const findAll = asyncHandler(async (req, res) => {
  const result = await getBookings(req.query, req.user);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const findOne = asyncHandler(async (req, res) => {
  const booking = await getBookingById(req.params.id, req.user);

  res.status(200).json({
    success: true,
    data: booking,
  });
});

export const cancel = asyncHandler(async (req, res) => {
  const booking = await cancelBooking(req.params.id, req.user, req.ip);

  res.status(200).json({
    success: true,
    message: "Booking cancelled successfully",
    data: booking,
  });
});
