import { toast } from "sonner";
import api from "../axios.js";

export const registerApi = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data.data;
};

export const loginApi = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data.data;
};

export const googleLoginApi = async (data) => {
  const res = await api.post("/auth/google-login", data);
  return res.data.data;
};

export const googleRegisterApi = async (data) => {
  const res = await api.post("/auth/google-register", data);
  return res.data.data;
};

export const forgotPasswordApi = async (data) => {
  const res = await api.post("/auth/forgot-password", data);
  toast.success(res.data.message);
  return res.data;
};

export const verifyOTPApi = async (data) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

export const resetPasswordApi = async (data) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const authCheckApi = async () => {
  const res = await api.get("/auth/auth-check");
  return res.data;
};
