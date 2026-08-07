/**
 * Standardized success response envelope for all API endpoints.
 */
class ApiResponse {
  constructor(statusCode, message, data = null, meta = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    if (data !== null) this.data = data;
    if (meta !== null) this.meta = meta;
  }

  static ok(message = "Success", data = null, meta = null) {
    return new ApiResponse(200, message, data, meta);
  }

  static created(message = "Created", data = null) {
    return new ApiResponse(201, message, data);
  }
}

export default ApiResponse;
