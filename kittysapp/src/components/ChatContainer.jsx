import React, { useContext, useEffect, useState } from "react"; import { AuthContext } from "../context/AuthContext"; import { ChatContext } from "../context/ChatContext"; import { SocketContext } from "../context/SocketContext"; import WatchTogether from "./WatchTogether/WatchTogether";

const ChatContainer = () => { const { currentUser } = useContext(AuthContext); const { selectedChat, messages, sendMessage, groupAdminId } = useContext(ChatContext); const socket = useContext(SocketContext);

const [newMessage, setNewMessage] = useState("");

const handleSend = () => { if (newMessage.trim()) { sendMessage(newMessage); setNewMessage(""); } };

if (!selectedChat) { return <div className="flex-1 flex items-center justify-center text-gray-500">Select a chat to start messaging</div>; }

const isGroup = selectedChat.isGroupChat; const isAdmin = currentUser._id === groupAdminId;

return ( <div className="flex flex-col flex-1 p-4 overflow-hidden"> {/* Chat Header */} <div className="flex justify-between items-center mb-2"> <h2 className="text-xl font-semibold"> {isGroup ? selectedChat.chatName : selectedChat.users.find(u => u._id !== currentUser._id)?.username} </h2> </div>

{/* Watch Together */}
  {isGroup && (
    <div className="mb-4">
      <WatchTogether groupId={selectedChat._id} isAdmin={isAdmin} />
    </div>
  )}

  {/* Messages */}
  <div className="flex-1 overflow-y-auto mb-4">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`my-1 p-2 max-w-xs rounded-md text-sm ${
          msg.sender === currentUser._id ? "bg-blue-600 text-white ml-auto" : "bg-gray-200 text-black mr-auto"
        }`}
      >
        {msg.content}
      </div>
    ))}
  </div>

  {/* Message Input */}
  <div className="flex items-center gap-2">
    <input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Type a message"
      className="flex-1 p-2 border rounded-md"
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
    />
    <button
      onClick={handleSend}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Send
    </button>
  </div>
</div>

); };

export default ChatContainer;