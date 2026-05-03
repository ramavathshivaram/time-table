import api from "../axios.js";

export const getWorkflowsApi = async ({ pageParam = 0, query }) => {
  const res = await api.get(`/workflow/workflow?pageParam=${pageParam}&query=${query}`);
  return res.data.data;
};

export const createWorkflowApi = async () => {
  const res = await api.post("/workflow/workflow");
  return res.data.data;
};

export const getWorkflowDetailsApi = async (workflowId) => {
  const res = await api.get(`/workflow/workflow/${workflowId}`);
  return res.data.data;
};

export const getRecentWorkflowsApi = async () => {
  const res = await api.get("/workflow/workflow/recent");
  return res.data.data;
};

export const updateWorkflowApi = async (workflowId, data) => {
  const res = await api.put(`/workflow/workflow/${workflowId}`, data);
  return res.data.data;
};
