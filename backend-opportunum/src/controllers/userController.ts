import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "senhasecreta";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, roles: string[] };

    if (!decoded.roles.includes("master") && !decoded.roles.includes("admin")) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const users = await User.find({}, "-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

export const getAvailableRoles = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Não autenticado" });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; roles: string[] };
    if (!decoded.roles.includes("master") && !decoded.roles.includes("admin")) {
      return res.status(403).json({ message: "Acesso negado" });
    }
    const rolesEnum = (User.schema.path("roles") as any).caster.enumValues;
    res.status(200).json({ roles: rolesEnum });
  } catch (error) {
    console.error("Erro ao buscar os roles:", error);
    res.status(500).json({ message: "Erro ao buscar os roles disponíveis" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, roles: string[] };

    if (!decoded.roles.includes("master") && !decoded.roles.includes("admin")) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const { id } = req.params;
    const { roles, teams } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { roles, teams },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};