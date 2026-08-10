import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import ApiError from "../../../utils/ApiError.js";
import config from "../../../config/index.js";

const createAuthLimiter = ({ windowMs, max, message, keyGenerator }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, _res, next) => {
      next(ApiError.tooManyRequests(message));
    },
    keyGenerator:
      keyGenerator ||
      ((req) => ipKeyGenerator(req.ip || req.socket?.remoteAddress || "unknown")),
    skip: () => config.isDevelopment && config.rateLimit.skipInDevelopment,
  });

/** Limit registration attempts per IP */
export const registerLimiter = createAuthLimiter({
  windowMs: config.rateLimit.register.windowMs,
  max: config.rateLimit.register.max,
  message: "Too many registration attempts. Please try again later.",
});

/** Limit login brute-force per IP + email */
export const loginLimiter = createAuthLimiter({
  windowMs: config.rateLimit.login.windowMs,
  max: config.rateLimit.login.max,
  message: "Too many login attempts. Please try again later.",
  keyGenerator: (req) => {
    const email = req.body?.email?.toLowerCase()?.trim() || "";
    const ip = ipKeyGenerator(req.ip || req.socket?.remoteAddress || "unknown");
    return `${ip}:${email}`;
  },
});

/** Limit refresh token abuse per IP */
export const refreshLimiter = createAuthLimiter({
  windowMs: config.rateLimit.refresh.windowMs,
  max: config.rateLimit.refresh.max,
  message: "Too many token refresh attempts. Please try again later.",
});

/** Limit forgot-password requests per IP */
export const forgotPasswordLimiter = createAuthLimiter({
  windowMs: config.rateLimit.forgotPassword.windowMs,
  max: config.rateLimit.forgotPassword.max,
  message: "Too many password reset requests. Please try again later.",
});

export default {
  registerLimiter,
  loginLimiter,
  refreshLimiter,
  forgotPasswordLimiter,
};
