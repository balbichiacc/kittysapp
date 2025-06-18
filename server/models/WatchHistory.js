import mongoose from "mongoose";

const watchSessionSchema = new mongoose.Schema(
  {
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    videoUrl: { type: String, required: true },
    startedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    currentTime: { type: Number, default: 0 },
    isPlaying: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("WatchSession", watchSessionSchema);