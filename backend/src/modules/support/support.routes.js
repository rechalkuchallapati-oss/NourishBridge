import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { authenticate } from "../auth/middleware/authenticate.middleware.js";
import supportController from "./support.controller.js";
import { body, param } from "express-validator";

const router = Router();

router.use(authenticate);

router.get("/", asyncHandler(supportController.listMine));
router.post(
  "/",
  body("subject").trim().notEmpty().isLength({ max: 200 }),
  body("description").trim().notEmpty().isLength({ max: 5000 }),
  body("priority").optional().isIn(["low", "medium", "high", "urgent"]),
  body("category").optional().isIn(["account", "donation", "delivery", "technical", "other"]),
  validate,
  asyncHandler(supportController.create),
);
router.get("/:id", param("id").isMongoId(), validate, asyncHandler(supportController.getOne));
router.get("/:id/history", param("id").isMongoId(), validate, asyncHandler(supportController.history));
router.post(
  "/:id/reply",
  param("id").isMongoId(),
  body("message").trim().notEmpty().isLength({ max: 5000 }),
  validate,
  asyncHandler(supportController.reply),
);
router.post(
  "/:id/close",
  param("id").isMongoId(),
  body("resolution").optional().trim().isLength({ max: 2000 }),
  validate,
  asyncHandler(supportController.close),
);

export default router;
