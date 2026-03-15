import WORKFLOW_EVENTS from "../events.js";

import { getSocket } from "../../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";

const nodesListenerInit = () => {
  const socket = getSocket();

  socket.on(WORKFLOW_EVENTS.NODE_ADD, (node) => {
    console.log(WORKFLOW_EVENTS.NODE_ADD, node);

    useWorkflowStore.getState().addNodeLocal(node);
  });
};

export default nodesListenerInit;
