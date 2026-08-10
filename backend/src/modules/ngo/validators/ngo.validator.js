import { body, param } from "express-validator";

export const donationIdValidator = [
  param("id").isMongoId().withMessage("Invalid donation ID"),
];

export const rejectDonationValidator = [
  param("id").isMongoId().withMessage("Invalid donation ID"),
  body("reason").trim().notEmpty().withMessage("Rejection reason is required").isLength({ max: 500 }),
];

export const beneficiaryValidator = [
  param("id").optional().isMongoId(),
  body("name").optional().trim().notEmpty().isLength({ max: 200 }),
  body("category").optional().trim().isLength({ max: 100 }),
  body("contactPhone").optional().trim().isLength({ max: 20 }),
  body("address").optional().trim().isLength({ max: 500 }),
  body("householdSize").optional().isInt({ min: 1 }),
  body("mealsServed").optional().isInt({ min: 0 }),
  body("isActive").optional().isBoolean(),
  body("notes").optional().trim().isLength({ max: 1000 }),
];

export const distributeInventoryValidator = [
  param("id").isMongoId().withMessage("Invalid inventory ID"),
  body("quantity").optional().isFloat({ min: 0.01 }),
  body("notes").optional().trim().isLength({ max: 1000 }),
];

export default {
  donationIdValidator,
  rejectDonationValidator,
  beneficiaryValidator,
  distributeInventoryValidator,
};
