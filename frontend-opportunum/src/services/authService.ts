import api from "../api/api";

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
};

export const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
