export interface User {
    _id: string;
    name: string;
    email: string;
    roles: ("master" | "admin" | "assistant")[];
    projects: string[];
  }