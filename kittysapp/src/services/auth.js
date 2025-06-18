import API from "./api";

export const registerUser = async (data) => {
  const res = await API.post("/api/auth/signup", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/api/auth/login", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await API.post("/api/auth/logout");
  return res.data;
};

export const getProfile = async () => {
  const res = await API.get("/api/auth/check");
  return res.data;
};