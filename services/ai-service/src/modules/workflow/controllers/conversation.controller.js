import graph from "../graph.js";
import { HumanMessage } from "@langchain/core/messages";

const conversationController = async (workflowId, message) => {
  try {
    const result = await graph.invoke(
      {
        messages: [new HumanMessage(message)],
      },
      // {
      //   configurable: {
      //     thread_id: workflowId,
      //   },
      // },
    );

    console.log("ai graph result", result);
  } catch (error) {
    console.log(error);
  }
};

export default conversationController;
