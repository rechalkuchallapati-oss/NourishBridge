import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import config from "../../../config/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const profileUploadDir = path.resolve(
  __dirname,
  "../../../../",
  config.uploads.rootDir,
  config.uploads.profileSubdir,
);

fs.mkdirSync(profileUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, profileUploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${req.user.id}-${Date.now()}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (config.uploads.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
  }
};

export const profileImageUpload = multer({
  storage,
  limits: { fileSize: config.uploads.maxFileSizeBytes },
  fileFilter,
}).single("image");

export function getProfileImagePublicPath(filename) {
  return `/${config.uploads.rootDir}/${config.uploads.profileSubdir}/${filename}`;
}

export default { profileImageUpload, getProfileImagePublicPath };
