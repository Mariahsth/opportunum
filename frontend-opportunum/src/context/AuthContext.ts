import { createContext } from "react";
import type { AuthContextType } from "../interface/AuthContextType";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
