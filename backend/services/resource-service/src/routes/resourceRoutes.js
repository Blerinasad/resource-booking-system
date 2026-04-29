import express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  remove,
} from "../controllers/resourceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  validateCreateResource,
  validateUpdateResource,
} from "../validators/resourceValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", findAll);
router.get("/:id", findOne);
router.post("/", roleMiddleware("admin"), validateCreateResource, create);
router.put("/:id", roleMiddleware("admin"), validateUpdateResource, update);
router.delete("/:id", roleMiddleware("admin"), remove);

export default router;
