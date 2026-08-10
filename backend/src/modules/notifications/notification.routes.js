import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { protect } from "../auth/middleware/authenticate.middleware.js";
import notificationController from "./notification.controller.js";
import { param, query } from "express-validator";

const router = Router();

router.use(protect);

router.get(
  "/",
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
  query("unreadOnly").optional().isBoolean(),
  validate,
  asyncHandler(notificationController.listMine),
);

router.get("/unread-count", asyncHandler(notificationController.unreadCount));

router.patch(
  "/read-all",
  asyncHandler(notificationController.markAllRead),
);

router.patch(
  "/:id/read",
  param("id").isMongoId(),
  validate,
  asyncHandler(notificationController.markRead),
);

export default router;
