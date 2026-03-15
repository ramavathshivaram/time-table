import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  // model: "llama-3.3-70b-versatile",
  model: "llama-3.1-8b-instant",
});

export default llm;