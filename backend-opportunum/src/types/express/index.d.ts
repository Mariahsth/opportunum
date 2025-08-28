import { Request } from "express";
import { IUser } from "../interface/User"; // ajuste o caminho conforme sua estrutura

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}