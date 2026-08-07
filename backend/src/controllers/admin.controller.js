import HTTP_STATUS from "../constants/httpStatus.js";
import ApiResponse from "../utils/ApiResponse.js";
import adminService from "../services/admin.service.js";

/**
 * GET /api/v1/admin/dashboard
 */
const getDashboard = async (_req, res) => {
  const dashboard = await adminService.getDashboard();

  res.status(HTTP_STATUS.OK).json(
    ApiResponse.ok("Admin dashboard fetched", dashboard),
  );
};

export default { getDashboard };
