import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ChatContainer from "./components/ChatContainer";
import CallModal from "./components/CallModal";
import VideoCallScreen from "./components/VideoCallScreen";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/chat/:chatId" element={user ? <ChatContainer /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global UI elements */}
      <CallModal />
      <VideoCallScreen />
    </>
  );
};

export default App;