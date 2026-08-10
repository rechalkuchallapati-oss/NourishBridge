import authService from "./services/auth.service.js";
import passwordResetService from "./services/passwordReset.service.js";
import { sendOk, sendCreated } from "../../utils/responseHandler.js";
import { AUTH_MESSAGES } from "./constants/messages.js";

const register = async (req, res) => {
  const result = await authService.register(req.body, req.requestMeta);
  sendCreated(res, AUTH_MESSAGES.REGISTER_SUCCESS, result);
};

const login = async (req, res) => {
  const result = await authService.login(req.body, req.requestMeta);
  sendOk(res, AUTH_MESSAGES.LOGIN_SUCCESS, result);
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshAccessToken(refreshToken, req.requestMeta);
  sendOk(res, AUTH_MESSAGES.REFRESH_SUCCESS, result);
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.logout(refreshToken);
  sendOk(res, result.message);
};

const getMe = async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  sendOk(res, AUTH_MESSAGES.PROFILE_FETCHED, { user });
};

const forgotPassword = async (req, res) => {
  const result = await passwordResetService.requestPasswordReset(
    req.body.email,
    req.requestMeta,
  );

  sendOk(res, result.message, { expiresInMinutes: result.expiresInMinutes });
};

const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;
  const result = await passwordResetService.resetPassword({ email, otp, password });
  sendOk(res, result.message);
};

export default {
  register,
  login,
  refresh,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
};
