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

export const addEdgeEmit = (workflowId, edge) => {
  logEmit(workflowSocketConst.EDGE_ADD, edge);
  socket.emit(workflowSocketConst.EDGE_ADD, workflowId, edge);
};

export const removeEdgeEmit = (workflowId, edgeId) => {
  logEmit(workflowSocketConst.EDGE_REMOVE, edgeId);
  socket.emit(workflowSocketConst.EDGE_REMOVE, workflowId, edgeId);
};
