import { body } from "express-validator";
import { USER_ROLES, DONOR_TYPES, VEHICLE_TYPES, enumValues } from "../constants/enums.js";

const PUBLIC_REGISTER_ROLES = [
  USER_ROLES.DONOR,
  USER_ROLES.VOLUNTEER,
  USER_ROLES.NGO,
];

const addressRules = [
  body("address.line1")
    .trim()
    .notEmpty()
    .withMessage("Address line 1 is required")
    .isLength({ max: 200 })
    .withMessage("Address line 1 cannot exceed 200 characters"),
  body("address.line2")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Address line 2 cannot exceed 200 characters"),
  body("address.city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isLength({ max: 100 })
    .withMessage("City cannot exceed 100 characters"),
  body("address.state")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 100 })
    .withMessage("State cannot exceed 100 characters"),
  body("address.pincode")
    .optional({ values: "null" })
    .trim()
    .matches(/^\d{6}$/)
    .withMessage("Pincode must be a 6-digit number"),
  body("address.country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country cannot exceed 100 characters"),
];

export const registerValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),

  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .custom((value) => {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        throw new Error("Phone number must contain 10–15 digits");
      }
      return true;
    }),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(PUBLIC_REGISTER_ROLES)
    .withMessage(`Role must be one of: ${PUBLIC_REGISTER_ROLES.join(", ")}`),

  ...addressRules,

  // Donor-specific optional profile fields
  body("profile.donorType")
    .optional()
    .isIn(enumValues(DONOR_TYPES))
    .withMessage("Invalid donor type"),

  body("profile.organizationName")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Organization name cannot exceed 150 characters"),

  // Volunteer-specific
  body("profile.vehicleType")
    .optional()
    .isIn(enumValues(VEHICLE_TYPES))
    .withMessage("Invalid vehicle type"),

  // NGO-specific — required when role is ngo
  body("profile.ngoName")
    .if(body("role").equals(USER_ROLES.NGO))
    .trim()
    .notEmpty()
    .withMessage("NGO name is required for NGO registration")
    .isLength({ max: 200 })
    .withMessage("NGO name cannot exceed 200 characters"),

  body("profile.registrationNumber")
    .if(body("role").equals(USER_ROLES.NGO))
    .trim()
    .notEmpty()
    .withMessage("Registration number is required for NGO registration")
    .isLength({ max: 50 })
    .withMessage("Registration number cannot exceed 50 characters"),
];

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

export const refreshTokenValidator = [
  body("refreshToken")
    .notEmpty()
    .withMessage("Refresh token is required")
    .isString()
    .withMessage("Refresh token must be a string"),
];

export const logoutValidator = [
  body("refreshToken")
    .notEmpty()
    .withMessage("Refresh token is required")
    .isString()
    .withMessage("Refresh token must be a string"),
];

export default {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  logoutValidator,
};
