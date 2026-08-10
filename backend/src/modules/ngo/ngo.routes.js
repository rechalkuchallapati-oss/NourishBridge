import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { ngoOnly } from "../auth/middleware/authenticate.middleware.js";
import ngoController from "./ngo.controller.js";
import {
  donationIdValidator,
  rejectDonationValidator,
  beneficiaryValidator,
  distributeInventoryValidator,
} from "./validators/ngo.validator.js";

const router = Router();

router.use(...ngoOnly);

router.get("/dashboard", asyncHandler(ngoController.getDashboard));

router.get("/donations/available", asyncHandler(ngoController.browseDonations));
router.get("/donations/incoming", asyncHandler(ngoController.listIncoming));
router.get("/donations/accepted", asyncHandler(ngoController.listAccepted));
router.get("/donations/statistics", asyncHandler(ngoController.donationStats));
router.get("/donations/:id", donationIdValidator, validate, asyncHandler(ngoController.getDonation));
router.post("/donations/:id/accept", donationIdValidator, validate, asyncHandler(ngoController.acceptDonation));
router.post(
  "/donations/:id/reject",
  rejectDonationValidator,
  validate,
  asyncHandler(ngoController.rejectDonation),
);
router.post("/donations/:id/complete", donationIdValidator, validate, asyncHandler(ngoController.completeDonation));

router.get("/inventory", asyncHandler(ngoController.listInventory));
router.get("/inventory/alerts", asyncHandler(ngoController.inventoryAlerts));
router.get("/inventory/statistics", asyncHandler(ngoController.inventoryStats));
router.get("/deliveries/incoming", asyncHandler(ngoController.listIncomingDeliveries));
router.post(
  "/inventory/:id/distribute",
  distributeInventoryValidator,
  validate,
  asyncHandler(ngoController.distributeInventory),
);

router.get("/beneficiaries", asyncHandler(ngoController.listBeneficiaries));
router.post("/beneficiaries", beneficiaryValidator, validate, asyncHandler(ngoController.createBeneficiary));
router.patch(
  "/beneficiaries/:id",
  beneficiaryValidator,
  validate,
  asyncHandler(ngoController.updateBeneficiary),
);

export default router;
