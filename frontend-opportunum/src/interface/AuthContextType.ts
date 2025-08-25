import type { User } from "./User";

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => void;
  }