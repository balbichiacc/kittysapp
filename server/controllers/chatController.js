import Group from "../models/Group.js";
import User from "../models/User.js";

export const createChat = async (req, res) => {
  try {
    const { memberIds } = req.body;
    if (!memberIds.includes(req.user._id)) memberIds.push(req.user._id);
    const newChat = await Group.create({ isGroupChat: false, members: memberIds });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: "Failed to create chat", error: error.message });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { name, memberIds } = req.body;
    if (!memberIds.includes(req.user._id)) memberIds.push(req.user._id);
    const group = await Group.create({ name, isGroupChat: true, members: memberIds });
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: "Group creation failed", error: err.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Group.find({ members: req.user._id }).populate("members", "-password");
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chats", error: err.message });
  }
};