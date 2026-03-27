import WORKFLOW_EVENTS from "../events.js";
import { getSocket } from "../../socket.js";

const socket = getSocket();

const logEmit = (event, payload) => {
  console.group(`📡 SOCKET EMIT: ${event}`);
  console.log("payload:", payload);
  console.log("time:", new Date().toISOString());
  console.groupEnd();
};

export const addNodeEmit = (node) => {
  logEmit(WORKFLOW_EVENTS.NODE_ADD, node);
  socket.emit(WORKFLOW_EVENTS.NODE_ADD, node);
};

export const removeNodeEmit = (workflowId, nodeId) => {
  logEmit(WORKFLOW_EVENTS.NODE_REMOVE, nodeId);
  socket.emit(WORKFLOW_EVENTS.NODE_REMOVE, workflowId, nodeId);
};

export const addNodesEmit = (workflowId, nodes) => {
  logEmit(WORKFLOW_EVENTS.NODES_ADD, nodes);
  socket.emit(WORKFLOW_EVENTS.NODES_ADD, workflowId, nodes);
};

export const removeNodesEmit = (workflowId, nodeIds) => {
  logEmit(WORKFLOW_EVENTS.NODES_REMOVE, nodeIds);
  socket.emit(WORKFLOW_EVENTS.NODES_REMOVE, workflowId, nodeIds);
};

export const updateNodeEmit = (workflowId, nodeId, nodeData) => {
  logEmit(WORKFLOW_EVENTS.NODE_UPDATE, nodeData);
  socket.emit(WORKFLOW_EVENTS.NODE_UPDATE, workflowId, nodeId, nodeData);
};
