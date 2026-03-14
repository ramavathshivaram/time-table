import workflowGRPC from "../../workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../lib/const.js";

const nodeSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.NODE_ADD, (workflowId, node) => {
    workflowGRPC.addNodeGRPC(workflowId, node);
    console.log(WORKFLOW_EVENTS.NODES_ADD, workflowId, node);
  });

  socket.on(WORKFLOW_EVENTS.NODES_ADD, (workflowId, nodes) => {
    workflowGRPC.addNodesGRPC(workflowId, nodes);
    console.log(WORKFLOW_EVENTS.NODES_ADD, workflowId, nodes);
  });

  socket.on(WORKFLOW_EVENTS.NODE_REMOVE, (workflowId, nodeId) => {
    workflowGRPC.removeNodeGRPC(workflowId, nodeId);
    console.log(WORKFLOW_EVENTS.NODE_REMOVE, workflowId, nodeId);
  });

  socket.on(WORKFLOW_EVENTS.NODE_UPDATE, (workflowId, nodeId, nodeData) => {
    workflowGRPC.updateNodeGRPC(workflowId, nodeId, nodeData);
    console.log(WORKFLOW_EVENTS.NODE_UPDATE, workflowId, nodeId, nodeData);
  });
};

export default nodeSocket;
