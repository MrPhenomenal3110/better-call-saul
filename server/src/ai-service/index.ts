import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  ToolMessage,
} from "@langchain/core/messages";
import { saveMessage } from "@ai//utils/saveMessage";
import llm from "@ai/llm/openRouterLLM";
import { setName, setNameSchema } from "@ai/tools/setName";
import { createContextInjectedTool } from "@ai/tools/context/contextInjector";
import { setContext } from "@ai/tools/context";
import { getVectorStore } from "@ai/vector-store/index";
import { Message } from "@prisma/client";
import prisma from "@lib/prisma";

export const invokeChat = async ({
  input,
  userId,
  sessionId,
  contractId,
}: {
  input: string;
  sessionId: number;
  userId: number;
  contractId?: number;
}) => {
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

  const chatHistoryCollectionName = `chat-history-${sessionId}`;

  const chatHistoryStore = await getVectorStore(chatHistoryCollectionName);

  const history = await chatHistoryStore.similaritySearch(input, 5);

  const docContextCollectionName = `document-${sessionId}`;

  const docContextStore = await getVectorStore(docContextCollectionName);

  const doc = await docContextStore.similaritySearch(input, 5);

  const recentMessages = await prisma.message.findMany({
    where: { conversationId: sessionId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const contextText = history.map((doc) => doc.pageContent).join("\n---\n");

  const docContext = doc.map((info) => info.pageContent).join("\n---\n");

  const messages: BaseMessage[] = [
    new AIMessage(`Context:\n${contextText}`),
    new AIMessage(`Document context:\n ${docContext}`),
    new HumanMessage(input),
  ];

  console.log(messages);

  await saveMessage({
    conversationId: sessionId,
    sender: "USER",
    content: input,
    userId,
    contractId,
  });

  console.log(messages);

  const llm_output = await llmWithTools.invoke(messages);

  messages.push(llm_output);

  if (llm_output.tool_calls && llm_output.tool_calls.length > 0) {
    for (const toolCall of llm_output.tool_calls) {
      const selectedTool = toolMapping[toolCall.name];
      const toolResult = await selectedTool.invoke(toolCall);

      await saveMessage({
        conversationId: sessionId,
        sender: "TOOL",
        content: toolResult.content,
        toolUsed: selectedTool.name,
        userId,
        contractId,
      });

      messages.push(
        new ToolMessage({
          tool_call_id: toolCall.id ?? "",
          content: toolResult.content,
        })
      );
    }

    const finalResponse = await llmWithTools.invoke(messages);

    await saveMessage({
      conversationId: sessionId,
      sender: "AI",
      content: finalResponse.content.toString(),
      userId,
      contractId,
    });

    return finalResponse;
  } else {
    await saveMessage({
      conversationId: sessionId,
      sender: "AI",
      content: llm_output.content.toString(),
      userId,
      contractId,
    });
  }

  return llm_output;
};
