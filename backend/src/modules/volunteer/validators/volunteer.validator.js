import { body, param } from "express-validator";
import { DELIVERY_ACTIONS } from "../../deliveries/constants/transitions.js";
import { DONATION_ACTIONS } from "../../donations/constants/transitions.js";

const ADVANCE_ACTIONS = [
  ...Object.values(DELIVERY_ACTIONS),
  DONATION_ACTIONS.SCHEDULE_PICKUP,
  DONATION_ACTIONS.MARK_PICKED_UP,
  DONATION_ACTIONS.MARK_IN_TRANSIT,
  DONATION_ACTIONS.MARK_DELIVERED,
];

export const missionIdValidator = [param("id").isMongoId().withMessage("Invalid mission ID")];

export const rejectMissionValidator = [
  param("id").isMongoId().withMessage("Invalid mission ID"),
  body("reason").optional().trim().isLength({ max: 500 }),
];

export const advanceMissionValidator = [
  param("id").isMongoId().withMessage("Invalid mission ID"),
  body("action").isIn(ADVANCE_ACTIONS).withMessage("Invalid mission action"),
  body("quantity").optional().isFloat({ min: 0 }),
  body("location.coordinates").optional().isArray({ min: 2, max: 2 }),
  body("notes").optional().trim().isLength({ max: 500 }),
  body("verificationCode").optional().trim().isLength({ max: 20 }),
  body("scheduledAt").optional().isISO8601(),
];

export default { missionIdValidator, rejectMissionValidator, advanceMissionValidator };
