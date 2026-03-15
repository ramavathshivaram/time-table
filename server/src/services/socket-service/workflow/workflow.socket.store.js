const workflows = new Map(); // workflowId -> socketId
const sockets = new Map();   // socketId -> workflowId

export const addWorkflowSocket = (workflowId, socketId) => {
  workflows.set(workflowId, socketId);
  sockets.set(socketId, workflowId);
};

export const removeWorkflowSocket = (socketId) => {
  const workflowId = sockets.get(socketId);
  if (!workflowId) return;

  workflows.delete(workflowId);
  sockets.delete(socketId);
};

export const getWorkflowSocket = (workflowId) => {
  return workflows.get(workflowId);
};

export const getWorkflowIdBySocket = (socketId) => {
  return sockets.get(socketId);
};