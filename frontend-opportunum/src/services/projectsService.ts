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
export const createProject = async (projectData:
  {title: string, municipio?: string}
): Promise<IProject> => {
  try {
    const res = await api.post(
      "/projects",
      projectData,
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
export const updateProject = async (
  projectId: string,
  updatedData: Partial<IProject>
): Promise<IProject> => {
  try {
    const res = await api.put(`/projects/${projectId}`, updatedData);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao atualizar projeto";
    }
    throw "Erro desconhecido ao atualizar projeto";
  }
};