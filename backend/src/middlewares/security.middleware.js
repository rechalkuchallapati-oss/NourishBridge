import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import path from "path";
import config from "../config/index.js";

const ALLOWED_UPLOAD_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

/**
 * Strip MongoDB operator keys from user input (NoSQL injection protection).
 */
export const sanitizeInput = mongoSanitize({
  replaceWith: "_",
  onSanitize: ({ req, key }) => {
    if (config.isDevelopment) {
      req.sanitizedKeys = req.sanitizedKeys || [];
      req.sanitizedKeys.push(key);
    }
  },
});

/**
 * Prevent HTTP parameter pollution on query/body arrays.
 */
export const preventPollution = hpp({
  whitelist: ["status", "role", "category", "priority", "type", "sort", "order"],
});

/**
 * Restrict static upload serving to known image extensions and set safe headers.
 */
export function secureUploadAccess(req, res, next) {
  const ext = path.extname(req.path).toLowerCase();
  if (!ALLOWED_UPLOAD_EXTENSIONS.has(ext)) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "public, max-age=86400, immutable");
  return next();
}

export default { sanitizeInput, preventPollution, secureUploadAccess };
