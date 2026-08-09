import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

import { Token } from "@/features/auth/services/token.service";

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

  const message =
    error.response?.data?.message ?? error.message ?? "Something went wrong";

  /*
   * Let the response interceptor / refresh logic
   * handle authentication failures.
   */
  if (status === 401 && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      // Refresh logic goes here.
      // Do not access Zustand directly.
      //
      // await authService.refreshToken();
      // return httpClient(originalRequest);
    } catch {
      toast.error("Session expired. Please login again.");
    }
  }

  toast.error(message);

  return Promise.reject(error);
};
