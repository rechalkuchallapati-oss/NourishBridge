import { body } from "express-validator";
import {
  DONOR_TYPES,
  VEHICLE_TYPES,
  ADMIN_LEVELS,
  ADMIN_PERMISSIONS,
  NGO_AVAILABILITY_STATUS,
  enumValues,
} from "../../../constants/enums.js";

const addressRules = [
  body("common.address.line1").optional().trim().isLength({ max: 200 }),
  body("common.address.line2").optional().trim().isLength({ max: 200 }),
  body("common.address.city").optional().trim().isLength({ max: 100 }),
  body("common.address.state").optional().trim().isLength({ max: 100 }),
  body("common.address.pincode").optional().trim().matches(/^\d{6}$/).withMessage("Pincode must be 6 digits"),
  body("common.address.country").optional().trim().isLength({ max: 100 }),
];

export const updateProfileValidator = [
  body("common.fullName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),
  body("common.phone")
    .optional()
    .trim()
    .custom((value) => {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        throw new Error("Phone number must contain 10–15 digits");
      }
      return true;
    }),
  ...addressRules,

  body("roleProfile.donorType")
    .optional()
    .isIn(enumValues(DONOR_TYPES))
    .withMessage("Invalid donor type"),
  body("roleProfile.organizationName").optional().trim().isLength({ max: 150 }),
  body("roleProfile.contactPerson").optional().trim().isLength({ max: 100 }),
  body("roleProfile.pickupLocations").optional().isArray(),

  body("roleProfile.ngoName").optional().trim().isLength({ max: 200 }),
  body("roleProfile.organizationName").optional().trim().isLength({ max: 200 }),
  body("roleProfile.registrationNumber").optional().trim().isLength({ max: 50 }),
  body("roleProfile.registrationId").optional().trim().isLength({ max: 50 }),
  body("roleProfile.serviceAreas").optional().isArray(),
  body("roleProfile.foodTypesAccepted").optional().isArray(),
  body("roleProfile.availabilityStatus")
    .optional()
    .isIn(enumValues(NGO_AVAILABILITY_STATUS)),

  body("roleProfile.vehicleType")
    .optional()
    .isIn(enumValues(VEHICLE_TYPES))
    .withMessage("Invalid vehicle type"),
  body("roleProfile.availabilitySchedule").optional().isArray(),
  body("roleProfile.serviceRadiusKm").optional().isFloat({ min: 0, max: 200 }),

  body("roleProfile.adminLevel")
    .optional()
    .isIn(enumValues(ADMIN_LEVELS)),
  body("roleProfile.permissions")
    .optional()
    .isArray()
    .custom((values) => {
      const allowed = enumValues(ADMIN_PERMISSIONS);
      if (!values.every((v) => allowed.includes(v))) {
        throw new Error("Invalid admin permission value");
      }
      return true;
    }),
];

export default { updateProfileValidator };
