import HTTP_STATUS from "../constants/httpStatus.js";
import ApiResponse from "../utils/ApiResponse.js";
import volunteerService from "../services/volunteer.service.js";

/**
 * GET /api/v1/volunteer/dashboard
 */
const getDashboard = async (req, res) => {
  const dashboard = await volunteerService.getDashboard(req.user.id);

  res.status(HTTP_STATUS.OK).json(
    ApiResponse.ok("Volunteer dashboard fetched", dashboard),
  );
};

export default { getDashboard };
