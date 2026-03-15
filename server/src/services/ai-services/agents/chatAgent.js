import { createAgent } from "langchain";
import groqLlm from "../llms/groq.llm.js";
import workflowTools from "../tools/workflow/index.js";

const chatAgent = createAgent({
  model: groqLlm,
  tools: workflowTools,
  verbose: true,
  maxExecutionTime: 15000,
});

export default chatAgent;
