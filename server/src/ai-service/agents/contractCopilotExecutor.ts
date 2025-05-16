// ai-service/agents/contractCopilotAgent.ts
import { basicPrompt } from "@ai/prompts/basePrompt";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { extractLegalQuestionTool } from "@ai/tools/extractLegalQuestionsTool";
import llm from "@ai/llm/openRouterLLM";

const tools = [extractLegalQuestionTool];

export const createContractCopilotExecutor = async () => {
  const contractCopilotAgent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt: basicPrompt,
  });

  return new AgentExecutor({
    agent: contractCopilotAgent,
    tools,
  });
};
