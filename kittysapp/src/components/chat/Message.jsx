import React from "react";
import { useAuth } from "../../context/AuthContext";

const Message = ({ message }) => {
  const { user } = useAuth();
  const isSender = message.sender._id === user._id;

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs p-2 rounded-lg ${
          isSender ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default Message;