import ApiResponse from "./ApiResponse.js";
import HTTP_STATUS from "../constants/httpStatus.js";

/**
 * Send a consistent success response envelope.
 */
export function sendOk(res, message = "Success", data = null, meta = null) {
  return res.status(HTTP_STATUS.OK).json(ApiResponse.ok(message, data, meta));
}

export function sendCreated(res, message = "Created", data = null) {
  return res.status(HTTP_STATUS.CREATED).json(ApiResponse.created(message, data));
}

export default { sendOk, sendCreated };
