import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { authenticate } from "../auth/middleware/authenticate.middleware.js";
import profileController from "./profile.controller.js";
import { updateProfileValidator } from "./validators/profile.validator.js";
import { profileImageUpload } from "./middleware/upload.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", asyncHandler(profileController.getProfile));

router.patch("/", updateProfileValidator, validate, asyncHandler(profileController.updateProfile));

router.post(
  "/image",
  (req, res, next) => {
    profileImageUpload(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  },
  asyncHandler(profileController.uploadProfileImage),
);

router.get("/impact", asyncHandler(profileController.getProfileImpact));

export default router;
