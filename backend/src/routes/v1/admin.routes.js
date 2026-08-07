import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import { adminOnly } from "../../middlewares/auth.middleware.js";
import adminController from "../../controllers/admin.controller.js";

const router = Router();

/** All admin routes require JWT + admin role */
router.use(...adminOnly);

router.get("/dashboard", asyncHandler(adminController.getDashboard));

export default router;
