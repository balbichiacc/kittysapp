import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [typingUser, setTypingUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io("https://chat-app-backend-five-alpha.vercel.app", {
        query: { userId: user._id },
      });

      setSocket(newSocket);

      newSocket.on("typing", ({ from }) => {
        setTypingUser(from);
      });

      newSocket.on("stop-typing", () => {
        setTypingUser(null);
      });

      return () => newSocket.disconnect();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, typingUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);