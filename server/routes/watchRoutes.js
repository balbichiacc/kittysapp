import express from "express";
import { addWatchSession, getWatchHistory } from "../controllers/watchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addWatchSession);
router.get("/:groupId", protect, getWatchHistory);

export default router;