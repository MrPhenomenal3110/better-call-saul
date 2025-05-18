import { getVectorStore } from "@ai/vector-store/index";

export const getDocumentContext = async (input: string, sessionId: number) => {
  const collectionName = `document-${sessionId}`;
  const store = await getVectorStore(collectionName);
  return store.similaritySearch(input, 5);
};
