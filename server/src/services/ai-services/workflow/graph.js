import {
  StateSchema,
  MessagesValue,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";
import checkpointer from "./libs/checkpointer.js";
import llmCall from "./nodes/llmCall.js";
import toolNode from "./nodes/toolNode.js";
import shouldContinue from "./nodes/shouldContinue.js";

const State = new StateSchema({
  messages: MessagesValue,
});

const graph = new StateGraph(State);

graph.addNode("llmCall", llmCall);
graph.addNode("toolNode", toolNode);
graph.addEdge(START, "llmCall");
graph.addConditionalEdges("llmCall", shouldContinue, ["toolNode", END]);
graph.addEdge("toolNode", "llmCall");

const compiledGraph = graph.compile({
  // checkpointer,
});

export default compiledGraph;
