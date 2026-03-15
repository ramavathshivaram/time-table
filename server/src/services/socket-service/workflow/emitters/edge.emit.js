import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";

export const addEdgeEmit = (workflowId, edge) => {
  console.log("add edge emit", workflowId, edge);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.EDGE_ADD, edge);
};

export const removeEdgeEmit = (workflowId, edgeId) => {
  console.log("remove edge emit", workflowId, edgeId);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.EDGE_REMOVE, edgeId);
};
