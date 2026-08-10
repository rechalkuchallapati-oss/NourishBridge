import HTTP_STATUS from "../constants/httpStatus.js";

/**
 * Custom operational error class for predictable API failures.
 */
class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request", errors = []) {
    return new ApiError(HTTP_STATUS.BAD_REQUEST, message, errors);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(HTTP_STATUS.NOT_FOUND, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(HTTP_STATUS.UNAUTHORIZED, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(HTTP_STATUS.FORBIDDEN, message);
  }

  static conflict(message = "Conflict") {
    return new ApiError(HTTP_STATUS.CONFLICT, message);
  }

  static tooManyRequests(message = "Too many requests") {
    return new ApiError(HTTP_STATUS.TOO_MANY_REQUESTS, message);
  }

  static internal(message = "Internal server error") {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
}

export default ApiError;
