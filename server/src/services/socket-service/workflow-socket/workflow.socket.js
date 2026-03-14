import workflowGRPC from "../../workflow-service/routes/workflow.grpc.js";
import { workflowSocketConst } from "../lib/const.js";

const workflowSocketInit = (io, socket) => {
  socket.on(workflowSocketConst.NODE_ADD, (workflowId, node) => {
    workflowGRPC.addNodeGRPC(workflowId, node);
    console.log(workflowSocketConst.NODES_ADD, workflowId, node);
  });

  socket.on(workflowSocketConst.NODE_REMOVE, (workflowId, nodeId) => {
    workflowGRPC.removeNodeGRPC(workflowId, nodeId);
    console.log(workflowSocketConst.NODE_REMOVE, workflowId, nodeId);
  });

  socket.on(workflowSocketConst.EDGE_ADD, (workflowId, edge) => {
    workflowGRPC.addEdgeGRPC(workflowId, edge);
    console.log(workflowSocketConst.EDGE_ADD, workflowId, edge);
  });

  socket.on(workflowSocketConst.EDGE_REMOVE, (workflowId, edgeId) => {
    workflowGRPC.removeEdgeGRPC(workflowId, edgeId);
    console.log(workflowSocketConst.EDGE_REMOVE, workflowId, edgeId);
  });
};

export default workflowSocketInit;
