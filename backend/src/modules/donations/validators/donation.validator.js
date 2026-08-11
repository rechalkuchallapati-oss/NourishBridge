import { body, param, query } from "express-validator";
import {
  DONATION_STATUS,
  DONATION_PRIORITY,
  FOOD_CATEGORIES,
  QUANTITY_UNITS,
  FOOD_FRESHNESS,
  enumValues,
} from "../../../constants/enums.js";

const addressRules = [
  body("pickupAddress.line1").trim().notEmpty().withMessage("Pickup address line 1 is required"),
  body("pickupAddress.city").trim().notEmpty().withMessage("Pickup city is required"),
  body("pickupAddress.state").optional().trim(),
  body("pickupAddress.pincode").optional().trim().matches(/^\d{6}$/).withMessage("Pincode must be 6 digits"),
  body("pickupAddress.country").optional().trim(),
];

export const createDonationValidator = [
  body("foodName").trim().notEmpty().withMessage("Food name is required").isLength({ max: 200 }),
  body("foodType").optional().trim().isLength({ max: 200 }),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn(enumValues(FOOD_CATEGORIES))
    .withMessage("Invalid food category"),
  body("quantity").isFloat({ min: 0.01 }).withMessage("Quantity must be positive"),
  body("quantityUnit").optional().isIn(enumValues(QUANTITY_UNITS)),
  body("estimatedMeals").optional().isInt({ min: 0 }),
  body("freshness").optional().isIn(enumValues(FOOD_FRESHNESS)),
  body("preparationTime").optional().isISO8601().toDate(),
  body("expiryTime")
    .notEmpty()
    .withMessage("Expiry time is required")
    .isISO8601()
    .toDate()
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Expiry time must be in the future");
      }
      return true;
    }),
  body("pickupScheduledAt").optional().isISO8601().toDate(),
  body("pickupEndAt").optional().isISO8601().toDate(),
  body("pickupLocation.coordinates").optional().isArray({ min: 2, max: 2 }),
  body("notes").optional().trim().isLength({ max: 2000 }),
  body("dietType").optional().trim().isLength({ max: 50 }),
  body("packagingStatus").optional().trim().isLength({ max: 200 }),
  body("allergenInfo").optional().trim().isLength({ max: 500 }),
  body("priority").optional().isIn(enumValues(DONATION_PRIORITY)),
  body("items").optional().isArray({ max: 50 }),
  ...addressRules,
];

export const updateDonationValidator = [
  param("id").isMongoId().withMessage("Invalid donation ID"),
  body("foodName").optional().trim().isLength({ max: 200 }),
  body("foodType").optional().trim().isLength({ max: 200 }),
  body("category").optional().isIn(enumValues(FOOD_CATEGORIES)),
  body("quantity").optional().isFloat({ min: 0.01 }),
  body("quantityUnit").optional().isIn(enumValues(QUANTITY_UNITS)),
  body("estimatedMeals").optional().isInt({ min: 0 }),
  body("freshness").optional().isIn(enumValues(FOOD_FRESHNESS)),
  body("preparationTime").optional().isISO8601().toDate(),
  body("expiryTime").optional().isISO8601().toDate(),
  body("pickupScheduledAt").optional().isISO8601().toDate(),
  body("pickupEndAt").optional().isISO8601().toDate(),
  body("notes").optional().trim().isLength({ max: 2000 }),
  body("dietType").optional().trim().isLength({ max: 50 }),
  body("packagingStatus").optional().trim().isLength({ max: 200 }),
  body("allergenInfo").optional().trim().isLength({ max: 500 }),
  body("status")
    .optional()
    .isIn([DONATION_STATUS.CANCELLED])
    .withMessage("Donors may only cancel donations"),
  body("pickupAddress.line1").optional().trim().notEmpty(),
  body("pickupAddress.city").optional().trim().notEmpty(),
];

export const donationIdValidator = [
  param("id").isMongoId().withMessage("Invalid donation ID"),
];

export const listMyDonationsValidator = [
  query("status").optional().isString(),
  query("active").optional().isIn(["true", "false"]),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

export default {
  createDonationValidator,
  updateDonationValidator,
  donationIdValidator,
  listMyDonationsValidator,
};
