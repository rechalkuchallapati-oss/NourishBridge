export const VERIFY_OTP_PATH = "/verify-otp";
export const VERIFY_CONTACT_KEY = "verifyContact";
export const PENDING_SIGNUP_ROLE_KEY = "nb_pending_signup_role";

export const OTP_LENGTH = 6;

export const RESEND_COOLDOWN_SECONDS = 60;

export const OTP_VALIDITY_SECONDS = 300;

export const DEMO_VALID_OTP = "123456";

export function setPendingSignupRole(role) {
  if (role) {
    sessionStorage.setItem(PENDING_SIGNUP_ROLE_KEY, role);
  }
}

export function getPendingSignupRole() {
  return sessionStorage.getItem(PENDING_SIGNUP_ROLE_KEY);
}

export function clearPendingSignupRole() {
  sessionStorage.removeItem(PENDING_SIGNUP_ROLE_KEY);
}

export function goToVerifyOtp(navigate, contact) {
  const payload = { ...contact, role: contact.role || getPendingSignupRole() || contact.role };
  sessionStorage.setItem(VERIFY_CONTACT_KEY, JSON.stringify(payload));
  if (payload.role) {
    setPendingSignupRole(payload.role);
  }
  navigate(VERIFY_OTP_PATH, { state: payload });
}

export function readVerifyContact(locationState) {
  let stored = {};

  try {
    const raw = sessionStorage.getItem(VERIFY_CONTACT_KEY);
    stored = raw ? JSON.parse(raw) : {};
  } catch {
    stored = {};
  }

  const merged = {
    ...stored,
    ...(locationState ?? {}),
  };

  if (!merged.role) {
    merged.role = getPendingSignupRole() ?? stored.role ?? locationState?.role ?? null;
  }

  return merged;
}

export function clearVerifyContact() {
  sessionStorage.removeItem(VERIFY_CONTACT_KEY);
  clearPendingSignupRole();
}
