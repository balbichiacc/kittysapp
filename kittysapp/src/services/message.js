import API from "./api";

export const fetchMessages = async (chatId) => {
  const res = await API.get(`/api/message/${chatId}`);
  return res.data;
};

export const sendMessage = async (data) => {
  const res = await API.post("/api/message/send", data);
  return res.data;
};

export const deleteMessage = async (id) => {
  const res = await API.delete(`/api/message/delete/${id}`);
  return res.data;
};

export const editMessage = async (id, newContent) => {
  const res = await API.put(`/api/message/edit/${id}`, { content: newContent });
  return res.data;
};