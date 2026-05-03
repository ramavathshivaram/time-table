import { toast } from "sonner";
import api from "../axios.js";

export const registerApi = async (data) => {
  const res = await api.post("/auth/local/register", data);
  return { user: res.data.user, token: res.data.token };
};

export const loginApi = async (data) => {
  const res = await api.post("/auth/local/login", data);
  return {
    user: res.data.user,
    token: res.data.token,
  };
};

export const googleLoginApi = async (data) => {
  const res = await api.post("/auth/google/google-login", data);
  return {
    user: res.data.user,
    token: res.data.token,
  };
};

export const googleRegisterApi = async (data) => {
  const res = await api.post("/auth/google/google-register", data);
  return {
    user: res.data.user,
    token: res.data.token,
  };
};

export const forgotPasswordApi = async (data) => {
  const res = await api.post("/auth/password/forgot-password", data);
  toast.success(res.data.message);
  return res.data;
};

export const verifyOTPApi = async (data) => {
  const res = await api.post("/auth/password/verify-otp", data);
  return res.data;
};

export const resetPasswordApi = async (data) => {
  const res = await api.post("/auth/password/reset-password", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/auth/auth/logout");
  return res.data;
};

export const authCheckApi = async () => {
  const res = await api.get("/auth/auth/auth-check");
  return res.data;
};

export const refreshTokenApi = async () => {
  const res = await api.get("/auth/auth/refresh-token");
  return res.data.token;
};
