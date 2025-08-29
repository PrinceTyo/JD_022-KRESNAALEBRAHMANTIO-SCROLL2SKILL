import axiosInstance from "./axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authApi = {
  login: (data: LoginData) => axiosInstance.post("/auth/login", data),
  register: (data: RegisterData) => axiosInstance.post("/auth/register", data)
};