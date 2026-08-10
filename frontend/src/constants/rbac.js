/**
 * Role constants and helpers for frontend RBAC.
 */
export const ROLES = Object.freeze({
  ADMIN: "admin",
  DONOR: "donor",
  VOLUNTEER: "volunteer",
  NGO: "ngo",
});

export const ROLE_LABELS = Object.freeze({
  admin: "Administrator",
  donor: "Donor",
  volunteer: "Volunteer",
  ngo: "NGO",
});

/** URL prefix each role owns — used to detect cross-role access attempts */
export const ROLE_ROUTE_PREFIXES = Object.freeze({
  admin: "/dashboard/admin",
  donor: "/dashboard/donor",
  volunteer: "/dashboard/volunteer",
  ngo: "/dashboard/ngo",
});

/**
 * Returns true when the user's role is in the allowed list.
 */
export function isRoleAllowed(userRole, allowedRoles = []) {
  if (!allowedRoles.length) return true;
  return allowedRoles.includes(userRole);
}

/**
 * Detect which dashboard role owns a pathname.
 */
export function getRequiredRoleForPath(pathname = "") {
  if (pathname.startsWith(ROLE_ROUTE_PREFIXES.admin)) return ROLES.ADMIN;
  if (pathname.startsWith(ROLE_ROUTE_PREFIXES.donor)) return ROLES.DONOR;
  if (pathname.startsWith(ROLE_ROUTE_PREFIXES.volunteer)) return ROLES.VOLUNTEER;
  if (pathname.startsWith(ROLE_ROUTE_PREFIXES.ngo)) return ROLES.NGO;
  return null;
}

export default {
  ROLES,
  ROLE_LABELS,
  ROLE_ROUTE_PREFIXES,
  isRoleAllowed,
  getRequiredRoleForPath,
};
