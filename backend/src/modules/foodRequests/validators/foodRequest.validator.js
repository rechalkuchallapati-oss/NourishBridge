import { body, param } from "express-validator";
import {
  FOOD_CATEGORIES,
  DONATION_PRIORITY,
  QUANTITY_UNITS,
  enumValues,
} from "../../../constants/enums.js";

export const foodRequestIdValidator = [
  param("id").isMongoId().withMessage("Invalid food request ID"),
];

export const createFoodRequestValidator = [
  body("title").optional().trim().isLength({ max: 200 }),
  body("foodItem").trim().notEmpty().withMessage("Food item is required").isLength({ max: 200 }),
  body("foodCategory").optional().isIn(enumValues(FOOD_CATEGORIES)),
  body("category").optional().isIn(enumValues(FOOD_CATEGORIES)),
  body("quantity").optional().isFloat({ min: 0.01 }),
  body("quantityNeeded").optional().isFloat({ min: 0.01 }),
  body("quantityUnit").optional().isIn(enumValues(QUANTITY_UNITS)),
  body("estimatedMeals").optional().isInt({ min: 0 }),
  body("beneficiaries").optional().isInt({ min: 0 }),
  body("priority").optional().isIn(enumValues(DONATION_PRIORITY)),
  body("requiredDate").optional().isISO8601().toDate(),
  body("neededBy").optional().isISO8601().toDate(),
  body("location").optional().trim().isLength({ max: 300 }),
  body("specialRequirements").optional().trim().isLength({ max: 1000 }),
  body("description").optional().trim().isLength({ max: 2000 }),
];

export const updateFoodRequestValidator = [
  param("id").isMongoId().withMessage("Invalid food request ID"),
  ...createFoodRequestValidator.map((rule) => {
    if (rule.builder?.fields?.[0] === "foodItem") {
      return body("foodItem").optional().trim().isLength({ max: 200 });
    }
    return rule;
  }),
];

export const cancelFoodRequestValidator = [
  param("id").isMongoId().withMessage("Invalid food request ID"),
  body("reason").optional().trim().isLength({ max: 500 }),
];

export default {
  foodRequestIdValidator,
  createFoodRequestValidator,
  updateFoodRequestValidator,
  cancelFoodRequestValidator,
};
