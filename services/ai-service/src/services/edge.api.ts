import workflowApi from "./workflow.axios.js";

const get = async (edgeId: string) => {
  const { data } = await workflowApi.get(`/edge/${edgeId}`);
  return data;
};

const getAll = async (workflowId: string) => {
  const { data } = await workflowApi.get(`/edge?workflowId=${workflowId}`);
  return data;
};

const add = async (workflowId: string, edge: any) => {
  const { data } = await workflowApi.post(
    `/edge?workflowId=${workflowId}`,
    edge,
  );
  return data;
};

const addAll = async (workflowId: string, edges: any[]) => {
  const { data } = await workflowApi.post(`/edge/${workflowId}/bulk`, edges);
  return data;
};

const update = async (edgeId: string, updateFields: any) => {
  const { data } = await workflowApi.put(
    `/edge?edgeId=${edgeId}`,
    updateFields,
  );
  return data;
};

const remove = async (edgeId: string) => {
  const { data } = await workflowApi.delete(`/edge?edgeId=${edgeId}`);
  return data;
};

const edgeApi = {
  get,
  getAll,
  add,
  addAll,
  update,
  remove,
};

export default edgeApi;
