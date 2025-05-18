import prisma from "@lib/prisma";
import { getVectorStore } from "@ai/vector-store";
import { Document } from "@langchain/core/documents";

export const saveMessage = async ({
  conversationId,
  sender,
  content,
  toolUsed,
  userId,
  contractId,
}: {
  conversationId: number;
  sender: "USER" | "AI" | "TOOL" | "USER_FILE_UPLOAD";
  content: string;
  toolUsed?: string;
  userId: number;
  contractId?: number;
}) => {
  // Save to MySQL
  const message = await prisma.message.create({
    data: {
      conversationId,
      sender,
      content,
      toolUsed,
    },
  });

  // Save to vector store (only if sender isn't TOOL)
  if (sender !== "TOOL") {
    const chatHistoryCollectionName = `chat-history-${conversationId}`;
    const vectorStore = await getVectorStore(chatHistoryCollectionName);
    const doc = new Document({
      pageContent: content,
      metadata: {
        userId,
        conversationId,
        messageId: message.id,
        sender,
        contractId,
      },
    });
    await vectorStore.addDocuments([doc]);
  }

  return message;
};
