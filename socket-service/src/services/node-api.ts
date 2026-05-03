import workflowApi from "./workflow.axios.js";

const getNode = async (nodeId: string) => {
  const { data } = await workflowApi.get(`/node/${nodeId}`);
  return data;
};

const getNodes = async (workflowId: string) => {
  const { data } = await workflowApi.get(`/node?workflowId=${workflowId}`);
  return data;
};

const addNode = async (workflowId: string, node: any) => {
  const { data } = await workflowApi.post(
    `/node?workflowId=${workflowId}`,
    node,
  );
  return data;
};

const addNodes = async (workflowId: string, nodes: any[]) => {
  const { data } = await workflowApi.post(`/node/${workflowId}/bulk`, nodes);
  return data;
};

const updateNode = async (nodeId: string, updateFields: any) => {
  const { data } = await workflowApi.put(
    `/node?nodeId=${nodeId}`,
    updateFields,
  );
  return data;
};

const removeNode = async (nodeId: string) => {
  const { data } = await workflowApi.delete(`/node?nodeId=${nodeId}`);
  return data;
};

const nodeApi = {
  getNode,
  getNodes,
  addNode,
  addNodes,
  updateNode,
  removeNode,
};

export default nodeApi;
