import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { volunteerOnly } from "../auth/middleware/authenticate.middleware.js";
import volunteerController from "./volunteer.controller.js";
import {
  missionIdValidator,
  rejectMissionValidator,
  advanceMissionValidator,
} from "./validators/volunteer.validator.js";

const router = Router();

router.use(...volunteerOnly);

router.get("/dashboard", asyncHandler(volunteerController.getDashboard));

router.get("/missions/available", asyncHandler(volunteerController.listAvailable));
router.get("/missions/assigned", asyncHandler(volunteerController.listAssigned));
router.get("/missions/history", asyncHandler(volunteerController.listHistory));
router.get("/missions/performance", asyncHandler(volunteerController.getPerformance));
router.get("/missions/:id", missionIdValidator, validate, asyncHandler(volunteerController.getMission));
router.post("/missions/:id/accept", missionIdValidator, validate, asyncHandler(volunteerController.acceptMission));
router.post(
  "/missions/:id/reject",
  rejectMissionValidator,
  validate,
  asyncHandler(volunteerController.rejectMission),
);
router.post(
  "/missions/:id/advance",
  advanceMissionValidator,
  validate,
  asyncHandler(volunteerController.advanceMission),
);

export default router;
