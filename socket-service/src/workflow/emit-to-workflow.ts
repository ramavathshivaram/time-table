import logger from "#configs/logger.js";
import { getIo } from "../socket.js";
import workflowSocketStore from "./workflow.socket.store.js";

const emitToWorkflow = (workflowId: string, event: string, ...args: any[]) => {
  const io = getIo();
  if (!io) {
    logger.warn("No socket found", { workflowId, event });
    return;
  }

  const socketId = workflowSocketStore.getSocket(workflowId);

  if (!socketId) {
    logger.warn("No socket found", { workflowId, event });
    return;
  }

  io.to(socketId).emit(event, ...args);
};

export default emitToWorkflow;