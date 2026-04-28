import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MAX_SIZE = 200 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../assets');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    // const originalName = file.originalname
    // cb(null, `${originalName}_${timestamp}${path.extname(file.originalname)}`);
    const originalName = file.originalname;
    // const timestamp = Date.now();
    const filename = `${originalName}`;
    cb(null, filename);
  },
});


const fileFilter = (req, file, cb) => {
  const isImage = ["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype);
  cb(null, isImage);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});

const cekNull = (fileUpload) => (fileUpload?.[0]?.filename ?? null);

const deleteImage = (upload_menu) => {
  const filePath = path.join(__dirname, '../assets', upload_menu);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export default {
  upload,
  cekNull,
  deleteImage
}