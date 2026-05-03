import { edgeController } from "#services/workflow-service/routes/workflow.grpc.js";
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
    edgeController.addEdgeGRPC(workflowId, edge);
  });

  socket.on(EDGE.ADD_MANY, (edges) => {
    edgeController.addEdgesGRPC(workflowId, edges);
  });

  socket.on(EDGE.REMOVE, (edgeId) => {
    edgeController.removeEdgeGRPC(workflowId, edgeId);
  });

  socket.on(EDGE.UPDATE, (edgeId, edgeData) => {
    edgeController.updateEdgeGRPC(workflowId, edgeId, edgeData);
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
