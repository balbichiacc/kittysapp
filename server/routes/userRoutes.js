import express from "express";
import {
  getProfile,
  updateProfile,
  searchUsers,
  checkAuth,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);
router.get("/search", authMiddleware, searchUsers);
router.get("/check", checkAuth);

export default router;
