import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import chatRouter from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

//================== MIDDLEWARE ==================//
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://kittysapp.vercel.app"], // ⬅️ Add your frontend URLs
  credentials: true,
}));

//================== DATABASE ==================//
connectDB();

//================== API ROUTES ==================//
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/chats", chatRouter);

//================== SOCKET.IO ==================//
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://kittysapp.vercel.app"], // ⬅️ Match frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // userId => socket.id

export const getUserSocketMap = (userId) => userSocketMap[userId];

io.on("connection", (socket) => {
  console.log("✅ New socket connected:", socket.id);

  socket.on("setup", (userData) => {
    userSocketMap[userData._id] = socket.id;
    socket.join(userData._id);
    console.log(`🔗 ${userData.username} connected with socket ${socket.id}`);
    socket.emit("connected");
  });

  socket.on("join-chat", (roomId) => {
    socket.join(roomId);
    console.log(`👥 Joined room: ${roomId}`);
  });

  socket.on("send-message", ({ chatId, message }) => {
    if (!chatId || !message) return;
    io.to(chatId).emit("new-message", message);
  });

  socket.on("typing", (chatId) => socket.to(chatId).emit("typing"));
  socket.on("stop-typing", (chatId) => socket.to(chatId).emit("stop-typing"));

  // 🔴 Audio/Video Call Handling
  socket.on("call-user", ({ userToCall, from, signal }) => {
    const socketId = getUserSocketMap(userToCall);
    if (socketId) {
      io.to(socketId).emit("incoming-call", { from, signal });
    }
  });

  socket.on("answer-call", ({ to, signal }) => {
    const socketId = getUserSocketMap(to);
    if (socketId) {
      io.to(socketId).emit("call-accepted", { signal });
    }
  });

  socket.on("end-call", ({ to }) => {
    const socketId = getUserSocketMap(to);
    if (socketId) {
      io.to(socketId).emit("call-ended");
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
    for (const userId in userSocketMap) {
      if (userSocketMap[userId] === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }
  });
});

//================== SERVER START ==================//
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
socket.on("start-watch", ({ groupId, videoId }) => {
  io.to(groupId).emit("start-watch", { videoId });
});

socket.on("sync-play", ({ groupId }) => {
  io.to(groupId).emit("sync-play");
});

socket.on("sync-pause", ({ groupId }) => {
  io.to(groupId).emit("sync-pause");
});

socket.on("sync-seek", ({ groupId, time }) => {
  io.to(groupId).emit("sync-seek", { time });
});
import watchRoutes from "./routes/watchRoutes.js";
app.use("/api/watch", watchRoutes);