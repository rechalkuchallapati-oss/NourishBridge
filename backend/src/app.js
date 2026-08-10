import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/index.js";
import corsOptions from "./config/cors.js";
import v1Routes from "./routes/v1/index.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import { globalApiLimiter } from "./middlewares/globalRateLimit.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates and configures the Express application.
 * Separated from server.js so the app can be tested without listening.
 */
const createApp = () => {
  const app = express();

  if (config.security.trustProxy) {
    app.set("trust proxy", 1);
  }

  // Security headers
  app.use(helmet());

  // CORS — allows configured frontend origins
  app.use(cors(corsOptions));

  // Request logging (dev-friendly format)
  if (config.isDevelopment) {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }

  // Body parsers
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Global API rate limit
  app.use(config.api.prefix, globalApiLimiter);

  // Uploaded files (profile images, etc.)
  app.use(
    `/${config.uploads.rootDir}`,
    express.static(path.resolve(__dirname, "..", config.uploads.rootDir)),
  );

  // Root welcome route (non-versioned)
  app.get("/", (_req, res) => {
    res.json({
      success: true,
      message: "NourishBridge API",
      version: "1.0.0",
      docs: `${config.api.prefix}/health`,
    });
  });

  // Versioned API routes — /api/v1/*
  app.use(config.api.prefix, v1Routes);

  // 404 handler
  app.use(notFound);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};

export default createApp;
