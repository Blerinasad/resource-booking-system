import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  summary,
  mostUsedResources,
  topUsers,
  bookingsByDay,
  peakHours,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/summary", summary);
router.get("/most-used-resources", mostUsedResources);
router.get("/top-users", topUsers);
router.get("/bookings-by-day", bookingsByDay);
router.get("/peak-hours", peakHours);

export default router;
