import { nodeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const nodeSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.NODE_ADD, (workflowId, node) => {
    nodeController.addNodeGRPC(workflowId, node);
    console.log(WORKFLOW_EVENTS.NODES_ADD, workflowId, node);
  });

  socket.on(WORKFLOW_EVENTS.NODES_ADD, (workflowId, nodes) => {
    nodeController.addNodesGRPC(workflowId, nodes);
    console.log(WORKFLOW_EVENTS.NODES_ADD, workflowId, nodes);
  });

  socket.on(WORKFLOW_EVENTS.NODE_REMOVE, (workflowId, nodeId) => {
    nodeController.removeNodeGRPC(workflowId, nodeId);
    console.log(WORKFLOW_EVENTS.NODE_REMOVE, workflowId, nodeId);
  });

  socket.on(WORKFLOW_EVENTS.NODE_UPDATE, (workflowId, nodeId, nodeData) => {
    nodeController.updateNodeGRPC(workflowId, nodeId, nodeData);
    console.log(WORKFLOW_EVENTS.NODE_UPDATE, workflowId, nodeId, nodeData);
  });
};

export default nodeSocket;
