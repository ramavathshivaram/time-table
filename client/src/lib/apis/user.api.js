import { toast } from "sonner";
import api from "../axios.js";

export const getUserDetailsApi = async (data) => {
  const res = await api.post("/user/details", data);
  return res.data.data;
};