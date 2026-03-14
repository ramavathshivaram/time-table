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

export const updateFacultyGRPC = async (workflowId, facultyId, facultyData) => {
  await workflowRepository.updateFaculty(workflowId, facultyId, facultyData);
};

export const addSubjectGRPC = async (workflowId, subject) => {
  await workflowRepository.addSubject(workflowId, subject);
};

export const removeSubjectGRPC = async (workflowId, subject) => {
  await workflowRepository.removeSubject(workflowId, subject);
};

export const updateSubjectGRPC = async (workflowId, subjectId, subjectData) => {
  await workflowRepository.updateSubject(workflowId, subjectId, subjectData);
};

export const addRoomGRPC = async (workflowId, room) => {
  await workflowRepository.addRoom(workflowId, room);
};

export const removeRoomGRPC = async (workflowId, room) => {
  await workflowRepository.removeRoom(workflowId, room);
};

export const updateRoomGRPC = async (workflowId, roomId, roomData) => {
  await workflowRepository.updateRoom(workflowId, roomId, roomData);
};

export const sendMessageGRPC = async (workflowId, message) => {
  await workflowRepository.sendMessage(workflowId, message);
};
