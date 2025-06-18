import API from "./api";

export const queryAssistant = async (input) => {
  const formData = new FormData();
  formData.append("input", input);

  const res = await API.post("/api/assistant", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};