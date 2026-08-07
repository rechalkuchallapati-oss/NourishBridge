import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import authController from "../../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  logoutValidator,
} from "../../validators/auth.validator.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validate,
  asyncHandler(authController.register),
);

router.post(
  "/login",
  loginValidator,
  validate,
  asyncHandler(authController.login),
);

router.post(
  "/refresh",
  refreshTokenValidator,
  validate,
  asyncHandler(authController.refresh),
);

router.post(
  "/logout",
  logoutValidator,
  validate,
  asyncHandler(authController.logout),
);

router.get(
  "/me",
  authenticate,
  asyncHandler(authController.getMe),
);

export default router;
