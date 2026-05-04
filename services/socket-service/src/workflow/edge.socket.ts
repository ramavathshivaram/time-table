import edgeApi from "#services/edge.api.js";
import { EDGE } from "./events.js";
import type { Socket } from "socket.io";
import logger from "#configs/logger.js";
import emitToWorkflow from "./emit-to-workflow.js";

interface SocketData {
  workflowId: string;
}

type WorkflowSocket = Socket<{}, {}, {}, SocketData>;

export const registerEdgeHandlers = (socket: WorkflowSocket) => {
  const workflowId = socket.data.workflowId;
  if (!workflowId) return;

  socket.on(EDGE.ADD, (edge) => {
    edgeApi.addEdge(workflowId, edge);
  });

  socket.on(EDGE.ADD_MANY, (edges) => {
    edgeApi.addEdges(workflowId, edges);
  });

  socket.on(EDGE.REMOVE, (edgeId) => {
    edgeApi.removeEdge(edgeId);
  });

  socket.on(EDGE.UPDATE, (edgeId, edgeData) => {
    edgeApi.updateEdge(edgeId, edgeData);
  });
};

export const edgeEmitter = {
  add(workflowId: string, edge: any) {
    logger.info("emit edge add", { workflowId });
    emitToWorkflow(workflowId, EDGE.ADD, edge);
  },

  addMany(workflowId: string, edges: any[]) {
    emitToWorkflow(workflowId, EDGE.ADD_MANY, edges);
  },

  remove(workflowId: string, edgeId: string) {
    emitToWorkflow(workflowId, EDGE.REMOVE, edgeId);
  },

  update(workflowId: string, edgeId: string, edgeData: any) {
    emitToWorkflow(workflowId, EDGE.UPDATE, edgeId, edgeData);
  },
};
