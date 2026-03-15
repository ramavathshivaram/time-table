import { createAgent } from "langchain";
import groqLlm from "../llms/groq.llm.js";
import workflowTools from "../tools/workflow/index.js";

const chatAgent = createAgent({
  model: groqLlm,
  tools: workflowTools
});

export default chatAgent;
