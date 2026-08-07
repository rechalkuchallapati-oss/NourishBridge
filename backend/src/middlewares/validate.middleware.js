import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

/**
 * Express-validator middleware — converts validation failures into ApiError.
 */
const validate = (req, _res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));

    return next(
      ApiError.badRequest("Validation failed", errors),
    );
  }

  next();
};

export default validate;
