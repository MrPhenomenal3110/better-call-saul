// controllers/chat.controller.ts
import { Request, Response } from "express";
import {
  fetchMessagesByConversationId,
  handleChat,
  handleFetchConversationsForUser,
  createNewConversation,
} from "@services/chat.service";
import { AuthenticatedRequest } from "@middlewares/auth.middleware";

export const handleChatController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { message, sessionId, contractId } = req.body;

    if (!req.userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const response = await handleChat({
      message,
      sessionId,
      userId: req.userId,
      contractId,
    });

    res.json(response);
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleFetchConversationsController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const response = await handleFetchConversationsForUser({
      userId: req.userId,
    });

    res.json(response);
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleMessagesController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const { conversationId } = req.query;

    const response = await fetchMessagesByConversationId(
      Number(conversationId)
    );

    res.json(response);
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleCreateConversation = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "User not authenticated" });
      return;
    }

    const { userId } = req;

    const conversationId = await createNewConversation(userId);

    res.json({ conversationId });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
