import HTTP_STATUS from "../constants/httpStatus.js";
import ApiResponse from "../utils/ApiResponse.js";
import donorService from "../services/donor.service.js";

/**
 * GET /api/v1/donor/dashboard
 */
const getDashboard = async (req, res) => {
  const dashboard = await donorService.getDashboard(req.user.id);

  res.status(HTTP_STATUS.OK).json(
    ApiResponse.ok("Donor dashboard fetched", dashboard),
  );
};

export default { getDashboard };
