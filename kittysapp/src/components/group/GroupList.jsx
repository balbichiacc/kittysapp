import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const GroupList = () => {
  const { groupChats, selectChat, selectedChat } = useContext(ChatContext);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Groups</h2>
      <ul className="space-y-2">
        {groupChats.map((group) => (
          <li
            key={group._id}
            onClick={() => selectChat(group)}
            className={`cursor-pointer px-4 py-2 rounded-md ${
              selectedChat?._id === group._id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
          >
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;