import api from "../api/api";
import axios from "axios";
import type { ITask } from "../interface/Task";

export const fetchTasksByProject = async (projId: string): Promise<ITask[]> => {
  try {
    const res = await api.get(`/tasks/${projId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao buscar tarefas do projeto";
    }
    throw "Erro desconhecido ao buscar tarefas";
  }
};

export const createTask = async (taskData: Omit<ITask, "_id" | "createdAt" | "updatedAt">): Promise<ITask> => {
  try {
    const res = await api.post("/tasks", taskData);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao criar tarefa";
    }
    throw "Erro desconhecido ao criar tarefa";
  }
};

export const updateTask = async (
  taskId: string,
  updatedData: Partial<ITask>
): Promise<ITask> => {
  try {
    const res = await api.put(`/tasks/${taskId}`, updatedData);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao atualizar tarefa";
    }
    throw "Erro desconhecido ao atualizar tarefa";
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await api.delete(`/tasks/${taskId}`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Erro ao excluir tarefa";
    }
    throw "Erro desconhecido ao excluir tarefa";
  }
};
