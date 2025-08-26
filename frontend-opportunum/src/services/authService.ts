import api from "../api/api";
import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao fazer login";
    }
    throw "Erro desconhecido ao fazer login";
  }
};

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao registrar";
    }
    throw "Erro desconhecido ao registrar";
  }
};

export const fetchMe = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data.user;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao buscar usuário";
    }
    throw "Erro desconhecido ao buscar usuário";
  }
};

export const logoutUser = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao fazer logout";
    }
    throw "Erro desconhecido ao fazer logout";
  }
};
