import axios from "axios";

const API_URL = "/api";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  fullName: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
}

export interface Note {
  id: string;
  title: string;
  content?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor do dodawania tokenu do zapytań
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  async login(data: LoginData) {
    const response = await api.post("/auth/login", data);
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  },

  async register(data: RegisterData) {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
  },
};

export const notes = {
  async getAll() {
    const response = await api.get<Note[]>("/notes");
    return response.data;
  },

  async getPublic() {
    const response = await api.get<Note[]>("/notes/public");
    return response.data;
  },

  async create(data: { title: string; content?: string; isPublic: boolean }) {
    const response = await api.post<Note>("/notes", data);
    return response.data;
  },

  async update(id: string, data: { title: string; content?: string; isPublic: boolean }) {
    await api.put(`/notes/${id}`, data);
  },

  async delete(id: string) {
    await api.delete(`/notes/${id}`);
  },
};
