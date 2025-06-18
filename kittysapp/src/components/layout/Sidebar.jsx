import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const { userChats, selectChat, selectedChat } = useContext(ChatContext);

  return (
    <aside className="w-full sm:w-64 bg-gray-100 dark:bg-zinc-800 border-r overflow-y-auto">
      <div className="p-4 font-bold text-lg">Chats</div>
      <ul>
        {userChats.map((chat) => (
          <li
            key={chat._id}
            onClick={() => selectChat(chat)}
            className={`p-3 cursor-pointer ${
              selectedChat?._id === chat._id
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-zinc-700"
            }`}
          >
            {chat.isGroupChat ? chat.name : chat.users[1]?.username}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;