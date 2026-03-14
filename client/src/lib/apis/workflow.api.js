import api from "../axios.js";

export const getWorkflowsApi = async ({ pageParam = 0 }) => {
  const res = await api.get("/workflow?pageParam=" + pageParam);
  return res.data.data;
};

export const createWorkflowApi = async () => {
  const res = await api.post("/workflow/create-workflow");
  return res.data.data;
};

export const deleteWorkflowApi = async (workflowId) => {
  const res = await api.delete(`/workflow/${workflowId}`);
  return res.data.data;
};

export const getWorkflowDetailsApi = async (workflowId) => {
  const res = await api.get(`/workflow/${workflowId}`);
  return res.data.data;
};

export const getRecentWorkflowsApi = async () => {
  const res = await api.get("/workflow/recent");
  return res.data.data;
};

export const updateWorkflowApi = async (workflowId, data) => {
  const res = await api.put(`/workflow/${workflowId}`, data);
  return res.data.data;
};
