import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import Peer from "simple-peer";
import { useSocket } from "./SocketContext";
import { useAuth } from "./AuthContext";

const CallContext = createContext();

export const useCall = () => useContext(CallContext);

const CallProvider = ({ children }) => {
  const { socket } = useSocket();
  const { user } = useAuth();

  const [stream, setStream] = useState(null);
  const [call, setCall] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [remoteStream, setRemoteStream] = useState(null);
  const peerRef = useRef();

  useEffect(() => {
    if (!socket) return;

    socket.on("incoming-call", ({ from, signal }) => {
      setCall({ from, signal });
    });

    socket.on("call-ended", () => {
      endCall();
    });
  }, [socket]);

  const answerCall = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setStream(localStream);

    const peer = new Peer({ initiator: false, trickle: false, stream: localStream });

    peer.on("signal", (data) => {
      socket.emit("answer-call", {
        to: call.from._id,
        signal: data,
      });
    });

    peer.on("stream", (remote) => {
      setRemoteStream(remote);
    });

    peer.signal(call.signal);
    peerRef.current = peer;
    setCallAccepted(true);
  };

  const callUser = async (userToCall) => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setStream(localStream);

    const peer = new Peer({ initiator: true, trickle: false, stream: localStream });

    peer.on("signal", (data) => {
      socket.emit("call-user", {
        userToCall: userToCall._id,
        from: user,
        signal: data,
      });
    });

    peer.on("stream", (remote) => {
      setRemoteStream(remote);
    });

    socket.on("call-accepted", ({ signal }) => {
      peer.signal(signal);
      setCallAccepted(true);
    });

    peerRef.current = peer;
  };

  const endCall = () => {
    peerRef.current?.destroy();
    if (stream) stream.getTracks().forEach((track) => track.stop());

    setCall(null);
    setCallAccepted(false);
    setCallEnded(true);
    setRemoteStream(null);
    setStream(null);
    socket.emit("end-call", { to: call?.from?._id });
  };

  return (
    <CallContext.Provider
      value={{
        call,
        stream,
        remoteStream,
        callAccepted,
        callEnded,
        callUser,
        answerCall,
        endCall,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export default CallProvider;