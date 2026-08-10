import { USER_ROLES } from "./enums.js";

/**
 * RBAC — maps each role to its protected API namespace.
 * Every role-scoped router applies authenticate + authorize for that role only.
 */
export const ROLE_API_PREFIXES = Object.freeze({
  [USER_ROLES.ADMIN]: "/admin",
  [USER_ROLES.DONOR]: "/donor",
  [USER_ROLES.VOLUNTEER]: "/volunteer",
  [USER_ROLES.NGO]: "/ngo",
});

/**
 * Roles a user may access for a given API prefix (single-role isolation).
 */
export const API_PREFIX_ROLES = Object.freeze({
  "/admin": [USER_ROLES.ADMIN],
  "/donor": [USER_ROLES.DONOR],
  "/volunteer": [USER_ROLES.VOLUNTEER],
  "/ngo": [USER_ROLES.NGO],
});

export default {
  ROLE_API_PREFIXES,
  API_PREFIX_ROLES,
};
