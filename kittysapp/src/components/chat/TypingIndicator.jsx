import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const TypingIndicator = () => {
  const { isTyping } = useContext(ChatContext);

  return isTyping ? (
    <div className="text-gray-500 text-sm">Someone is typing...</div>
  ) : null;
};

export default TypingIndicator;