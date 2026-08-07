import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root (one level above src/)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const parseOrigins = (value = "") =>
  value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

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
    accessSecret: process.env.JWT_ACCESS_SECRET || "dev-access-secret-change-in-production",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-change-in-production",
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
};

export default config;
