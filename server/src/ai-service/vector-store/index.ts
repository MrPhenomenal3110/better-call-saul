// @ai/vector-stores/index.ts
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";

const vectorStoreCache: Record<string, Chroma> = {};

export const getVectorStore = async (
  collectionName: string
): Promise<Chroma> => {
  if (vectorStoreCache[collectionName]) {
    return vectorStoreCache[collectionName];
  }

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY!,
  });

  try {
    const vectorStore = await Chroma.fromExistingCollection(embeddings, {
      collectionName,
      url: process.env.CHROMA_DB_URL!,
    });

    vectorStoreCache[collectionName] = vectorStore;
    return vectorStore;
  } catch (err) {
    const vectorStore = await Chroma.fromDocuments([], embeddings, {
      collectionName,
      url: process.env.CHROMA_DB_URL!,
    });

    vectorStoreCache[collectionName] = vectorStore;
    return vectorStore;
  }
};
