import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { donorOnly } from "../auth/middleware/authenticate.middleware.js";
import donationController from "./donation.controller.js";
import {
  createDonationValidator,
  updateDonationValidator,
  donationIdValidator,
  listMyDonationsValidator,
} from "./validators/donation.validator.js";
import { donationImageUpload } from "./middleware/upload.middleware.js";

const router = Router();

router.use(...donorOnly);

router.post(
  "/",
  createDonationValidator,
  validate,
  asyncHandler(donationController.createDonation),
);

router.get(
  "/my",
  listMyDonationsValidator,
  validate,
  asyncHandler(donationController.listMyDonations),
);

router.get(
  "/:id/history",
  donationIdValidator,
  validate,
  asyncHandler(donationController.getDonationHistory),
);

router.get(
  "/:id",
  donationIdValidator,
  validate,
  asyncHandler(donationController.getDonation),
);

router.patch(
  "/:id",
  updateDonationValidator,
  validate,
  asyncHandler(donationController.updateDonation),
);

router.delete(
  "/:id",
  donationIdValidator,
  validate,
  asyncHandler(donationController.deleteDonation),
);

router.post(
  "/:id/images",
  donationIdValidator,
  validate,
  (req, res, next) => {
    donationImageUpload(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  },
  asyncHandler(donationController.uploadImages),
);

export default router;
