import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String },
  isGroupChat: { type: Boolean, default: false },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Group", groupSchema);