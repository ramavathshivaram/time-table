import { SystemMessage } from "@langchain/core/messages";
import { model } from "../llms.js";

const llmCall = async (state) => {
  const response = await model.invoke([
    new SystemMessage(
      "You are a helpful assistant tasked with performing arithmetic on a set of inputs.",
    ),
    ...state.messages,
  ]);
  return {
    messages: [response],
    llmCalls: 1,
  };
};

export default llmCall;
