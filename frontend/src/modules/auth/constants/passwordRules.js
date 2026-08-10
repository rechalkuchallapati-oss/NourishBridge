/**
 * Shared password validation rules — aligned with backend auth validators.
 */
export const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: /[A-Z]/,
  requireLowercase: /[a-z]/,
  requireDigit: /\d/,
};

export function validatePassword(password) {
  if (!password || password.length < PASSWORD_RULES.minLength) {
    return "Password must be at least 8 characters.";
  }
  if (!PASSWORD_RULES.requireUppercase.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!PASSWORD_RULES.requireLowercase.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!PASSWORD_RULES.requireDigit.test(password)) {
    return "Password must contain at least one number.";
  }
  return null;
}

export default { PASSWORD_RULES, validatePassword };
