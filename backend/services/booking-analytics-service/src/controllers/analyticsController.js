import asyncHandler from "../utils/asyncHandler.js";
import {
  getAnalyticsSummary,
  getMostUsedResources,
  getTopUsers,
  getBookingsByDay,
  getPeakHours,
} from "../services/analyticsService.js";

export const summary = asyncHandler(async (req, res) => {
  const result = await getAnalyticsSummary();

  res.status(200).json({ success: true, data: result });
});

export const mostUsedResources = asyncHandler(async (req, res) => {
  const result = await getMostUsedResources();

  res.status(200).json({ success: true, data: result });
});

export const topUsers = asyncHandler(async (req, res) => {
  const result = await getTopUsers();

  res.status(200).json({ success: true, data: result });
});

export const bookingsByDay = asyncHandler(async (req, res) => {
  const result = await getBookingsByDay();

  res.status(200).json({ success: true, data: result });
});

export const peakHours = asyncHandler(async (req, res) => {
  const result = await getPeakHours();

  res.status(200).json({ success: true, data: result });
});
