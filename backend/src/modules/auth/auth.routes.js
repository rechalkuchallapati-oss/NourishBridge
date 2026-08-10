import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import authController from "./auth.controller.js";
import {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  logoutValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "./validators/index.js";
import {
  authenticate,
  attachRequestMeta,
  registerLimiter,
  loginLimiter,
  refreshLimiter,
  forgotPasswordLimiter,
} from "./middleware/index.js";

const router = Router();

router.use(attachRequestMeta);

router.post(
  "/register",
  registerLimiter,
  registerValidator,
  validate,
  asyncHandler(authController.register),
);

router.post(
  "/login",
  loginLimiter,
  loginValidator,
  validate,
  asyncHandler(authController.login),
);

router.post(
  "/refresh",
  refreshLimiter,
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

router.get("/me", authenticate, asyncHandler(authController.getMe));

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPasswordValidator,
  validate,
  asyncHandler(authController.forgotPassword),
);

router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  asyncHandler(authController.resetPassword),
);

export default router;
