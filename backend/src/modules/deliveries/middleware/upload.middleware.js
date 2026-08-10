import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import config from "../../../config/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const proofUploadDir = path.resolve(
  __dirname,
  "../../../../",
  config.uploads.rootDir,
  config.uploads.deliveryProofSubdir,
);

fs.mkdirSync(proofUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, proofUploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const deliveryId = req.params.id || "delivery";
    const type = req.params.proofType || "proof";
    cb(null, `${deliveryId}-${type}-${Date.now()}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (config.uploads.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, WebP, and GIF images are allowed"));
  }
};

export const deliveryProofUpload = multer({
  storage,
  limits: { fileSize: config.uploads.maxFileSizeBytes, files: 5 },
  fileFilter,
}).array("images", 5);

export function getDeliveryProofPublicPath(filename) {
  return `/${config.uploads.rootDir}/${config.uploads.deliveryProofSubdir}/${filename}`;
}

export default { deliveryProofUpload, getDeliveryProofPublicPath };
