export const SESSION_EXPIRED_EVENT = "nb:session-expired";
export const SESSION_RESTORED_EVENT = "nb:session-restored";

export function emitSessionExpired(detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT, { detail }));
}

export function emitSessionRestored(detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SESSION_RESTORED_EVENT, { detail }));
}

export default {
  SESSION_EXPIRED_EVENT,
  SESSION_RESTORED_EVENT,
  emitSessionExpired,
  emitSessionRestored,
};
