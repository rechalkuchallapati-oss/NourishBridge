import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { authenticate, authorize } from "../auth/middleware/authenticate.middleware.js";
import { USER_ROLES } from "../../constants/enums.js";
import mapController from "./map.controller.js";
import {
  donationIdValidator,
  deliveryIdValidator,
  updateLocationValidator,
} from "./validators/map.validator.js";

const router = Router();

router.use(authenticate);

router.get(
  "/donation/:donationId",
  donationIdValidator,
  validate,
  asyncHandler(mapController.getDonationMap),
);

router.get(
  "/delivery/:deliveryId",
  deliveryIdValidator,
  validate,
  asyncHandler(mapController.getDeliveryRoute),
);

router.patch(
  "/volunteer/location",
  authorize(USER_ROLES.VOLUNTEER),
  updateLocationValidator,
  validate,
  asyncHandler(mapController.updateVolunteerLocation),
);

export default router;
