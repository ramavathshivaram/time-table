import chat from "../../ai-services/routes/chat.grpc.js";
import { WORKFLOW_EVENTS } from "../lib/const.js";

const messageSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.MESSAGE_SEND, async (workflowId, message) => {
    workflowGRPC.sendMessageGRPC(workflowId, message);

    console.log(WORKFLOW_EVENTS.MESSAGE_SEND, workflowId, message);

    await chat.chatGRPC(workflowId, message);

    socket.emit(WORKFLOW_EVENTS.MESSAGE_RESPONSE, message);
  });
};

export default messageSocket;
