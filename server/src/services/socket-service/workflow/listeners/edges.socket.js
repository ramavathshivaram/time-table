import { edgeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const edgeSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.EDGE_ADD, (workflowId, edge) => {
    edgeController.addEdgeGRPC(workflowId, edge);
    console.log(WORKFLOW_EVENTS.EDGE_ADD, workflowId, edge);
  });

  socket.on(WORKFLOW_EVENTS.EDGES_ADD, (workflowId, edges) => {
    edgeController.addEdgesGRPC(workflowId, edges);
    console.log(WORKFLOW_EVENTS.EDGES_ADD, workflowId, edges);
  });

  socket.on(WORKFLOW_EVENTS.EDGE_REMOVE, (workflowId, edgeId) => {
    edgeController.removeEdgeGRPC(workflowId, edgeId);
    console.log(WORKFLOW_EVENTS.EDGE_REMOVE, workflowId, edgeId);
  });
};

export default edgeSocket;
