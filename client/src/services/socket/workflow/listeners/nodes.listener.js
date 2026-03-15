import WORKFLOW_EVENTS from "../events.js";

import { getSocket } from "../../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";

const nodesListenerInit = () => {
  const socket = getSocket();

  socket.on(WORKFLOW_EVENTS.NODE_ADD, (node) => {
    console.log(WORKFLOW_EVENTS.NODE_ADD, node);

    useWorkflowStore.getState().addNodeLocal(node);
  });

  socket.on(WORKFLOW_EVENTS.NODE_REMOVE, (nodeId) => {
    console.log(WORKFLOW_EVENTS.NODE_REMOVE, nodeId);

    useWorkflowStore.getState().removeNodeLocal(nodeId);
  });

  socket.on(WORKFLOW_EVENTS.NODE_UPDATE, (nodeId, nodeData) => {
    console.log(WORKFLOW_EVENTS.NODE_UPDATE, nodeId, nodeData);

    useWorkflowStore.getState().updateNodeLocal(nodeId, nodeData);
  });

  socket.on(WORKFLOW_EVENTS.NODES_ADD, (nodes) => {
    console.log(WORKFLOW_EVENTS.NODES_ADD, nodes);

    useWorkflowStore.getState().addNodesLocal(nodes);
  });
};

export default nodesListenerInit;
