import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
  editMessage,
} from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:to", authMiddleware, getMessages);
router.delete("/:id", authMiddleware, deleteMessage);
router.put("/:id", authMiddleware, editMessage);

export default router;