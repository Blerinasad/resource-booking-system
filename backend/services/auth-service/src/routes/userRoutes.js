import express from "express";
import { getMe, getAllUsers } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

export default router;
