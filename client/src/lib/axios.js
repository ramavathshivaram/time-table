import axios from "axios";
import { toast } from "sonner";

const BACKEND_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    toast.error(message);

    return Promise.reject(error);
  }
);

export default api;