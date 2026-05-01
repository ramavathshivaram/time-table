import aiService from "#services/ai-services/routes/conversation.grpc.js";
import { messageController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const messageSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.MESSAGE_SEND, async (message) => {
    messageController.addMessageGRPC(socket.workflowId, message);

    await aiService.conversation(socket.workflowId, message);
  });

  socket.on(WORKFLOW_EVENTS.MESSAGE_GET_ALL, async (page, limit, callback) => {
    const { messages, hasMore } = await messageController.getAllMessagesGRPC(
      socket.workflowId,
      page,
      limit,
    );
    callback(messages, hasMore);
  });
};

export default messageSocket;
