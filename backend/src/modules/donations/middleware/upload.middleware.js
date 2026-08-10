import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import config from "../../../config/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const donationUploadDir = path.resolve(
  __dirname,
  "../../../../",
  config.uploads.rootDir,
  config.uploads.donationSubdir,
);

fs.mkdirSync(donationUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, donationUploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const donationId = req.params.id || "new";
    cb(null, `${donationId}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (config.uploads.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
  }
};

export const donationImageUpload = multer({
  storage,
  limits: { fileSize: config.uploads.maxFileSizeBytes, files: 5 },
  fileFilter,
}).array("images", 5);

export function getDonationImagePublicPath(filename) {
  return `/${config.uploads.rootDir}/${config.uploads.donationSubdir}/${filename}`;
}

export default { donationImageUpload, getDonationImagePublicPath };
