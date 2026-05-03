import logger from "#configs/logger.js";

const workflowSockets = new Map<string, string>(); // workflowId -> socketId
const socketWorkflows = new Map<string, string>(); // socketId -> workflowId

const add = (workflowId: string, socketId: string): void => {
  logger.info("workflow socket", { workflowId, socketId });

  workflowSockets.set(workflowId, socketId);
  socketWorkflows.set(socketId, workflowId);
};

const remove = (socketId: string): void => {
  const workflowId = socketWorkflows.get(socketId);
  if (!workflowId) return;

  workflowSockets.delete(workflowId);
  socketWorkflows.delete(socketId);
};

const getSocket = (workflowId: string): string | undefined => {
  return workflowSockets.get(workflowId);
};

const getWorkflow = (socketId: string): string | undefined => {
  return socketWorkflows.get(socketId);
};

export default { add, remove, getSocket, getWorkflow };
