import { Types } from "mongoose";
import { IProject } from "./Project";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  projects: Types.ObjectId[] | IProject[]; 
}
