import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";
import logger from "#configs/logger.js";

export const addEdgeEmit = (workflowId, edge) => {
  logger.info("add edge emit", workflowId, edge);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.EDGE_ADD, edge);
};

export const removeEdgeEmit = (workflowId, edgeId) => {
  logger.info("remove edge emit", workflowId, edgeId);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.EDGE_REMOVE, edgeId);
};
