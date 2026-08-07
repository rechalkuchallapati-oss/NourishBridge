import HTTP_STATUS from "../constants/httpStatus.js";
import ApiResponse from "../utils/ApiResponse.js";
import healthService from "../services/health.service.js";

/**
 * GET /api/v1/health
 */
const getHealth = async (_req, res) => {
  const health = await healthService.getHealthStatus();
  const statusCode =
    health.status === "ok" ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE;

  res.status(statusCode).json(
    ApiResponse.ok("NourishBridge API is running", health),
  );
};

export default { getHealth };
