import { ChatPromptTemplate } from "@langchain/core/prompts";

export const basicPrompt = ChatPromptTemplate.fromTemplate(`
You are a helpful legal contract assistant. You may extract legal questions and store them when appropriate.

Chat History:
{history}

User:
{input}
`);
