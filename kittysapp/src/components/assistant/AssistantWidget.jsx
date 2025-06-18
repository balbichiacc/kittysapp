import React, { useState } from "react";
import InputBar from "./InputBar";

const AssistantWidget = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async ({ prompt, image }) => {
    if (!prompt && !image) return;

    setMessages((prev) => [...prev, { type: "user", content: prompt }]);
    setLoading(true);

    const formData = new FormData();
    formData.append("prompt", prompt);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/assistant/query", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data?.response) {
        setMessages((prev) => [...prev, { type: "assistant", content: data.response }]);
      }
    } catch (err) {
      console.error("Assistant error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 w-full border-t dark:border-zinc-700">
      <div className="max-h-64 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md text-sm ${
              msg.type === "user"
                ? "bg-blue-100 dark:bg-blue-900 self-end"
                : "bg-gray-100 dark:bg-zinc-800"
            }`}
          >
            <strong>{msg.type === "user" ? "You" : "Assistant"}:</strong>{" "}
            {msg.content}
          </div>
        ))}
        {loading && (
          <p className="text-xs italic text-gray-500">Assistant is typing...</p>
        )}
      </div>

      <InputBar onSend={handleSend} />
    </div>
  );
};

export default AssistantWidget;