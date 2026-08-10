import rateLimit from "express-rate-limit";
import config from "../config/index.js";

const shouldSkip = () => config.isDevelopment && config.rateLimit.skipInDevelopment;

export const globalApiLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_API_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_API_MAX) || 300,
  standardHeaders: true,
  legacyHeaders: false,
  skip: shouldSkip,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export default globalApiLimiter;
