import express from "express";
import {
  startWatchSession,
  updateWatchSession,
  getWatchSessions,
} from "../controllers/watchController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/start", authMiddleware, startWatchSession);
router.put("/update/:sessionId", authMiddleware, updateWatchSession);
router.get("/group/:groupId", authMiddleware, getWatchSessions);

export default router;