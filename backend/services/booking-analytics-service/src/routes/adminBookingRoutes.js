import express from "express";
import { approve, reject, runStatusJob } from "../controllers/adminBookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { validateDecision } from "../validators/bookingValidator.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.patch("/:id/approve", validateDecision, approve);
router.patch("/:id/reject", validateDecision, reject);
router.post("/run-status-job", runStatusJob);

export default router;
