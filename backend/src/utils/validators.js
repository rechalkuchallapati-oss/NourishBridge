/**
 * Reusable field validators for Mongoose schemas.
 */

/** Basic email format — full validation happens at API layer with dedicated libraries */
export const emailValidator = {
  validator(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  },
  message: "Please provide a valid email address",
};

/** Phone — digits, spaces, +, - allowed; 10–15 digits core */
export const phoneValidator = {
  validator(v) {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  },
  message: "Phone number must contain 10–15 digits",
};

/** Non-negative number */
export const nonNegative = {
  validator(v) {
    return v >= 0;
  },
  message: "Value cannot be negative",
};

/** Positive number (> 0) */
export const positive = {
  validator(v) {
    return v > 0;
  },
  message: "Value must be greater than zero",
};

/** Rating 0–5 */
export const ratingValidator = {
  validator(v) {
    return v >= 0 && v <= 5;
  },
  message: "Rating must be between 0 and 5",
};

/** Percentage 0–100 */
export const percentValidator = {
  validator(v) {
    return v >= 0 && v <= 100;
  },
  message: "Percentage must be between 0 and 100",
};

/** Future date (for expiry fields on create) */
export const futureDate = {
  validator(v) {
    return v instanceof Date && v.getTime() > Date.now();
  },
  message: "Date must be in the future",
};

/** Indian pincode — 6 digits */
export const pincodeValidator = {
  validator(v) {
    return /^\d{6}$/.test(String(v));
  },
  message: "Pincode must be a 6-digit number",
};
