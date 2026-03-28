import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import chatAgent from "../agents/chatAgent.js";
import SYSTEM_PROMPT from "../prompts/system.prompt.js";
import logger from "#configs/logger.js";
import { addMessageEmit } from "#services/socket-service/workflow/emitters/message.emit.js";
import messageController from "#services/workflow-service/controllers/message.controller.js";

export const chat = async (workflowId, message) => {
  try {
    logger.info("chat called", { workflowId, message });
    const response = await chatAgent.invoke({
      messages: [
        new SystemMessage(SYSTEM_PROMPT({ workflowId })),
        new HumanMessage(message),
      ],
    });

    const lastMessage = response.messages?.at(-1);

    if (!lastMessage) {
      addMessageEmit(workflowId, "No response generated.");
      return;
    }

    addMessageEmit(workflowId, lastMessage.content);

    messageController.addMessageGRPC(workflowId, {
      role: "assistant",
      content: lastMessage.content,
    });
    logger.info("chat response", { workflowId, response: lastMessage.content });
  } catch (error) {
    logger.error("Chat error:", error);

    return "An error occurred while processing the request.";
  }
};

export default { chat };
