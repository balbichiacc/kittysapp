import express from "express";
import { updateProfile, searchUsers } from "../controllers/userController.js";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/update", protect, upload.single("profilePic"), updateProfile);
router.get("/search", protect, searchUsers);

export default router;