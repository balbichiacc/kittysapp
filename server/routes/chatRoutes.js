import express from "express";
import { createChat, createGroupChat, getChats } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/single", protect, createChat);
router.post("/group", protect, createGroupChat);
router.get("/", protect, getChats);

export default router;