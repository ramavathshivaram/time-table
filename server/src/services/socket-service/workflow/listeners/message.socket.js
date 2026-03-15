import chat from "#services/ai-services/routes/chat.grpc.js";
import { messageController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const messageSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.MESSAGE_SEND, async (workflowId, message) => {
    messageController.sendMessageGRPC(workflowId, message);

    console.log(WORKFLOW_EVENTS.MESSAGE_SEND, workflowId, message);

    const response = await chat.chatGRPC(workflowId, message);

    console.log("response", response);

    if (response) {
      socket.emit(WORKFLOW_EVENTS.MESSAGE_RESPONSE, {
        role: "assistant",
        content: response,
      });

      messageController.sendMessageGRPC(workflowId, {
        role: "assistant",
        content: response,
      });
    }
  });
};

export default messageSocket;
