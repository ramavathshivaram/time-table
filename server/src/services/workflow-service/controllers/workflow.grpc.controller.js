import workflowRepository from "../repositorys/workflow.repository.js";

export const addNodeGRPC = async (workflowId, node) => {
  await workflowRepository.addNode(workflowId, node);
};

export const removeNodeGRPC = async (workflowId, nodeId) => {
  await workflowRepository.removeNode(workflowId, nodeId);
};

export const addEdgeGRPC = async (workflowId, edge) => {
  await workflowRepository.addEdge(workflowId, edge);
};

export const removeEdgeGRPC = async (workflowId, edgeId) => {
  await workflowRepository.removeEdge(workflowId, edgeId);
};