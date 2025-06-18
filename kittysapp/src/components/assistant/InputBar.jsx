import React, { useState } from "react";
import { SendHorizonal, ImageIcon } from "lucide-react";

const InputBar = ({ onSend }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend({ prompt: text, image });
    setText("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Ask something..."
        className="flex-1 p-2 border rounded dark:bg-zinc-800"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label className="cursor-pointer">
        <ImageIcon size={18} />
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <button type="submit" className="p-2 text-blue-600">
        <SendHorizonal size={18} />
      </button>
    </form>
  );
};

export default InputBar;