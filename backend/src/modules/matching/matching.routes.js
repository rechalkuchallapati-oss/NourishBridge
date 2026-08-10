import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { authenticate, adminOnly } from "../auth/middleware/authenticate.middleware.js";
import matchingController from "./matching.controller.js";
import { donationIdValidator } from "../maps/validators/map.validator.js";

const router = Router();

router.use(...adminOnly);

router.get(
  "/donations/:donationId/ngos",
  donationIdValidator,
  validate,
  asyncHandler(matchingController.ngoMatches),
);

router.get(
  "/donations/:donationId/volunteers",
  donationIdValidator,
  validate,
  asyncHandler(matchingController.volunteerMatches),
);

export default router;
