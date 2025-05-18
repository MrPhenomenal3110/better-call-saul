import { BaseMessage, ToolMessage } from "@langchain/core/messages";
import { saveMessage } from "@ai/utils/saveMessage";

export const handleToolCalls = async ({
  llmWithTools,
  messages,
  toolCalls,
  toolMapping,
  userId,
  sessionId,
  contractId,
}: {
  llmWithTools: any;
  messages: BaseMessage[];
  toolCalls: any[];
  toolMapping: Record<string, any>;
  userId: number;
  sessionId: number;
  contractId?: number;
}) => {
  for (const call of toolCalls) {
    const tool = toolMapping[call.name];
    const result = await tool.invoke(call);

    await saveMessage({
      conversationId: sessionId,
      sender: "TOOL",
      content: result.content,
      toolUsed: tool.name,
      userId,
      contractId,
    });

    messages.push(
      new ToolMessage({ tool_call_id: call.id ?? "", content: result.content })
    );
  }

  return llmWithTools.invoke(messages);
};
