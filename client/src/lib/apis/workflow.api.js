import api from "../axios.js";

export const getAllUserWorkflowsApi = async () => {
  const res = await api.get("/workflow");
  return res.data.data;
};

export const createWorkflowApi = async () => {
  const res = await api.post("/workflow/create-workflow");
  return res.data.data;
};

export const getWorkflowDetailsApi = async (workflowId) => {
  const res = await api.get(`/workflow/${workflowId}`);
  return res.data.data;
};

export const updateWorkflowApi = async (workflowId, data) => {
  const res = await api.put(`/workflow/${workflowId}`, data);
  return res.data.data;
};
