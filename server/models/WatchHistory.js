import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  videoUrl: { type: String, required: true },
  videoTitle: { type: String, required: true },
  watchedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("WatchHistory", watchHistorySchema);