import { nodeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";
import logger from "#configs/logger.js";

const nodeSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.NODE_ADD, (workflowId, node) => {
    nodeController.addNodeGRPC(workflowId, node);
    logger.info(WORKFLOW_EVENTS.NODES_ADD, workflowId, node);
  });

  socket.on(WORKFLOW_EVENTS.NODES_ADD, (workflowId, nodes) => {
    nodeController.addNodesGRPC(workflowId, nodes);
    logger.info(WORKFLOW_EVENTS.NODES_ADD, workflowId, nodes);
  });

  socket.on(WORKFLOW_EVENTS.NODE_REMOVE, (workflowId, nodeId) => {
    nodeController.removeNodeGRPC(workflowId, nodeId);
    logger.info(WORKFLOW_EVENTS.NODE_REMOVE, workflowId, nodeId);
  });

  socket.on(WORKFLOW_EVENTS.NODE_UPDATE, (workflowId, nodeId, nodeData) => {
    nodeController.updateNodeGRPC(workflowId, nodeId, nodeData);
    logger.info(WORKFLOW_EVENTS.NODE_UPDATE, workflowId, nodeId, nodeData);
  });
};

export default nodeSocket;
