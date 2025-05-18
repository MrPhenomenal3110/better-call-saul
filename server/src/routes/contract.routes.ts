import express from "express";
import { uploadContractController } from "@controllers/contract.controller";
import { upload } from "@middlewares/multer.middleware"; // path to your multer config
import { authenticate } from "@middlewares/auth.middleware";

const router = express.Router();

import fs from "fs";
import path from "path";

const tmpDir = path.resolve(process.cwd(), "tmp");

if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

router.post(
  "/contract/upload",
  upload.single("pdf"),
  authenticate,
  uploadContractController
);

export default router;
