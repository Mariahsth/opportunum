import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface JwtPayload {
  id: string;
  email: string;
  roles: string[];
  teams: string[];
}
const JWT_SECRET = process.env.JWT_SECRET || "senhasecreta";
console.log("jwt secret:", JWT_SECRET)
export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Sem token, não autorizado" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};