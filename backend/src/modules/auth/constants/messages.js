export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: "Registration successful",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logged out successfully",
  REFRESH_SUCCESS: "Token refreshed successfully",
  PROFILE_FETCHED: "User profile fetched",
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_TAKEN: "Email is already registered",
  ACCOUNT_SUSPENDED: "Your account has been suspended",
  ACCOUNT_INACTIVE: "Your account is inactive",
  TOKEN_REQUIRED: "Access token required",
  USER_NOT_FOUND: "User account not found",
  REFRESH_INVALID: "Refresh token is invalid or has been revoked",
  REFRESH_EXPIRED: "Refresh token expired — please login again",
};

export const RESET_MESSAGES = {
  GENERIC_SENT: "If an account exists with this email, a reset code has been sent.",
  RESET_SUCCESS: "Password reset successful. You can now sign in with your new password.",
  INVALID_OTP: "Invalid or expired reset code",
  TOO_MANY_ATTEMPTS: "Too many failed attempts. Please request a new code.",
  EMAIL_SEND_FAILED: "Unable to send reset email. Please try again later.",
};

export default { AUTH_MESSAGES, RESET_MESSAGES };
