import multer from "multer";
import path from "path";

const uploadFolder = path.resolve(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 25 * 1024 * 1024,
};

export const upload = multer({ storage, limits });
