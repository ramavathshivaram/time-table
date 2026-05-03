import env from "#configs/env.js";
import axios from "axios";

export const api = axios.create({ baseURL: env.USER_SERVICE_URL });

export const createUserGrpc = async (data: any) => {
  const res = await api.post("/user", data);
  console.log(res.data.data);
  return res.data.data;
};
