/**
 * Temporary signup payload passed from Create Account → Onboarding → Register API.
 */
const PENDING_SIGNUP_KEY = "nb_pending_signup";

export function savePendingSignup(payload) {
  sessionStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify(payload));
}

export function getPendingSignup() {
  try {
    const raw = sessionStorage.getItem(PENDING_SIGNUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingSignup() {
  sessionStorage.removeItem(PENDING_SIGNUP_KEY);
}

export default {
  savePendingSignup,
  getPendingSignup,
  clearPendingSignup,
};
