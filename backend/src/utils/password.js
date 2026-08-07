import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hash a plain-text password for secure storage.
 */
export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

/**
 * Compare plain password against stored bcrypt hash.
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  if (!hashedPassword) return false;
  return bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Strong password rules for registration.
 */
export const isStrongPassword = (password) => {
  if (typeof password !== "string" || password.length < 8) return false;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  return hasUpper && hasLower && hasDigit;
};

export default { hashPassword, comparePassword, isStrongPassword };
