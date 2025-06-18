import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { groupId, content } = req.body;
    const message = await Message.create({
      group: groupId,
      sender: req.user._id,
      content,
    });

    const fullMessage = await Message.findById(message._id)
      .populate("sender", "-password")
      .populate("group");

    res.status(201).json(fullMessage);
  } catch (error) {
    res.status(500).json({ message: "Message send failed", error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await Message.find({ group: groupId })
      .populate("sender", "-password")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to get messages", error: err.message });
  }
};