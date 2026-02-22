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
    toast.error(error.response.data.message);
    return Promise.reject(error);
  },
);


export default api;