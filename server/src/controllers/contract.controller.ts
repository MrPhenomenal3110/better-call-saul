import { Response } from "express";
import { handleContractUpload } from "@services/contract.service";
import { AuthenticatedRequest } from "@middlewares/auth.middleware";

export async function uploadContractController(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const { title, sessionId }: { title: string; sessionId: string } = req.body;
    if (!title || !sessionId) {
      res
        .status(400)
        .json({ error: "Missing required fields: title or sessionId" });
      return;
    }

    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const result = await handleContractUpload({
      filePath: file.path,
      originalFilename: file.originalname,
      userId,
      title,
      sessionId: Number(sessionId),
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Upload controller error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
