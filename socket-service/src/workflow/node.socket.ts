import { nodeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { NODE } from "./events.js";
import type { Socket } from "socket.io";
import logger from "#configs/logger.js";
import emitToWorkflow from "./emit-to-workflow.js";

interface SocketData {
  workflowId: string;
}

type WorkflowSocket = Socket<{}, {}, {}, SocketData>;

export const registerNodeHandlers = (socket: WorkflowSocket) => {
  const workflowId = socket.data.workflowId;
  if (!workflowId) return;

  socket.on(NODE.ADD, (node) => {
    nodeController.addNodeGRPC(workflowId, node);
  });

  socket.on(NODE.ADD_MANY, (nodes) => {
    nodeController.addNodesGRPC(workflowId, nodes);
  });

  socket.on(NODE.REMOVE, (nodeId) => {
    nodeController.removeNodeGRPC(workflowId, nodeId);
  });

  socket.on(NODE.UPDATE, (nodeId, nodeData) => {
    nodeController.updateNodeGRPC(workflowId, nodeId, nodeData);
  });
};

export const nodeEmitter = {
  add(workflowId: string, node: any) {
    logger.info("emit node add", { workflowId });
    emitToWorkflow(workflowId, NODE.ADD, node);
  },

  addMany(workflowId: string, nodes: any[]) {
    emitToWorkflow(workflowId, NODE.ADD_MANY, nodes);
  },

  remove(workflowId: string, nodeId: string) {
    emitToWorkflow(workflowId, NODE.REMOVE, nodeId);
  },

  update(workflowId: string, nodeId: string, nodeData: any) {
    emitToWorkflow(workflowId, NODE.UPDATE, nodeId, nodeData);
  },
};
