import HTTP_STATUS from "../constants/httpStatus.js";
import ApiResponse from "../utils/ApiResponse.js";
import authService from "../services/auth.service.js";

const getRequestMeta = (req) => ({
  userAgent: req.get("user-agent") || null,
  ipAddress: req.ip || req.connection?.remoteAddress || null,
});

/**
 * POST /api/v1/auth/register
 */
const register = async (req, res) => {
  const result = await authService.register(req.body, getRequestMeta(req));

  res.status(HTTP_STATUS.CREATED).json(
    ApiResponse.created("Registration successful", result),
  );
};

/**
 * POST /api/v1/auth/login
 */
const login = async (req, res) => {
  const result = await authService.login(req.body, getRequestMeta(req));

  res.status(HTTP_STATUS.OK).json(
    ApiResponse.ok("Login successful", result),
  );
};

/**
 * POST /api/v1/auth/refresh
 */
const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshAccessToken(refreshToken, getRequestMeta(req));

  res.status(HTTP_STATUS.OK).json(
    ApiResponse.ok("Token refreshed successfully", result),
  );
};

/**
 * POST /api/v1/auth/logout
 */
const logout = async (req, res) => {
  const { refreshToken } = req.body;
  const result = await authService.logout(refreshToken);

  res.status(HTTP_STATUS.OK).json(
    ApiResponse.ok(result.message),
  );
};

/**
 * GET /api/v1/auth/me — protected route example
 */
const getMe = async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  res.status(HTTP_STATUS.OK).json(
    ApiResponse.ok("User profile fetched", { user }),
  );
};

export default {
  register,
  login,
  refresh,
  logout,
  getMe,
};
