import workflowApi from "./workflow.axios.js";

const getEdge = async (edgeId: string) => {
  const { data } = await workflowApi.get(`/edge/${edgeId}`);
  return data;
};

const getEdges = async (workflowId: string) => {
  const { data } = await workflowApi.get(`/edge?workflowId=${workflowId}`);
  return data;
};

const addEdge = async (workflowId: string, edge: any) => {
  const { data } = await workflowApi.post(
    `/edge?workflowId=${workflowId}`,
    edge,
  );
  return data;
};

const addEdges = async (workflowId: string, edges: any[]) => {
  const { data } = await workflowApi.post(`/edge/${workflowId}/bulk`, edges);
  return data;
};

const updateEdge = async (edgeId: string, updateFields: any) => {
  const { data } = await workflowApi.put(
    `/edge?edgeId=${edgeId}`,
    updateFields,
  );
  return data;
};

const removeEdge = async (edgeId: string) => {
  const { data } = await workflowApi.delete(`/edge?edgeId=${edgeId}`);
  return data;
};

const edgeApi = {
  getEdge,
  getEdges,
  addEdge,
  addEdges,
  updateEdge,
  removeEdge,
};

export default edgeApi;
