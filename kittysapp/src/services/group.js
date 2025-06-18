import API from "./api";

export const getGroups = async () => {
  const res = await API.get("/api/group");
  return res.data;
};

export const createGroup = async (data) => {
  const res = await API.post("/api/group/create", data);
  return res.data;
};

export const getGroupMessages = async (groupId) => {
  const res = await API.get(`/api/group/${groupId}/messages`);
  return res.data;
};