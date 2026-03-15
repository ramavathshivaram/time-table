import WORKFLOW_EVENTS from "../events.js";
import { getSocket } from "../../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";

const messageListenerInit = () => {
  const socket = getSocket();

  socket.on(WORKFLOW_EVENTS.MESSAGE_RESPONSE, (response) => {
    console.log(WORKFLOW_EVENTS.MESSAGE_RESPONSE, response);

    useWorkflowStore.getState().responseMessage(response);
  });
};

export default messageListenerInit;
