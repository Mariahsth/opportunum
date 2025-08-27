import { Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "-password").populate("projects", "_id title");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

export const getAvailableRoles = async (req: Request, res: Response) => {
  try {
    const rolesEnum = (User.schema.path("roles") as any).caster.enumValues;
    res.status(200).json({ roles: rolesEnum });
  } catch (error) {
    console.error("Erro ao buscar os roles:", error);
    res.status(500).json({ message: "Erro ao buscar os roles disponíveis" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { roles, projects } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { roles, projects },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
};
