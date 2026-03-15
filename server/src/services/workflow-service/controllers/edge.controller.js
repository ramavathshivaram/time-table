import edgeRepository from "../repositorys/edge.repository.js";

const addEdgeGRPC = async (workflowId, edge) => {
  await edgeRepository.addEdge(workflowId, edge);
};

const addEdgesGRPC = async (workflowId, edges) => {
  await edgeRepository.addEdges(workflowId, edges);
};

const removeEdgeGRPC = async (workflowId, edgeId) => {
  await edgeRepository.removeEdge(workflowId, edgeId);
};

export default { addEdgeGRPC, addEdgesGRPC, removeEdgeGRPC };
