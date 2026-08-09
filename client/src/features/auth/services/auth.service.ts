import { authApi } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";
import { Token } from "./token.service";

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

    useAuthStore.getState().setAuthenticated(response.user);

    Token.setToken(response.token);

    return response;
  },

  register: async (data: RegisterRequest) => {
    const { data: response } = await authApi.register(data);

    useAuthStore.getState().setAuthenticated(response.user);

    Token.setToken(response.token);

    return response;
  },

  googleLogin: async (data: GoogleAuthRequest) => {
    const { data: response } = await authApi.googleLogin(data);

    useAuthStore.getState().setAuthenticated(response.user);

    Token.setToken(response.token);

    return response;
  },

  googleRegister: async (data: GoogleAuthRequest) => {
    const { data: response } = await authApi.googleRegister(data);

    useAuthStore.getState().setAuthenticated(response.user);

    Token.setToken(response.token);

    return response;
  },

  logout: async () => {
    await authApi.logout();

    useAuthStore.getState().clearAuth();

    Token.clearToken();
  },

  checkAuth: async () => {
    useAuthStore.getState().setCheckingAuth(true);

    try {
      const { data: response } = await authApi.checkAuth();

      useAuthStore.getState().setAuthenticated(response.user);

      return response;
    } catch (error) {
      useAuthStore.getState().clearAuth();
      throw error;
    } finally {
      useAuthStore.getState().setCheckingAuth(false);
    }
  },

  refreshToken: async () => {
    const { data: response } = await authApi.refreshToken();

    Token.setToken(response.token);

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
