import config from "./index.js";
import logger from "../utils/logger.js";

/**
 * CORS configuration — allows configured frontend origins in development/production.
 */
const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser clients (Postman, mobile apps, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    if (config.cors.origins.includes(origin)) {
      return callback(null, true);
    }

    logger.warn(`CORS blocked origin: ${origin}`);
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["X-Total-Count"],
  maxAge: 86400,
};

export default corsOptions;
