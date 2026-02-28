import { toast } from "sonner";
import api from "../axios.js";

export const getUserDetailsApi = async (data) => {
  const res = await api.get("/user", data);
  return res.data.data;
};
