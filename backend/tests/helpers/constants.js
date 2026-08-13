export const API_PREFIX = "/api/v1";
export const DEFAULT_PASSWORD = "ValidPass123";
export const ADMIN_PASSWORD = "AdminPass123";

export const DASHBOARD_PATHS = {
  admin: "/admin/dashboard",
  donor: "/donor/dashboard",
  ngo: "/ngo/dashboard",
  volunteer: "/volunteer/dashboard",
};

export const TEST_ADDRESS = {
  line1: "123 Test Street",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "500081",
  country: "India",
};

export function getRunId() {
  return process.env.NB_TEST_RUN_ID || globalThis.__NB_TEST_RUN_ID__ || "local";
}

export function testEmail(role, suffix = "main") {
  const runId = getRunId();
  return `suite.${role}.${suffix}.${runId}@test.nourishbridge.local`;
}

export function futureIso(hours = 24) {
  return new Date(Date.now() + hours * 3600 * 1000).toISOString();
}

export function pastIso(hours = 1) {
  return new Date(Date.now() - hours * 3600 * 1000).toISOString();
}
