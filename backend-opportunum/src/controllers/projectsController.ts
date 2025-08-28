import { IUser } from "../interface/User";
import { Project } from "../models/Projects";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/express";

export const getAllProjects = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }
    if (user.roles.includes("master")) {
      const allProjects = await Project.find();
      return res.json(allProjects);
    }

    if (!user.projects || user.projects.length === 0) {
      return res.json([]); 
    }

    const userProjects = await Project.find({
      _id: { $in: user.projects },
    });

    res.json(userProjects);
  } catch (err) {
    console.error("Erro ao buscar projetos:", err);
    res.status(500).json({ message: "Erro ao buscar projetos" });
  }
};

export const getProjectById = async (req:Request, res:Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Projeto não encontrado" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projeto" });
  }
};

export const createProject = async (req:Request, res:Response) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar projeto" });
  }
};

export const updateProject = async (req:Request, res:Response) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Projeto não encontrado" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar projeto" });
  }
};

export const deleteProject = async (req:Request, res:Response) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Projeto não encontrado" });
    res.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar projeto" });
  }
};
