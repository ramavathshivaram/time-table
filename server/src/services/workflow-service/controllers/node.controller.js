import nodeRepository from "../repositorys/node.repository.js";

const getNodeGRPC = async (workflowId, nodeId) => {
  return await nodeRepository.getNode(workflowId, nodeId);
};

const getNodesGRPC = async (workflowId) => {
  return await nodeRepository.getNodes(workflowId);
};
const addNodeGRPC = async (workflowId, node) => {
  await nodeRepository.addNode(workflowId, node);
};

const addNodesGRPC = async (workflowId, nodes) => {
  await nodeRepository.addNodes(workflowId, nodes);
};

const removeNodeGRPC = async (workflowId, nodeId) => {
  await nodeRepository.removeNode(workflowId, nodeId);
};

const updateNodeGRPC = async (workflowId, nodeId, nodeData) => {
  await nodeRepository.updateNode(workflowId, nodeId, nodeData);
};

export default {
  getNodeGRPC,
  getNodesGRPC,
  addNodeGRPC,
  addNodesGRPC,
  removeNodeGRPC,
  updateNodeGRPC,
};
