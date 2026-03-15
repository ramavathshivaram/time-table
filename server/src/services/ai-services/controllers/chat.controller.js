import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import chatAgent from "../agents/chatAgent.js";
import SYSTEM_PROMPT from "../prompts/system.prompt.js";

export const chat = async (workflowId, message) => {
  const response = await chatAgent.invoke({
    messages: [
      new SystemMessage(SYSTEM_PROMPT({ workflowId })),
      new HumanMessage(message),
    ],
  });

  const aiMessage = response.messages[response.messages.length - 1];

  return aiMessage.content;
};

export default { chat };