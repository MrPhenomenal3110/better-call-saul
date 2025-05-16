import { invokeChat } from "@ai/index";
import prisma from "@lib/prisma";
import type { ChatRequest, ConversationListRequest } from "@models/chat";

export const handleChat = async (input: ChatRequest) => {
  let conversation = await prisma.conversation.findUnique({
    where: {
      id: input.sessionId,
    },
  });

  if (!input.sessionId || !conversation) {
    conversation = await prisma.conversation.create({
      data: {
        userId: input.userId,
      },
    });
  }

  await prisma.message.create({
    data: {
      content: input.message,
      sender: "USER",
      conversationId: conversation.id,
    },
  });

  const response = await invokeChat({
    input: input.message,
    sessionId: input.sessionId.toString(),
  });

  console.log(response);

  await prisma.message.create({
    data: {
      content: response.content.toString(),
      sender: "TOOL",
      conversationId: input.sessionId,
    },
  });

  return response;
};

export const handleFetchConversationsForUser = async (
  input: ConversationListRequest
) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      userId: input.userId,
    },
  });

  return conversations;
};

export const fetchMessagesByConversationId = async (conversationId: number) => {
  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
  });

  return messages;
};
