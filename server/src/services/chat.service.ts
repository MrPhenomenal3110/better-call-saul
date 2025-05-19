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

  const response = await invokeChat({
    input: input.message,
    sessionId: input.sessionId,
    userId: input.userId,
    contractId: input.contractId,
  });

  console.log(response);

  return response;
};

export const handleFetchConversationsForUser = async (
  input: ConversationListRequest
) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      userId: input.userId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
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

export const createNewConversation = async (userId: number) => {
  const conversation = await prisma.conversation.create({
    data: {
      userId,
    },
  });

  return conversation.id;
};
