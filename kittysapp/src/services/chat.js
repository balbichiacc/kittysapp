import API from "./api";

export const getChats = async () => {
  const res = await API.get("/api/chat");
  return res.data;
};

export const createPrivateChat = async (partnerId) => {
  const res = await API.post("/api/chat/private", { partnerId });
  return res.data;
};