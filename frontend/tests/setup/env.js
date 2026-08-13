/**
 * Integration test environment — points frontend API clients at the running backend.
 */
process.env.VITE_API_BASE_URL =
  process.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api/v1";
