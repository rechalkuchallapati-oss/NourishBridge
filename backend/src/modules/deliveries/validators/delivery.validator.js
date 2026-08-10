import { body, param } from "express-validator";
import { DELIVERY_ACTIONS } from "../constants/transitions.js";

const ADVANCE_ACTIONS = Object.values(DELIVERY_ACTIONS);

export const deliveryIdValidator = [param("id").isMongoId()];

export const donationIdParamValidator = [param("donationId").isMongoId()];

export const advanceDeliveryValidator = [
  param("id").isMongoId(),
  body("action").isIn(ADVANCE_ACTIONS),
  body("quantity").optional().isFloat({ min: 0 }),
  body("location.coordinates").optional().isArray({ min: 2, max: 2 }),
  body("notes").optional().trim().isLength({ max: 500 }),
  body("verificationCode").optional().trim().isLength({ max: 20 }),
  body("scheduledAt").optional().isISO8601(),
];

export const proofTypeValidator = [
  param("id").isMongoId(),
  param("proofType").isIn(["pickup", "delivery"]),
];

export const scanQrValidator = [
  param("id").isMongoId(),
  body("qrPayload").trim().notEmpty().isLength({ max: 500 }),
];

export default {
  deliveryIdValidator,
  donationIdParamValidator,
  advanceDeliveryValidator,
  proofTypeValidator,
  scanQrValidator,
};
