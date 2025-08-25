import axios from "axios";
import { baseURL } from "../api/api";

export const fetchAllUsers = async () => {
  const response = await axios.get(`${baseURL}/users`, { withCredentials: true });
  return response.data.users;
};
