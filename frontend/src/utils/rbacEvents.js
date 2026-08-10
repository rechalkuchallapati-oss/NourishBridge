/**
 * RBAC events — API 403 responses can trigger the forbidden page.
 */
export const ACCESS_DENIED_EVENT = "nb:access-denied";

export function emitAccessDenied(detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ACCESS_DENIED_EVENT, { detail }));
}

export default { ACCESS_DENIED_EVENT, emitAccessDenied };
