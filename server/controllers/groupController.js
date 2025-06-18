import Group from "../models/Group.js";

export const updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, members } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name, members },
      { new: true }
    ).populate("members", "-password");

    res.json(updatedGroup);
  } catch (err) {
    res.status(500).json({ message: "Failed to update group", error: err.message });
  }
};