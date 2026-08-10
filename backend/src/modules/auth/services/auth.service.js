/**
 * Auth service facade — single entry point for controllers and legacy imports.
 */
import { registerUser } from "./registration.service.js";
import {
  loginUser,
  refreshSession,
  logoutUser,
  getCurrentUser,
} from "./session.service.js";
import { requestPasswordReset, resetPassword } from "./passwordReset.service.js";
import { sanitizeUser } from "../utils/sanitizeUser.js";

export default {
  register: registerUser,
  login: loginUser,
  refreshAccessToken: refreshSession,
  logout: logoutUser,
  getCurrentUser,
  requestPasswordReset,
  resetPassword,
  sanitizeUser,
};
