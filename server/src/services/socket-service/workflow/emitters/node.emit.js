import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";

export const addNodeEmit = (workflowId, node) => {
  console.log("add node emit", workflowId, node);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.NODE_ADD, node);
};

export const addNodesEmit = (workflowId, nodes) => {
  console.log("add nodes emit", workflowId, nodes);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.NODES_ADD, nodes);
};
export const removeNodeEmit = (workflowId, nodeId) => {
  console.log("remove node emit", workflowId, nodeId);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.NODE_REMOVE, nodeId);
};
export const updateNodeEmit = (workflowId, nodeId, nodeData) => {
  console.log("update node emit", workflowId, nodeId, nodeData);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.NODE_UPDATE, nodeId, nodeData);
};
