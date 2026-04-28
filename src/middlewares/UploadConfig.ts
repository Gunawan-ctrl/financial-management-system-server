import multer from "multer";
import path from "path";
import fs from "fs";

const uploadRoot = path.resolve(process.cwd(), "src/assets");
const MAX_SIZE = 200 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(uploadRoot)) {
      fs.mkdirSync(uploadRoot, { recursive: true });
    }
    cb(null, uploadRoot);
  },
  filename: (_req, file, cb) => {
    const originalName = file.originalname;
    const filename = `${originalName}`;
    cb(null, filename);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const isImage = ["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype);
  cb(null, isImage);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});

const cekNull = (fileUpload?: Array<Express.Multer.File>) => fileUpload?.[0]?.filename ?? null;

const deleteImage = (upload_menu: string) => {
  const filePath = path.join(uploadRoot, upload_menu);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export default {
  upload,
  cekNull,
  deleteImage,
};