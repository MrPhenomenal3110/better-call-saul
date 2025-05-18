// lib/supabaseUploader.ts
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { createWriteStream, ReadStream } from "fs";
import { pipeline, Readable } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: `https://${process.env.SUPABASE_PROJECT_REF}.supabase.co/storage/v1/s3`,
  credentials: {
    accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

type DownladOptions = {
  bucket: string;
  key: string; // key/name of the file in the database
  destinationPath: string; // path/filename.ext
};

export async function downloadFromSupabaseStorage({
  bucket,
  key,
  destinationPath,
}: DownladOptions): Promise<void> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const response = await s3Client.send(command);

  if (!response.Body) {
    throw new Error("No file body received.");
  }

  const bodyStream = Readable.from(response.Body as any);
  const writeStream = createWriteStream(destinationPath);
  await streamPipeline(bodyStream, writeStream);

  console.log(`✅ Downloaded ${key} to ${destinationPath}`);
}
