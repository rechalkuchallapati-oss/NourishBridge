import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { ngoOnly } from "../../middlewares/auth.middleware.js";
import ngoController from "../../controllers/ngo.controller.js";

const router = Router();

/** All NGO routes require JWT + ngo role */
router.use(...ngoOnly);

router.get("/dashboard", asyncHandler(ngoController.getDashboard));

export default router;
