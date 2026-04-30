import asyncHandler from "../utils/asyncHandler.js";
import { approveBooking, rejectBooking } from "../services/bookingService.js";
import { updateExpiredBookings } from "../services/bookingStatusService.js";

export const approve = asyncHandler(async (req, res) => {
  const booking = await approveBooking(req.params.id, req.user, req.body.decisionNote, req.ip);

  res.status(200).json({
    success: true,
    message: "Booking approved successfully",
    data: booking,
  });
});

export const reject = asyncHandler(async (req, res) => {
  const booking = await rejectBooking(req.params.id, req.user, req.body.decisionNote, req.ip);

  res.status(200).json({
    success: true,
    message: "Booking rejected successfully",
    data: booking,
  });
});

export const runStatusJob = asyncHandler(async (req, res) => {
  const result = await updateExpiredBookings();

  res.status(200).json({
    success: true,
    message: "Booking status job executed successfully",
    data: result,
  });
});
