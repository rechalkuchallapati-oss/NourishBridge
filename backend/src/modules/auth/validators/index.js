import { body } from "express-validator";
import { USER_ROLES, DONOR_TYPES, VEHICLE_TYPES, enumValues } from "../../../constants/enums.js";
import { PUBLIC_REGISTER_ROLES } from "../constants/roles.js";
import {
  emailField,
  passwordField,
  confirmPasswordField,
  phoneField,
  refreshTokenField,
  otpField,
} from "./common.rules.js";

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

  emailField(),
  passwordField(),
  confirmPasswordField(),
  phoneField(),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(PUBLIC_REGISTER_ROLES)
    .withMessage(`Role must be one of: ${PUBLIC_REGISTER_ROLES.join(", ")}`),

  ...addressRules,

  body("profile.donorType")
    .optional()
    .isIn(enumValues(DONOR_TYPES))
    .withMessage("Invalid donor type"),

  body("profile.organizationName")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Organization name cannot exceed 150 characters"),

  body("profile.vehicleType")
    .optional()
    .isIn(enumValues(VEHICLE_TYPES))
    .withMessage("Invalid vehicle type"),

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

export const loginValidator = [emailField(), body("password").notEmpty().withMessage("Password is required")];

export const refreshTokenValidator = [refreshTokenField()];
export const logoutValidator = [refreshTokenField()];

export const forgotPasswordValidator = [emailField()];
export const resetPasswordValidator = [
  emailField(),
  otpField(),
  passwordField(),
  confirmPasswordField(),
];

export default {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  logoutValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
