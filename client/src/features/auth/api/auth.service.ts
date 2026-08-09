import { authApi } from "./auth.api";

import type {
  ForgotPasswordRequest,
  GoogleAuthRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
} from "../types/auth.types";

export const authService = {
  login: async (data: LoginRequest) => {
    const { data: response } = await authApi.login(data);
    return response;
  },

  register: async (data: RegisterRequest) => {
    const { data: response } = await authApi.register(data);
    return response;
  },

  googleLogin: async (data: GoogleAuthRequest) => {
    const { data: response } = await authApi.googleLogin(data);
    return response;
  },

  googleRegister: async (data: GoogleAuthRequest) => {
    const { data: response } = await authApi.googleRegister(data);
    return response;
  },

  logout: async () => {
    await authApi.logout();
  },

  checkAuth: async () => {
    const { data: response } = await authApi.checkAuth();
    return response;
  },

  refreshToken: async () => {
    const { data: response } = await authApi.refreshToken();
    return response;
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const { data: response } = await authApi.forgotPassword(data);
    return response;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const { data: response } = await authApi.resetPassword(data);
    return response;
  },

  verifyEmail: async (data: VerifyEmailRequest) => {
    const { data: response } = await authApi.verifyEmail(data);
    return response;
  },
};
