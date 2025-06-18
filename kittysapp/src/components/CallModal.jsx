import React from "react";
import { useCall } from "../contexts/CallContext";

const CallModal = () => {
  const { call, answerCall, endCall } = useCall();

  if (!call) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl text-center shadow-lg">
        <h2 className="text-lg font-semibold">Incoming Call 📞</h2>
        <p className="mb-4">From: {call.from?.username || "Unknown"}</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={answerCall}
            className="bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Accept
          </button>
          <button
            onClick={endCall}
            className="bg-red-500 text-white px-4 py-2 rounded-full"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;