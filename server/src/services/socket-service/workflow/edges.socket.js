import workflowGRPC from "../../workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../lib/const.js";

const edgeSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.EDGE_ADD, (workflowId, edge) => {
    workflowGRPC.addEdgeGRPC(workflowId, edge);
    console.log(WORKFLOW_EVENTS.EDGE_ADD, workflowId, edge);
  });

  socket.on(WORKFLOW_EVENTS.EDGES_ADD, (workflowId, edges) => {
    workflowGRPC.addEdgesGRPC(workflowId, edges);
    console.log(WORKFLOW_EVENTS.EDGES_ADD, workflowId, edges);
  });

  socket.on(WORKFLOW_EVENTS.EDGE_REMOVE, (workflowId, edgeId) => {
    workflowGRPC.removeEdgeGRPC(workflowId, edgeId);
    console.log(WORKFLOW_EVENTS.EDGE_REMOVE, workflowId, edgeId);
  });
};

export default edgeSocket;
