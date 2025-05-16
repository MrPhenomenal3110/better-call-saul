import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
dotenv.config();

const llm = new ChatOpenAI({
  modelName: "openai/gpt-4o-mini",
  temperature: 0.7,
  openAIApiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

export default llm;
