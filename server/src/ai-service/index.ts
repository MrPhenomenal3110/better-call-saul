import { createContextInjectedTool } from "./tools/context/contextInjector";
import { setName, setNameSchema } from "./tools/setName";
import {
  BaseMessage,
  HumanMessage,
  ToolMessage,
} from "@langchain/core/messages";
import llm from "./llm/openRouterLLM";
import { setContext } from "./tools/context";

export const invokeChat = async ({
  input,
  userId,
  sessionId,
}: {
  input: string;
  sessionId: string;
  userId: number;
}) => {
  // Create all your tools once with userId injected

  setContext({ userId, sessionId });

  const tools = [
    createContextInjectedTool(setName, userId, {
      name: "setName",
      schema: setNameSchema,
      description: "Updates the user name",
    }),
  ];

  const toolMapping = Object.fromEntries(tools.map((t) => [t.name, t]));

  const llmWithTools = llm.bindTools(tools);

  const messages: BaseMessage[] = [new HumanMessage(input)];

  const llm_output = await llmWithTools.invoke(input);
  messages.push(llm_output);

  if (llm_output.tool_calls && llm_output.tool_calls.length > 0) {
    for (const toolCall of llm_output.tool_calls) {
      const selectedTool = toolMapping[toolCall.name];
      const toolResult = await selectedTool.invoke(toolCall);
      messages.push(
        new ToolMessage({
          tool_call_id: toolCall.id ?? "",
          content: toolResult.content,
        })
      );
    }
    const response = await llmWithTools.invoke(messages);
    return response;
  }

  return llm_output;
};
