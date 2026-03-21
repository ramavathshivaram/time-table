import axios from "axios";
import { refreshTokenApi } from "./apis/auth.api.js";
import { toast } from "sonner";
import useAuthStore from "@/store/auth.store.js";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    if (error?.response?.status === 427 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshTokenApi();

        useAuthStore.getState().setToken(token);

        originalRequest.headers.authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Please login again.");
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    // show error only if not refresh retry
    toast.error(message);

    return Promise.reject(message);
  },
);

export default api;
