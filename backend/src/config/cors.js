import config from "./index.js";
import logger from "../utils/logger.js";

/**
 * CORS configuration — allows configured frontend origins in development/production.
 */
const corsOptions = {
  origin(origin, callback) {
    // Browsers send Origin; allow non-browser clients (health checks, scripts, mobile)
    if (!origin) {
      return callback(null, true);
    }

    if (config.cors.origins.includes(origin)) {
      return callback(null, true);
    }

    // Dev convenience: allow localhost / 127.0.0.1 on any port
    if (config.isDevelopment) {
      try {
        const { hostname } = new URL(origin);
        if (hostname === "localhost" || hostname === "127.0.0.1") {
          return callback(null, true);
        }
      } catch {
        /* invalid origin URL */
      }
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
