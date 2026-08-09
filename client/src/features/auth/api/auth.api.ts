import { httpClient } from "@/shared/api/httpClient";

import type {
  ForgotPasswordRequest,
  GoogleAuthRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "../types/auth.types";

export const authApi = {
  login: (data: LoginRequest) => httpClient.post("/auth/login", data),

  register: (data: RegisterRequest) => httpClient.post("/auth/register", data),

  googleLogin: (data: GoogleAuthRequest) =>
    httpClient.post("/auth/google/login", data),

  googleRegister: (data: GoogleAuthRequest) =>
    httpClient.post("/auth/google/register", data),

  logout: () => httpClient.post("/auth/logout"),

  checkAuth: () => httpClient.get("/auth/check"),

  refreshToken: () => httpClient.get("/auth/refresh-token"),

  forgotPassword: (data: ForgotPasswordRequest) =>
    httpClient.post("/auth/forgot-password", data),

  resetPassword: (data: ResetPasswordRequest) =>
    httpClient.post("/auth/reset-password", data),

  verifyEmail: (data: VerifyEmailRequest) =>
    httpClient.post("/auth/verify-email", data),
};
