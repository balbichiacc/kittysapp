import express from "express";
import {
  createGroup,
  getUserGroups,
  addGroupMember,
  removeGroupMember,
} from "../controllers/groupController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createGroup);
router.get("/my-groups", authMiddleware, getUserGroups);
router.put("/add/:groupId", authMiddleware, addGroupMember);
router.put("/remove/:groupId", authMiddleware, removeGroupMember);

export default router;