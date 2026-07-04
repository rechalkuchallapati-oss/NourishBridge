export const VERIFY_OTP_PATH = "/verify-otp";

export const OTP_LENGTH = 6;

export const RESEND_COOLDOWN_SECONDS = 60;

export const OTP_VALIDITY_SECONDS = 300;

export const DEMO_VALID_OTP = "123456";

export function goToVerifyOtp(navigate, contact) {
  sessionStorage.setItem("verifyContact", JSON.stringify(contact));
  navigate(VERIFY_OTP_PATH, { state: contact });
}

export function readVerifyContact(locationState) {
  if (locationState?.email || locationState?.phone) {
    return locationState;
  }

  try {
    const stored = sessionStorage.getItem("verifyContact");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
