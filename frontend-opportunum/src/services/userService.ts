import api from "../api/api";

export const fetchAllUsers = async () => {
  const response = await api.get("/users");
  return response.data.users;
};

export const fetchAvailableRoles = async () => {
  const response = await api.get("/roles");
  return response.data.roles;
};

export const updateUser = async (id: string, data: { roles?: string[]; projects?: string[] }) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data.user;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
