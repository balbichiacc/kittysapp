import WatchHistory from "../models/WatchHistory.js";

export const addWatchSession = async (req, res) => {
  try {
    const { groupId, videoUrl, videoTitle } = req.body;
    const newSession = await WatchHistory.create({
      group: groupId,
      videoUrl,
      videoTitle,
      watchedBy: req.user._id,
    });
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: "Failed to add watch session", error: error.message });
  }
};

export const getWatchHistory = async (req, res) => {
  try {
    const { groupId } = req.params;
    const history = await WatchHistory.find({ group: groupId })
      .populate("watchedBy", "fullName username")
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history", error: error.message });
  }
};