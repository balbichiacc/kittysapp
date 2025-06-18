export const getUserSocketMap = new Map();

export const setIO = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) getUserSocketMap.set(userId, socket.id);

    socket.on("disconnect", () => {
      getUserSocketMap.forEach((val, key) => {
        if (val === socket.id) getUserSocketMap.delete(key);
      });
    });
  });
};