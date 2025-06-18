import React, { useEffect, useRef } from "react";
import { useCall } from "../contexts/CallContext";

const VideoCallScreen = () => {
  const { stream, remoteStream, callAccepted, endCall } = useCall();
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  useEffect(() => {
    if (localRef.current && stream) {
      localRef.current.srcObject = stream;
    }
    if (remoteRef.current && remoteStream) {
      remoteRef.current.srcObject = remoteStream;
    }
  }, [stream, remoteStream]);

  if (!callAccepted) return null;

  return (
    <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center">
      <video ref={remoteRef} autoPlay playsInline className="w-full h-full object-cover" />
      <video
        ref={localRef}
        autoPlay
        playsInline
        muted
        className="absolute bottom-5 right-5 w-40 h-40 border-2 border-white rounded-lg"
      />
      <button
        onClick={endCall}
        className="absolute top-5 right-5 px-4 py-2 bg-red-600 text-white rounded-full"
      >
        End Call
      </button>
    </div>
  );
};

export default VideoCallScreen;