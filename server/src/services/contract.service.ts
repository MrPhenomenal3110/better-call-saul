import { uploadToSupabaseStorage } from "@lib/supabaseS3Uploader";
import { extractTextFromPDF } from "@ai/loaders/pdfLoader";
import { splitTextIntoChunks } from "@ai/loaders/textSplitter";
import { embedAndStoreChunks } from "@ai/vector-store/storeEmbeddings";
import { prisma } from "@lib/prisma";
import { createReadStream, statSync } from "fs";
import slugify from "slugify";
import { promises as fsPromises } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

type UploadContractParams = {
  filePath: string; // local tmp path (from multer or similar)
  originalFilename: string;
  userId: number;
  title: string;
  sessionId: number;
};

export async function handleContractUpload({
  filePath,
  originalFilename,
  userId,
  title,
  sessionId,
}: UploadContractParams) {
  const safeFilename = slugify(originalFilename, { lower: true, strict: true });
  const key = `contracts/${userId}-${sessionId}-${safeFilename}-${new Date().toISOString()}`;
  const { size } = statSync(filePath);
  const fileStream = createReadStream(filePath);

  await uploadToSupabaseStorage({
    bucket: "pdf-documents",
    key,
    body: fileStream,
    contentType: "application/pdf",
    contentLength: size,
  });

  const contract = await prisma.contract.create({
    data: {
      userId,
      title,
      originalFilename,
      uploadPath: key,
      collectionName: `document-${sessionId}`,
    },
  });

  const content = await extractTextFromPDF(filePath);

  await fsPromises.unlink(filePath);

  const chunks = splitTextIntoChunks(content);

  await embedAndStoreChunks(chunks, sessionId);

  return { contractId: contract.id, message: "Upload and indexing successful" };
}
