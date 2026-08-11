import { Router } from "express";

import asyncHandler from "../../middlewares/asyncHandler.js";

import validate from "../../middlewares/validate.middleware.js";

import { adminOnly } from "../auth/middleware/authenticate.middleware.js";

import adminController from "../../controllers/admin.controller.js";

import adminDonationController from "./adminDonation.controller.js";

import adminFoodRequestController from "./adminFoodRequest.controller.js";

import adminOps from "./adminOperations.controller.js";

import { param, body, query } from "express-validator";



const router = Router();



router.use(...adminOnly);



router.get("/dashboard", asyncHandler(adminController.getDashboard));

router.get("/analytics", asyncHandler(adminOps.getAnalytics));

router.get("/reports", asyncHandler(adminOps.getReports));

router.get(
  "/export/:type",
  param("type").isIn(["donations", "deliveries", "volunteers", "ngos", "inventory", "food-requests", "impact"]),
  validate,
  asyncHandler(adminOps.exportReport),
);

router.get("/users", asyncHandler(adminOps.listUsers));

router.patch(

  "/users/:id",

  param("id").isMongoId(),

  body("isActive").optional().isBoolean(),

  validate,

  asyncHandler(adminOps.updateUser),

);



router.get("/donors", asyncHandler(adminOps.listDonors));

router.get("/volunteers", asyncHandler(adminOps.listVolunteers));

router.get("/ngos", asyncHandler(adminOps.listNgos));

router.post(

  "/ngos/:id/verify",

  param("id").isMongoId(),

  validate,

  asyncHandler(adminOps.verifyNgo),

);



router.get("/donations", asyncHandler(adminOps.listDonations));

router.get("/deliveries", asyncHandler(adminOps.listDeliveries));

router.get("/food-requests", asyncHandler(adminOps.listFoodRequests));

router.post(
  "/food-requests/:id/review",
  param("id").isMongoId(),
  validate,
  asyncHandler(adminFoodRequestController.reviewFoodRequest),
);

router.post(
  "/food-requests/:id/approve",
  param("id").isMongoId(),
  validate,
  asyncHandler(adminFoodRequestController.approveFoodRequest),
);

router.post(
  "/food-requests/:id/reject",
  param("id").isMongoId(),
  body("reason").optional().trim().isLength({ max: 500 }),
  validate,
  asyncHandler(adminFoodRequestController.rejectFoodRequest),
);

router.post(
  "/food-requests/:id/match",
  param("id").isMongoId(),
  body("donationId").isMongoId(),
  validate,
  asyncHandler(adminFoodRequestController.matchFoodRequest),
);

router.get("/inventory", asyncHandler(adminOps.listInventory));

router.get("/audit-logs", asyncHandler(adminOps.listAuditLogs));

router.get("/notifications", asyncHandler(adminOps.listNotifications));



router.get("/support-tickets", asyncHandler(adminOps.listSupportTickets));

router.patch(

  "/support-tickets/:id",

  param("id").isMongoId(),

  validate,

  asyncHandler(adminOps.updateSupportTicket),

);



router.post(

  "/donations/:id/verify",

  param("id").isMongoId(),

  validate,

  asyncHandler(adminDonationController.verifyDonation),

);



router.post(

  "/donations/:id/reject",

  param("id").isMongoId(),

  body("reason").optional().trim().isLength({ max: 500 }),

  validate,

  asyncHandler(adminDonationController.rejectDonation),

);



router.post(

  "/donations/:id/expire",

  param("id").isMongoId(),

  validate,

  asyncHandler(adminDonationController.expireDonation),

);



export default router;

