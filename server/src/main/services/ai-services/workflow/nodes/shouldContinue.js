import { END } from "@langchain/langgraph";
import { AIMessage } from "langchain";

const shouldContinue = (state) => {
  const lastMessage = state.messages.at(-1);

  if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
    return END;
  }

  if (lastMessage.tool_calls?.length) {
    return "toolNode";
  }

  return END;
};

export default shouldContinue;