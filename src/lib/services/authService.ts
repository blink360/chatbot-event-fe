import axiosClient from "src/lib/axios";
import { sanitizeInputs } from "../utils/sanitize";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export const login = async (data: LoginDto) => {
  const res = await axiosClient.post("/auth/login", {
    email: sanitizeInputs(data.email),
    password: sanitizeInputs(data.password),
  });
  return res.data;
};

export const register = async (data: RegisterDto) => {
  const res = await axiosClient.post("/auth/register", data);
  return res.data;
};

export const refreshSession = async () => {
  const res = await axiosClient.post("/auth/refresh");
  return res.data;
};

export const logout = async () => {
  const res = await axiosClient.post("/auth/logout");
  return res.data;
};
