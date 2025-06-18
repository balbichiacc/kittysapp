import express from "express";
import { signup, login, checkAuth } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check", protect, checkAuth);

export default router;