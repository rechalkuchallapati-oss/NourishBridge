import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { authenticate, volunteerOnly, authorize } from "../auth/middleware/authenticate.middleware.js";
import { USER_ROLES } from "../../constants/enums.js";
import deliveryController from "./delivery.controller.js";
import {
  deliveryIdValidator,
  donationIdParamValidator,
  advanceDeliveryValidator,
  proofTypeValidator,
  scanQrValidator,
} from "./validators/delivery.validator.js";
import { deliveryProofUpload } from "./middleware/upload.middleware.js";

const router = Router();

router.get("/my/active", ...volunteerOnly, asyncHandler(deliveryController.listMyActive));

router.use(authenticate);

router.get(
  "/donation/:donationId",
  donationIdParamValidator,
  validate,
  asyncHandler(deliveryController.getByDonation),
);

router.get(
  "/:id/qr",
  deliveryIdValidator,
  validate,
  asyncHandler(deliveryController.getQrCodes),
);

router.post(
  "/:id/scan-qr",
  authorize(USER_ROLES.VOLUNTEER, USER_ROLES.NGO, USER_ROLES.ADMIN),
  scanQrValidator,
  validate,
  asyncHandler(deliveryController.scanQr),
);

router.get("/:id", deliveryIdValidator, validate, asyncHandler(deliveryController.getDelivery));

router.post(
  "/:id/advance",
  authorize(USER_ROLES.VOLUNTEER, USER_ROLES.NGO, USER_ROLES.ADMIN),
  advanceDeliveryValidator,
  validate,
  asyncHandler(deliveryController.advance),
);

router.post(
  "/:id/proof/:proofType",
  authorize(USER_ROLES.VOLUNTEER),
  proofTypeValidator,
  validate,
  (req, res, next) => {
    deliveryProofUpload(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  },
  asyncHandler(deliveryController.uploadProof),
);

export default router;
