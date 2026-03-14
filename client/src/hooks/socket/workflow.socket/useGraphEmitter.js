import { workflowSocketConst } from "@/lib/constants/events.js";
import { getSocket } from "../socket.js";

const socket = getSocket();

const logEmit = (event, payload) => {
  console.group(`📡 SOCKET EMIT: ${event}`);
  console.log("payload:", payload);
  console.log("time:", new Date().toISOString());
  console.groupEnd();
};

export const addNodeEmit = (workflowId, node) => {
  logEmit(workflowSocketConst.NODE_ADD, node);
  socket.emit(workflowSocketConst.NODE_ADD, workflowId, node);
};

export const removeNodeEmit = (workflowId, nodeId) => {
  logEmit(workflowSocketConst.NODE_REMOVE, nodeId);
  socket.emit(workflowSocketConst.NODE_REMOVE, workflowId, nodeId);
};

export const addNodesEmit = (workflowId, nodes) => {
  logEmit(workflowSocketConst.NODES_ADD, nodes);
  socket.emit(workflowSocketConst.NODES_ADD, workflowId, nodes);
};

export const removeNodesEmit = (workflowId, nodeIds) => {
  logEmit(workflowSocketConst.NODES_REMOVE, nodeIds);
  socket.emit(workflowSocketConst.NODES_REMOVE, workflowId, nodeIds);
};

export const updateNodeEmit = (workflowId, nodeId, nodeData) => {
  logEmit(workflowSocketConst.NODE_UPDATE, nodeData);
  socket.emit(workflowSocketConst.NODE_UPDATE, workflowId, nodeId, nodeData);
};

export const addEdgeEmit = (workflowId, edge) => {
  logEmit(workflowSocketConst.EDGE_ADD, edge);
  socket.emit(workflowSocketConst.EDGE_ADD, workflowId, edge);
};

export const removeEdgeEmit = (workflowId, edgeId) => {
  logEmit(workflowSocketConst.EDGE_REMOVE, edgeId);
  socket.emit(workflowSocketConst.EDGE_REMOVE, workflowId, edgeId);
};

export const addEdgesEmit = (workflowId, edges) => {
  logEmit(workflowSocketConst.EDGES_ADD, edges);
  socket.emit(workflowSocketConst.EDGES_ADD, workflowId, edges);
};

export const removeEdgesEmit = (workflowId, edgeIds) => {
  logEmit(workflowSocketConst.EDGES_REMOVE, edgeIds);
  socket.emit(workflowSocketConst.EDGES_REMOVE, workflowId, edgeIds);
};

//! FACULTIES

export const addFacultyEmit = (workflowId, faculty) => {
  logEmit(workflowSocketConst.FACULTY_ADD, faculty);
  socket.emit(workflowSocketConst.FACULTY_ADD, workflowId, faculty);
};

export const removeFacultyEmit = (workflowId, facultyId) => {
  logEmit(workflowSocketConst.FACULTY_REMOVE, facultyId);
  socket.emit(workflowSocketConst.FACULTY_REMOVE, workflowId, facultyId);
};

export const updateFacultyEmit = (workflowId, facultyId, facultyData) => {
  logEmit(workflowSocketConst.FACULTY_UPDATE, facultyData);
  socket.emit(
    workflowSocketConst.FACULTY_UPDATE,
    workflowId,
    facultyId,
    facultyData,
  );
};

//! SUBJECTS

export const addSubjectEmit = (workflowId, subject) => {
  logEmit(workflowSocketConst.SUBJECT_ADD, subject);
  socket.emit(workflowSocketConst.SUBJECT_ADD, workflowId, subject);
};

export const removeSubjectEmit = (workflowId, subjectId) => {
  logEmit(workflowSocketConst.SUBJECT_REMOVE, subjectId);
  socket.emit(workflowSocketConst.SUBJECT_REMOVE, workflowId, subjectId);
};

export const updateSubjectEmit = (workflowId, subjectId, subjectData) => {
  logEmit(workflowSocketConst.SUBJECT_UPDATE, subjectData);
  socket.emit(
    workflowSocketConst.SUBJECT_UPDATE,
    workflowId,
    subjectId,
    subjectData,
  );
};

//! ROOMS

export const addRoomEmit = (workflowId, room) => {
  logEmit(workflowSocketConst.ROOM_ADD, room);
  socket.emit(workflowSocketConst.ROOM_ADD, workflowId, room);
};

export const removeRoomEmit = (workflowId, roomId) => {
  logEmit(workflowSocketConst.ROOM_REMOVE, roomId);
  socket.emit(workflowSocketConst.ROOM_REMOVE, workflowId, roomId);
};

export const updateRoomEmit = (workflowId, roomId, roomData) => {
  logEmit(workflowSocketConst.ROOM_UPDATE, roomData);
  socket.emit(workflowSocketConst.ROOM_UPDATE, workflowId, roomId, roomData);
};
