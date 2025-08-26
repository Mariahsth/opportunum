import { Request, Response, NextFunction } from "express";
import { IUser } from "../interface/User";

export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user as IUser;

    if (!user || !roles.some((role) => user.roles.includes(role))) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    next();
  };
};
