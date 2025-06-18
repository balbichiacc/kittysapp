import express from "express";
import { updateGroup } from "../controllers/groupController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/:groupId", protect, updateGroup);

export default router;