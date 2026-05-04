import workflowApi from "./workflow.axios.js";

const get = async (nodeId: string) => {
  const { data } = await workflowApi.get(`/node/${nodeId}`);
  return data;
};

const getAll = async (workflowId: string) => {
  const { data } = await workflowApi.get(`/node?workflowId=${workflowId}`);
  return data;
};

const add = async (workflowId: string, node: any) => {
  const { data } = await workflowApi.post(
    `/node?workflowId=${workflowId}`,
    node,
  );
  return data;
};

const addAll = async (workflowId: string, nodes: any[]) => {
  const { data } = await workflowApi.post(`/node/${workflowId}/bulk`, nodes);
  return data;
};

const update = async (nodeId: string, updateFields: any) => {
  const { data } = await workflowApi.put(
    `/node?nodeId=${nodeId}`,
    updateFields,
  );
  return data;
};

const remove = async (nodeId: string) => {
  const { data } = await workflowApi.delete(`/node?nodeId=${nodeId}`);
  return data;
};

const nodeApi = {
  get,
  getAll,
  add,
  addAll,
  update,
  remove,
};

export default nodeApi;
