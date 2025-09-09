import type { IProject } from "./Project";
import type { User } from "./User";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => void;
  logout: () => Promise<void>;
  login: (email:string, password:string) => Promise<void>;
  availableRoles: string[];
  users: User[];
  fetchAllUsers: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  projects:IProject[];
  refreshProjects: () => void
}