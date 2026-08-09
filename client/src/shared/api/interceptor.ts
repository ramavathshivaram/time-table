import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import { toast } from "sonner";

import { Token } from "@/features/auth/services/token.service";
import { authService } from "@/features/auth/services/auth.service";
import { httpClient } from "./httpClient";
import { useAuthStore } from "@/features/auth/store/auth.store";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = Token.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const errorInterceptor = async (
  error: AxiosError<{ message?: string }>,
) => {
  const originalRequest = error.config as RetryableRequestConfig | undefined;

  const status = error.response?.status;

  const isRefreshRequest = originalRequest?.url?.includes(
    "/auth/refresh-token",
  );

  if (
    status === 403 &&
    originalRequest &&
    !originalRequest._retry &&
    !isRefreshRequest
  ) {
    originalRequest._retry = true;

    try {
      await authService.refreshToken();

      return httpClient(originalRequest);
    } catch {
      Token.clearToken();
      useAuthStore.getState().clearAuth();

      toast.error("Session expired. Please login again.");

      window.location.href = "/login";

      return Promise.reject(error);
    }
  }

  const message =
    error.response?.data?.message ?? error.message ?? "Something went wrong";

  toast.error(message);

  return Promise.reject(error);
};
