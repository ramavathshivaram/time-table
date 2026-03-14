import { HumanMessage } from "langchain";
import chatAgent from "../agents/chatAgent.js";

export const chat = async (workflowId, message) => {
  const response = await chatAgent.invoke({
    messages: [new HumanMessage(message)],
  });
  console.log(response);
};

export default { chat };
