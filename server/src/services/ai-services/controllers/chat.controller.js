import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import chatAgent from "../agents/chatAgent.js";
import SYSTEM_PROMPT from "../prompts/system.prompt.js";

export const chat = async (workflowId, message) => {
  try {
    const response = await chatAgent.invoke({
      messages: [
        new SystemMessage(SYSTEM_PROMPT({ workflowId })),
        new HumanMessage(message),
      ],
    });

    const lastMessage = response.messages?.at(-1);

    if (!lastMessage) {
      return "No response generated.";
    }

    return lastMessage.content;
  } catch (error) {
    console.error("Chat error:", error);

    return "An error occurred while processing the request.";
  }
};

export default { chat };
