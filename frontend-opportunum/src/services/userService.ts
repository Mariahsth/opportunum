import axios from "axios";
import { baseURL } from "../api/api";

export const fetchAllUsers = async () => {
  const response = await axios.get(`${baseURL}/users`, { withCredentials: true });
  return response.data.users;
};

export const fetchAvailableRoles = async () => {
  const response = await axios.get(`${baseURL}/roles`, { withCredentials: true });
  return response.data.roles;
};

export const updateUser = async (id: string, data: { roles?: string[]; teams?: string[] }) => {
  const res = await axios.put(`${baseURL}/users/${id}`, data, { withCredentials: true });
  return res.data.user;
};