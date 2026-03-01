import api from "../axios.js";

export const getAllUserWorkflowsApi = async () => {
  const res = await api.get("/workflow");
  return res.data.data;
};
