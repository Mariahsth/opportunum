import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../interface/User";
import type { AuthProviderProps } from "../interface/AuthProviderProps";
import { fetchAllUsers, fetchAvailableRoles } from "../services/userService";
import { fetchMe, logoutUser } from "../services/authService";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const user = await fetchMe();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableRoles = async () => {
    try {
      const roles = await fetchAvailableRoles();
      setAvailableRoles(roles || []);
    } catch (error) {
      console.error("Erro ao buscar roles disponíveis:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const usuarios = await fetchAllUsers();
      setUsers(usuarios || []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
    loadAvailableRoles();
    loadUsers();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        availableRoles,
        loading,
        refreshUser,
        logout,
        fetchAllUsers: loadUsers, 
        setUsers, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
