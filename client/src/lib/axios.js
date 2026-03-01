import axios from "axios";
import { refreshTokenApi } from "./apis/auth.api.js";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
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
        console.log("Refreshing token...");

        await refreshTokenApi();

        // retry original request
        return api(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Please login again.");
        return Promise.reject(refreshError);
      }
    }

    // show error only if not refresh retry
    toast.error(message);

    return Promise.reject(error);
  },
);

export default api;
