import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { volunteerOnly } from "../../middlewares/auth.middleware.js";
import volunteerController from "../../controllers/volunteer.controller.js";

const router = Router();

/** All volunteer routes require JWT + volunteer role */
router.use(...volunteerOnly);

router.get("/dashboard", asyncHandler(volunteerController.getDashboard));

export default router;
