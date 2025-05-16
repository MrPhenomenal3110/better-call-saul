import llm from "@ai/llm/openRouterLLM";
import { basicPrompt } from "@ai/prompts/basePrompt";
import { getMemory } from "../memory/redisMemory";
import { RunnableSequence } from "@langchain/core/runnables";

export const createChatChain = (sessionId: string) => {
  const memory = getMemory(sessionId);

  const chain = RunnableSequence.from([
    {
      input: (input: any) => input.input,
      memory: async () => memory.loadMemoryVariables({}),
    },
    {
      input: (prev: any) => prev.input,
      history: (prev: any) => prev.memory.history,
    },
    basicPrompt,
    llm,
  ]);

  return { chain, memory };
};
