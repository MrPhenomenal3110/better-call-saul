import type { SendMessageData } from "@models/apiData";
import client from "./index";

export const getConversations = async () => {
  const res = await client.get("/conversations");
  return res.data; // assuming it returns { token, user }
};

export const createNewConversation = async () => {
  const res = await client.get("/conversations/new");
  return res.data;
};

export const getMessages = async (conversationId: number) => {
  const res = await client.get("/chat/messages", {
    params: {
      conversationId,
    },
  });

  return res.data;
};

export const sendMessage = async ({
  conversationId,
  message,
  contractId,
}: SendMessageData) => {
  const res = await client.post("/chat", {
    message,
    sessionId: conversationId,
    contractId,
  });

  return res.data;
};

export const uploadPdf = async (formData: FormData) => {
  const res = await client.post("/contract/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
