import WatchSession from "../models/WatchSession.js";

export const startWatchSession = async (req, res) => {
  try {
    const { groupId, videoUrl } = req.body;

    const session = await WatchSession.create({
      group: groupId,
      videoUrl,
      startedBy: req.userId,
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to start session", error: err.message });
  }
};

export const updateWatchSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { currentTime, isPlaying } = req.body;

    const session = await WatchSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.currentTime = currentTime;
    session.isPlaying = isPlaying;

    await session.save();

    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to update session", error: err.message });
  }
};

export const getWatchSessions = async (req, res) => {
  try {
    const { groupId } = req.params;

    const sessions = await WatchSession.find({ group: groupId }).sort({ createdAt: -1 });

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sessions", error: err.message });
  }
};