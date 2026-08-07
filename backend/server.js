import config from "./src/config/index.js";
import connectDatabase, { disconnectDatabase } from "./src/config/database.js";
import createApp from "./src/app.js";
import logger from "./src/utils/logger.js";
import "./src/models/index.js";

/**
 * Application entry point — connects DB, starts HTTP server, handles graceful shutdown.
 */
const startServer = async () => {
  try {
    await connectDatabase();

    const app = createApp();
    const server = app.listen(config.port, () => {
      logger.info(`Environment: ${config.env}`);
      logger.info(`Server running on http://localhost:${config.port}`);
      logger.info(`API base: http://localhost:${config.port}${config.api.prefix}`);
    });

    const shutdown = async (signal) => {
      logger.info(`${signal} received — shutting down gracefully`);
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    process.on("unhandledRejection", (reason) => {
      logger.error("Unhandled Rejection:", reason);
    });

    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception:", error.message);
      process.exit(1);
    });
  } catch (error) {
    logger.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
