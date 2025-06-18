import multer from "multer";
import path from "path";
import fs from "fs";

// Create "uploads/audio" if not exists
const audioUploadPath = path.resolve("uploads/audio");
if (!fs.existsSync(audioUploadPath)) {
  fs.mkdirSync(audioUploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/audio");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });