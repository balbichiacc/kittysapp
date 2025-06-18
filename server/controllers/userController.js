import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Cannot fetch profile", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, username, bio, avatar } = req.body;

    const existingUsername = await User.findOne({ username, _id: { $ne: req.userId } });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { fullName, username, bio, avatar },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const searchUsers = async (req, res) => {
  const { query } = req.query;

  try {
    const users = await User.find({
      $or: [
        { username: new RegExp(query, "i") },
        { fullName: new RegExp(query, "i") },
      ],
    }).select("username fullName avatar");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};