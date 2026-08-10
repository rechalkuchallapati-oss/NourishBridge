import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { donorOnly } from "../../middlewares/auth.middleware.js";
import donorController from "../../controllers/donor.controller.js";

const router = Router();

/** All donor routes require JWT + donor role */
router.use(...donorOnly);

router.get("/dashboard", asyncHandler(donorController.getDashboard));

export default router;
