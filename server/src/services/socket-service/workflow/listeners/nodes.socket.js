import { nodeController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const nodeSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.NODE_ADD, (node) => {
    nodeController.addNodeGRPC(socket.workflowId, node);
  });

  socket.on(WORKFLOW_EVENTS.NODES_ADD, (nodes) => {
    nodeController.addNodesGRPC(socket.workflowId, nodes);
  });

  socket.on(WORKFLOW_EVENTS.NODE_REMOVE, (nodeId) => {
    nodeController.removeNodeGRPC(socket.workflowId, nodeId);
  });

  socket.on(WORKFLOW_EVENTS.NODE_UPDATE, (nodeId, nodeData) => {
    nodeController.updateNodeGRPC(socket.workflowId, nodeId, nodeData);
  });
};

export default nodeSocket;
