import { useState, useEffect} from "react";
import api from "../api/api";
import { AuthContext } from "./AuthContext";
import type { User } from "../interface/User";
import type { AuthProviderProps } from "../interface/AuthProviderProps";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = () => {
    setLoading(true);
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout"); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}