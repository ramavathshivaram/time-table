import { ChatGroq } from "@langchain/groq";
import tools from "../workflow/tools/index.js";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
});

export const model = llm.bindTools(tools);
