import Message from "../models/Message.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const { to, messageType, content } = req.body;

    const newMessage = new Message({
      from: req.userId,
      to,
      messageType,
      content,
    });

    await newMessage.save();

    const fullMessage = await newMessage.populate("from", "username fullName avatar");

    res.status(201).json(fullMessage);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { to } = req.params;

    const messages = await Message.find({
      $or: [
        { from: req.userId, to },
        { from: to, to: req.userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const msg = await Message.findById(id);
    if (!msg || msg.from.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Message.findByIdAndDelete(id);
    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};

export const editMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const msg = await Message.findById(id);
    if (!msg || msg.from.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    msg.content = content;
    await msg.save();

    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json({ message: "Failed to edit message", error: err.message });
  }
};