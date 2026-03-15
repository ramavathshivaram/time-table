import edgeRepository from "../repositorys/edge.repository.js";

const getEdgeGRPC = async (workflowId, edgeId) => {
  return await edgeRepository.getEdge(workflowId, edgeId);
};

const getEdgesGRPC = async (workflowId) => {
  return await edgeRepository.getEdges(workflowId);
};

const addEdgeGRPC = async (workflowId, edge) => {
  await edgeRepository.addEdge(workflowId, edge);
};

const addEdgesGRPC = async (workflowId, edges) => {
  await edgeRepository.addEdges(workflowId, edges);
};

const removeEdgeGRPC = async (workflowId, edgeId) => {
  await edgeRepository.removeEdge(workflowId, edgeId);
};

export default {
  getEdgeGRPC,
  getEdgesGRPC,
  addEdgeGRPC,
  addEdgesGRPC,
  removeEdgeGRPC,
};
