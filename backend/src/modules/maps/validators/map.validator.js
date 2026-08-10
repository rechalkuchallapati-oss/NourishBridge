import { body, param } from "express-validator";

export const donationIdValidator = [param("donationId").isMongoId()];
export const deliveryIdValidator = [param("deliveryId").isMongoId()];

export const updateLocationValidator = [
  body("coordinates").isArray({ min: 2, max: 2 }),
  body("coordinates.*").isFloat(),
];

export const scanQrValidator = [
  param("id").isMongoId(),
  body("qrPayload").trim().notEmpty().isLength({ max: 500 }),
];

export default {
  donationIdValidator,
  deliveryIdValidator,
  updateLocationValidator,
  scanQrValidator,
};
