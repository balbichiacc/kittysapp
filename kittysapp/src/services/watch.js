import API from "./api";

export const getWatchHistory = async (groupId) => {
  const res = await API.get(`/api/watch/${groupId}`);
  return res.data;
};

export const addWatchSession = async (data) => {
  const res = await API.post("/api/watch/add", data);
  return res.data;
};