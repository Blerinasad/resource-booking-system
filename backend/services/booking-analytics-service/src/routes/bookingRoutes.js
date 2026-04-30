import express from "express";
import { create, findAll, findOne, cancel } from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateCreateBooking } from "../validators/bookingValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", validateCreateBooking, create);
router.patch("/:id/cancel", cancel);

export default router;
