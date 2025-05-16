import { getMessages, sendMessage } from "@api/chat";
import type { SendMessageData } from "@models/apiData";
import type { Message } from "@models/entities";
import { useState } from "react";

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState<string>("");

  const fetchMessages = async (conversationId: number) => {
    try {
      setLoading(true);
      const conversationData = await getMessages(conversationId);

      setMessages(conversationData);
    } catch (e: any) {
      setError(e?.message);
    } finally {
      setLoading(false);
    }
  };

  const sendHumanMessage = async (data: SendMessageData) => {
    try {
      setLoading(true);
      const userMessage = {
        id: Date.now(), // temp ID
        conversationId: data.conversationId,
        sender: "USER" as const,
        content: data.message,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => (prev ? [...prev, userMessage] : [userMessage]));

      const aiMessage = await sendMessage(data);

      console.log(aiMessage);

      const assistantMessage = {
        id: aiMessage.kwargs.id,
        conversationId: data.conversationId,
        sender: "TOOL" as const,
        content: aiMessage.kwargs.content,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) =>
        prev ? [...prev, assistantMessage] : [assistantMessage]
      );
    } catch (e: any) {
      setError(e?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    messages,
    setMessages,
    fetchMessages,
    sendHumanMessage,
  };
};
