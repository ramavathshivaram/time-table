import chat from "#services/ai-services/routes/chat.grpc.js";
import { messageController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";
import logger from "#configs/logger.js";

const messageSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.MESSAGE_SEND, async (message) => {
    messageController.addMessageGRPC(socket.workflowId, message);

    logger.info(WORKFLOW_EVENTS.MESSAGE_SEND, socket.workflowId, message);

    await chat.chatGRPC(socket.workflowId, message);
  });
};

export default messageSocket;
