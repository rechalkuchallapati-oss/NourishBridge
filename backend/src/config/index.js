import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import validateEnv from "./validateEnv.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const parseOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const parseBool = (value, defaultValue = false) => {
  if (value === undefined || value === "") return defaultValue;
  return value === "true" || value === "1";
};

const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "production",

  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nourishbridge",
  },

  cors: {
    origins: parseOrigins(
      process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:5174",
    ),
  },

  api: {
    prefix: process.env.API_PREFIX || "/api/v1",
  },

  jwt: {
    accessSecret:
      process.env.JWT_ACCESS_SECRET || "dev-access-secret-change-in-production",
    refreshSecret:
      process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-in-production",
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  email: {
    from: process.env.EMAIL_FROM || "NourishBridge <noreply@nourishbridge.local>",
    smtp: {
      host: process.env.SMTP_HOST || "",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: parseBool(process.env.SMTP_SECURE),
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  },

  otp: {
    secret: process.env.OTP_SECRET || "dev-otp-secret-change-in-production",
    expiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES) || 10,
    resendCooldownMinutes: Number(process.env.OTP_RESEND_COOLDOWN_MINUTES) || 15,
    maxRequestsPerWindow: Number(process.env.OTP_MAX_REQUESTS_PER_WINDOW) || 3,
  },

  security: {
    trustProxy: parseBool(process.env.TRUST_PROXY),
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 12,
  },

  rateLimit: {
    skipInDevelopment: process.env.RATE_LIMIT_SKIP_IN_DEV !== "false",
    register: {
      windowMs: Number(process.env.RATE_LIMIT_REGISTER_WINDOW_MS) || 60 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_REGISTER_MAX) || 5,
    },
    login: {
      windowMs: Number(process.env.RATE_LIMIT_LOGIN_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_LOGIN_MAX) || 10,
    },
    refresh: {
      windowMs: Number(process.env.RATE_LIMIT_REFRESH_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_REFRESH_MAX) || 30,
    },
    forgotPassword: {
      windowMs: Number(process.env.RATE_LIMIT_FORGOT_WINDOW_MS) || 15 * 60 * 1000,
      max: Number(process.env.RATE_LIMIT_FORGOT_MAX) || 5,
    },
  },

  admin: {
    seedEmail: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    seedPassword: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  },

  uploads: {
    rootDir: process.env.UPLOAD_DIR || "uploads",
    profileSubdir: "profiles",
    donationSubdir: "donations",
    deliveryProofSubdir: "delivery-proofs",
    maxFileSizeBytes: Number(process.env.UPLOAD_MAX_FILE_SIZE) || 5 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
};

validateEnv(config);

export default config;
