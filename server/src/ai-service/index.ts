import { prepareMessages } from "./getMessages";
import { getTools } from "./toolRegistry";
import { handleToolCalls } from "./toolHandler";
import { getChatHistory } from "./getChatHistory";
import { getDocumentContext } from "./getDocumentContext";
import { saveMessage } from "@ai/utils/saveMessage";
import { AsyncLocalStorageProviderSingleton } from "@langchain/core/singletons";
import { setContext } from "@ai/tools/context";

import llm from "@ai/llm/openRouterLLM";
import { classifyIntents } from "./utils/classifyIntent";
import { PromptStrategyType } from "@models/promptStrategy";

export const invokeChat = async ({
  input,
  sessionId,
  userId,
  contractId,
}: {
  input: string;
  sessionId: number;
  userId: number;
  contractId?: number;
}) => {
  return await AsyncLocalStorageProviderSingleton.runWithConfig(
    {},
    async () => {
      setContext({ userId, sessionId });

      const intents = await classifyIntents(input);
      const allTools = getTools(userId);
      const tools = allTools.filter((tool) =>
        intents.includes(tool.name as PromptStrategyType)
      );
      const toolMapping = Object.fromEntries(tools.map((t) => [t.name, t]));
      const llmWithTools = llm.bindTools(tools);

      const [history, docContext] = await Promise.all([
        getChatHistory(input, sessionId),
        getDocumentContext(input, sessionId),
      ]);

      const messages = await prepareMessages({
        input,
        history,
        docContext,
        intents,
      });

      console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG", contractId);

      if (contractId) {
        await saveMessage({
          conversationId: sessionId,
          sender: "USER_FILE_UPLOAD",
          content: input,
          userId,
          contractId,
        });
      } else {
        await saveMessage({
          conversationId: sessionId,
          sender: "USER",
          content: input,
          userId,
        });
      }

      let llmOutput = await llmWithTools.invoke(messages);
      messages.push(llmOutput);

      if (llmOutput.tool_calls?.length) {
        llmOutput = await handleToolCalls({
          llmWithTools,
          messages,
          toolCalls: llmOutput.tool_calls,
          toolMapping,
          userId,
          sessionId,
          contractId,
        });
      }

      await saveMessage({
        conversationId: sessionId,
        sender: "AI",
        content: llmOutput.content.toString(),
        userId,
        contractId,
      });

      return llmOutput;
    }
  );
};
