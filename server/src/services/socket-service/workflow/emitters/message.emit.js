import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";
import logger from "#configs/logger.js";

export const addMessageEmit = (workflowId, message) => {
  logger.info("add message emit", workflowId, message);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.MESSAGE_RESPONSE, {
    role: "assistant",
    content: message,
  });
};
