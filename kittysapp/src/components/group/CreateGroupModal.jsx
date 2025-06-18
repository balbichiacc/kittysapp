import React, { useState } from "react";
import { createGroupChat } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import { X } from "lucide-react";

const CreateGroupModal = ({ onClose }) => {
  const { user } = useAuth();
  const { fetchUserChats } = useChat();
  const [groupName, setGroupName] = useState("");
  const [usernames, setUsernames] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const usernameList = usernames.split(",").map((u) => u.trim());
    const res = await createGroupChat({ name: groupName, users: usernameList });
    if (res) {
      fetchUserChats();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>
        <h2 className="text-lg font-semibold mb-4">Create Group</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block font-medium">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border rounded dark:bg-zinc-800"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Add Users (comma-separated usernames)</label>
            <input
              type="text"
              value={usernames}
              onChange={(e) => setUsernames(e.target.value)}
              className="w-full p-2 border rounded dark:bg-zinc-800"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;