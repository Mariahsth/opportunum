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
export const createProject = async (
  title: string
): Promise<IProject> => {
  try {
    const res = await api.post(
      "/projects",
      { title },
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao criar projeto";
    }
    throw "Erro desconhecido ao criar projeto";
  }
};

export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    await api.delete(`/projects/${projectId}`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao excluir projeto";
    }
    throw "Erro desconhecido ao excluir projeto";
  }
};