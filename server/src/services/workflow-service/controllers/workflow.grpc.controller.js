import workflowRepository from "../repositorys/workflow.repository.js";

export const addNodeGRPC = async (workflowId, node) => {
  await workflowRepository.addNode(workflowId, node);
};

export const addNodesGRPC = async (workflowId, nodes) => {
  await workflowRepository.addNodes(workflowId, nodes);
};

export const removeNodeGRPC = async (workflowId, nodeId) => {
  await workflowRepository.removeNode(workflowId, nodeId);
};

export const updateNodeGRPC = async (workflowId, nodeId, nodeData) => {
  await workflowRepository.updateNode(workflowId, nodeId, nodeData);
};

export const addEdgeGRPC = async (workflowId, edge) => {
  await workflowRepository.addEdge(workflowId, edge);
};

export const addEdgesGRPC = async (workflowId, edges) => {
  await workflowRepository.addEdges(workflowId, edges);
};

export const removeEdgeGRPC = async (workflowId, edgeId) => {
  await workflowRepository.removeEdge(workflowId, edgeId);
};

export const addFacultyGRPC = async (workflowId, faculty) => {
  await workflowRepository.addFaculty(workflowId, faculty);
};

export const removeFacultyGRPC = async (workflowId, faculty) => {
  await workflowRepository.removeFaculty(workflowId, faculty);
};

export const updateFacultyGRPC = async (
  workflowId,
  facultyId,
  facultyData,
) => {
  await workflowRepository.updateFaculty(
    workflowId,
    facultyId,
    facultyData,
  );
};
