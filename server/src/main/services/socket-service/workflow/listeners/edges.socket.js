import { edgeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const edgeSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.EDGE_ADD, (edge) => {
    edgeController.addEdgeGRPC(socket.workflowId, edge);
  });

  socket.on(WORKFLOW_EVENTS.EDGES_ADD, (edges) => {
    edgeController.addEdgesGRPC(socket.workflowId, edges);
  });

  socket.on(WORKFLOW_EVENTS.EDGE_REMOVE, (edgeId) => {
    edgeController.removeEdgeGRPC(socket.workflowId, edgeId);
  });
};

export default edgeSocket;
