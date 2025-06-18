import React, { useContext } from "react";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import MessageInput from "./MessageInput";
import { ChatContext } from "../../context/ChatContext";

const ChatBox = () => {
  const { messages, selectedChat } = useContext(ChatContext);

  if (!selectedChat) return <div className="p-4">Select a chat to start messaging</div>;

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))}
        <TypingIndicator />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;