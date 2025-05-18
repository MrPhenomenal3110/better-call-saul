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

type UploadOptions = {
  bucket: string;
  key: string; // path/filename.ext
  body: Buffer | ReadStream;
  contentType: string;
  contentLength: number;
};

type ResponseObject = {
  success: boolean;
};

/**
 * Upload a file to Supabase Storage (S3-compatible API)
 */
export async function uploadToSupabaseStorage({
  bucket,
  key,
  body,
  contentType,
  contentLength,
}: UploadOptions): Promise<ResponseObject> {
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      ContentLength: contentLength,
    });

    await s3Client.send(command);
    return { success: true };
  } catch (error: any) {
    console.error(error.message);
    return { success: false };
  }
}
