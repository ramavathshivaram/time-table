import { edgeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";
import logger from "#configs/logger.js";

const edgeSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.EDGE_ADD, (workflowId, edge) => {
    edgeController.addEdgeGRPC(workflowId, edge);
    logger.info(WORKFLOW_EVENTS.EDGE_ADD, workflowId, edge);
  });

  socket.on(WORKFLOW_EVENTS.EDGES_ADD, (workflowId, edges) => {
    edgeController.addEdgesGRPC(workflowId, edges);
    logger.info(WORKFLOW_EVENTS.EDGES_ADD, workflowId, edges);
  });

  socket.on(WORKFLOW_EVENTS.EDGE_REMOVE, (workflowId, edgeId) => {
    edgeController.removeEdgeGRPC(workflowId, edgeId);
    logger.info(WORKFLOW_EVENTS.EDGE_REMOVE, workflowId, edgeId);
  });
};

export default edgeSocket;
