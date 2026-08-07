import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import logger from "../utils/logger.js";
import config from "../config/index.js";

/**
 * Central error handler — converts thrown errors into consistent JSON responses.
 */
const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal server error";
  let errors = err.errors || [];

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    if (field === "email") {
      message = "Email is already registered";
    } else {
      message = `Duplicate value for ${field}`;
    }
  }

  // Mongoose cast error (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // CORS errors
  if (err.message?.includes("not allowed by CORS")) {
    statusCode = HTTP_STATUS.FORBIDDEN;
  }

  if (config.isDevelopment) {
    logger.error(`${req.method} ${req.originalUrl} → ${statusCode}: ${message}`);
    if (err.stack) logger.debug(err.stack);
  } else if (!err.isOperational) {
    logger.error("Unexpected error:", err.message);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(errors.length > 0 && { errors }),
    ...(config.isDevelopment && err.stack && { stack: err.stack }),
  });
};

export default errorHandler;
