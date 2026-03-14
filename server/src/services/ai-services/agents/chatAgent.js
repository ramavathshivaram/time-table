import { createAgent } from "langchain";
import groqLlm from "../llms/groq.llm.js";

const chatAgent = createAgent({
  model: groqLlm,
});

export default chatAgent;
