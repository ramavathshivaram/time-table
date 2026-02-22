import api from "../axios.js";

export const registerApi = (data) => api.post("/auth/register", data);

export const loginApi = (data) => api.post("/auth/login", data);

export const forgotPasswordApi = (data) => api.post("/auth/forgot-password", data);

export const verifyOTPApi = (data) => api.post("/auth/verify-otp", data);

export const logoutApi = () => api.post("/auth/logout");

export const authCheckApi = () => api.get("/auth/auth-check");
