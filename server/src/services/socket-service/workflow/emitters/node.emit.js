import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";

export const addNodeEmit = (workflowId, node) => {
  console.log("add node emit", workflowId, node);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.NODE_ADD, node);
};

export const removeNodeEmit = () => {};
