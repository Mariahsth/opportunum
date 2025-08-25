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
