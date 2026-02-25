import axios from "axios";

import { USER_API_URL } from "../lib/const.js";

export const createUser = async (data) => {
  const res = await axios.post(`${USER_API_URL}/create`, data);
  console.log(res.data);
  return res.data.data;
};
