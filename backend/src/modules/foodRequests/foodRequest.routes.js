import { Router } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import validate from "../../middlewares/validate.middleware.js";
import { ngoOnly } from "../auth/middleware/authenticate.middleware.js";
import foodRequestController from "./foodRequest.controller.js";
import {
  createFoodRequestValidator,
  updateFoodRequestValidator,
  foodRequestIdValidator,
  cancelFoodRequestValidator,
} from "./validators/foodRequest.validator.js";

const router = Router();

router.use(...ngoOnly);

router.get("/", asyncHandler(foodRequestController.list));
router.post("/", createFoodRequestValidator, validate, asyncHandler(foodRequestController.create));
router.get("/:id", foodRequestIdValidator, validate, asyncHandler(foodRequestController.getOne));
router.patch("/:id", updateFoodRequestValidator, validate, asyncHandler(foodRequestController.update));
router.delete(
  "/:id",
  cancelFoodRequestValidator,
  validate,
  asyncHandler(foodRequestController.cancel),
);
router.get("/:id/history", foodRequestIdValidator, validate, asyncHandler(foodRequestController.history));

export default router;
