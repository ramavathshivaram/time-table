const workflows = new Map(); // workflowId -> Set(socketIds)
const sockets = new Map(); // socketId -> workflowId

export const addWorkflowSocket = (workflowId, socketId) => {
  if (!workflows.has(workflowId)) {
    workflows.set(workflowId, new Set());
  }

  workflows.get(workflowId).add(socketId);
  sockets.set(socketId, workflowId);
};

export const removeWorkflowSocket = (socketId) => {
  const workflowId = sockets.get(socketId);
  if (!workflowId) return;

  const set = workflows.get(workflowId);
  if (set) {
    set.delete(socketId);

    if (set.size === 0) {
      workflows.delete(workflowId);
    }
  }

  sockets.delete(socketId);
};

export const getWorkflowSockets = (workflowId) => {
  return workflows.get(workflowId) || new Set();
};

export const getWorkflowIdBySocket = (socketId) => {
  return sockets.get(socketId);
};

