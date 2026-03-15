import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSockets } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";

export const addNodeEmit = (workflowId, node) => {
  console.log("add node emit", workflowId, node);
  const io = getIo();
  const sockets = getWorkflowSockets(workflowId);
  console.log(sockets)
  sockets.forEach((socketId) => {
    io.to(socketId).emit(WORKFLOW_EVENTS.NODE_ADD, node);
  });
};

export const removeNodeEmit = () => {};
