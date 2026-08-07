import HTTP_STATUS from "../constants/httpStatus.js";
import ApiResponse from "../utils/ApiResponse.js";
import ngoService from "../services/ngo.service.js";

/**
 * GET /api/v1/ngo/dashboard
 */
const getDashboard = async (req, res) => {
  const dashboard = await ngoService.getDashboard(req.user.id);

  res.status(HTTP_STATUS.OK).json(
    ApiResponse.ok("NGO dashboard fetched", dashboard),
  );
};

export default { getDashboard };
