import { Document } from "@langchain/core/documents";
import { getVectorStore } from "@ai/vector-store";

export async function embedAndStoreChunks(chunks: string[], sessionId: number) {
  const docs = chunks.map(
    (chunk, index) =>
      new Document({
        pageContent: chunk,
        metadata: {
          sessionId,
          chunkIndex: index,
        },
      })
  );

  const collectionName = `document-${sessionId}`;
  const vectorStore = await getVectorStore(collectionName);

  await vectorStore.addDocuments(docs);
}
