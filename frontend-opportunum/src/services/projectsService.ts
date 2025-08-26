import api from "../api/api";
import axios from "axios";
import type { IProject } from "../interface/Project"; 

export const fetchProjects = async (): Promise<IProject[]> => {
  try {
    const res = await api.get("/projects");
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao buscar projetos";
    }
    throw "Erro desconhecido ao buscar projetos";
  }
};
