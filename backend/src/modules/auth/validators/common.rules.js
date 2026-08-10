import { body } from "express-validator";

/** Shared email validation rule */
export const emailField = (field = "email") =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail();

/** Strong password rules aligned with User model and frontend */
export const passwordField = (field = "password") =>
  body(field)
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number");

export const confirmPasswordField = () =>
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    });

export const phoneField = () =>
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
    });

export const refreshTokenField = () =>
  body("refreshToken")
    .notEmpty()
    .withMessage("Refresh token is required")
    .isString()
    .withMessage("Refresh token must be a string");

export const otpField = () =>
  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .matches(/^\d{6}$/)
    .withMessage("OTP must be a 6-digit number");

export default {
  emailField,
  passwordField,
  confirmPasswordField,
  phoneField,
  refreshTokenField,
  otpField,
};
