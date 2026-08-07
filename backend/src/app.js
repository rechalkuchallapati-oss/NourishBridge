import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/index.js";
import corsOptions from "./config/cors.js";
import v1Routes from "./routes/v1/index.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

/**
 * Creates and configures the Express application.
 * Separated from server.js so the app can be tested without listening.
 */
const createApp = () => {
  const app = express();

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
