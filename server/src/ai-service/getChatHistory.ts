import { getVectorStore } from "@ai/vector-store/index";

export const getChatHistory = async (input: string, sessionId: number) => {
  const collectionName = `chat-history-${sessionId}`;
  const store = await getVectorStore(collectionName);
  return store.similaritySearch(input, 5);
};
