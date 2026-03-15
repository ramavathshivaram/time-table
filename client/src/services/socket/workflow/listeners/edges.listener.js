import WORKFLOW_EVENTS from "../events.js";

import { getSocket } from "../../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";

const edgesListenerInit = () => {
  const socket = getSocket();

  socket.on(WORKFLOW_EVENTS.EDGE_ADD, (edge) => {
    console.log(WORKFLOW_EVENTS.EDGES_ADD, edge);

    useWorkflowStore.getState().addEdgeLocal(edge);
  });

  socket.on(WORKFLOW_EVENTS.EDGE_REMOVE, (edgeId) => {
    console.log(WORKFLOW_EVENTS.EDGE_REMOVE, edgeId);

    useWorkflowStore.getState().removeEdgeLocal(edgeId);
  });
};

export default edgesListenerInit;
