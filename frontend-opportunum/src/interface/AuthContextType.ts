import type { User } from "./User";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => void;
  logout: () => Promise<void>;
  availableRoles: string[];
  users: User[];
  fetchAllUsers: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}