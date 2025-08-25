import axios from "axios";
import { baseURL } from "../api/api";


export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, { email, password }, { withCredentials: true });
    return response.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || "Erro ao fazer login";
      }
      throw "Erro desconhecido ao fazer login";
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, { email, password });
    return response.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || "Erro ao registrar";
      }
      throw "Erro desconhecido ao registrar";
  }
};
