import { createNewConversation, getConversations } from "@api/chat";
import type { Conversation } from "@models/entities";
import { useState } from "react";

export const useConversation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[] | null>(
    null
  );
  const getAllConversationsForUser = async () => {
    try {
      setLoading(true);
      const response = await getConversations();
      setConversations(response);
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const getNewConversationId = async () => {
    try {
      setLoading(true);
      const response = await createNewConversation();
      return response.conversationId;
    } catch (err: any) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    conversations,
    getAllConversationsForUser,
    getNewConversationId,
  };
};
