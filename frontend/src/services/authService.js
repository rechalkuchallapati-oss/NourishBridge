import authApi from "../api/authApi.js";
import {
  saveTokens,
  getRefreshToken,
  clearTokens,
  isRememberMeEnabled,
} from "../utils/tokenStorage.js";
import {
  setSessionUser,
  clearSessionUser,
  saveDonorProfile,
  saveNgoProfile,
  saveVolunteerProfile,
  saveRegisteredUser,
} from "../utils/authStorage.js";
import { clearPendingSignup, getPendingSignup } from "../utils/pendingSignup.js";

const DONOR_TYPE_MAP = {
  restaurant: "restaurant",
  hotel: "hotel",
  caterer: "catering",
  event_organizer: "event",
  individual: "individual",
};

/**
 * Sync backend user into existing session/profile storage used by dashboards.
 */
function persistUserSession(user, rememberMe = false) {
  const sessionUser = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone ?? "",
    role: user.role,
    status: user.status,
  };

  setSessionUser(sessionUser);
  saveRegisteredUser(sessionUser);

  if (user.role === "donor") {
    saveDonorProfile({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone ?? "",
    });
  }

  if (user.role === "ngo") {
    saveNgoProfile({
      organizationName: user.fullName,
      email: user.email,
      phone: user.phone ?? "",
    });
  }

  if (user.role === "volunteer") {
    saveVolunteerProfile({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone ?? "",
    });
  }

  return sessionUser;
}

function applyAuthResponse(data, rememberMe = false) {
  const { user, accessToken, refreshToken } = data;
  saveTokens({ accessToken, refreshToken }, rememberMe);
  return persistUserSession(user, rememberMe);
}

/**
 * Login with email and password.
 */
export async function login({ email, password, rememberMe = false }) {
  const { data } = await authApi.login({ email: email.trim(), password });
  return applyAuthResponse(data.data, rememberMe);
}

/**
 * Register a new account via the backend.
 */
export async function register(payload, rememberMe = true) {
  const { data } = await authApi.register(payload);
  clearPendingSignup();
  return applyAuthResponse(data.data, rememberMe);
}

/**
 * Build register payload from pending signup + onboarding fields.
 */
export function buildRegisterPayload(pending, onboarding = {}) {
  const base = {
    fullName: pending.fullName,
    email: pending.email,
    password: pending.password,
    confirmPassword: pending.confirmPassword,
    phone: pending.phone,
    role: pending.role,
  };

  if (pending.role === "donor") {
    const donorTypeId = onboarding.donorTypeId || "individual";
    const donorType = DONOR_TYPE_MAP[donorTypeId] || "individual";

    return {
      ...base,
      address: {
        line1: onboarding.pickupLocation || onboarding.addressLine1 || "Address pending",
        city: onboarding.city || "Hyderabad",
        state: onboarding.state || "Telangana",
        pincode: onboarding.pincode || "500001",
        country: "India",
      },
      profile: {
        donorType,
        organizationName: onboarding.organizationName,
      },
    };
  }

  if (pending.role === "ngo") {
    return {
      ...base,
      address: {
        line1: onboarding.addressLine1 || onboarding.address || "NGO address",
        city: onboarding.city || onboarding.serviceArea || "Hyderabad",
        state: onboarding.state || "Telangana",
        pincode: onboarding.pincode || "500001",
        country: "India",
      },
      profile: {
        ngoName: onboarding.ngoName || onboarding.organizationName,
        registrationNumber: onboarding.registrationNumber,
      },
    };
  }

  if (pending.role === "volunteer") {
    return {
      ...base,
      address: {
        line1: onboarding.city || "Volunteer location",
        city: onboarding.city || "Hyderabad",
        state: onboarding.state || "Telangana",
        pincode: onboarding.pincode || "500001",
        country: "India",
      },
      profile: {
        vehicleType: onboarding.vehicleType || "bike",
      },
    };
  }

  return base;
}

/**
 * Register using pending signup stored during account creation flow.
 */
export async function registerFromOnboarding(onboardingFields) {
  const pending = getPendingSignup();

  if (!pending?.email || !pending?.password) {
    throw new Error("Signup session expired. Please create your account again.");
  }

  const payload = buildRegisterPayload(pending, onboardingFields);
  return register(payload, true);
}

/**
 * Refresh access token using stored refresh token.
 */
export async function refreshSession() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const { data } = await authApi.refresh(refreshToken);
  return applyAuthResponse(data.data, isRememberMeEnabled());
}

/**
 * Fetch current user profile (validates access token).
 */
export async function fetchCurrentUser() {
  const { data } = await authApi.me();
  const user = data.data.user;
  persistUserSession(user, isRememberMeEnabled());
  return user;
}

/**
 * Revoke refresh token on the server and clear local session.
 */
export async function logout({ redirect = false } = {}) {
  const refreshToken = getRefreshToken();

  try {
    if (refreshToken) {
      await authApi.logout(refreshToken);
    }
  } catch {
    /* proceed with local cleanup even if server logout fails */
  }

  clearTokens();
  clearSessionUser();
  clearPendingSignup();

  if (redirect && typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

/**
 * Client-side password rules aligned with backend validator.
 */
export function validatePassword(password) {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number.";
  }
  return null;
}

export default {
  login,
  register,
  registerFromOnboarding,
  buildRegisterPayload,
  refreshSession,
  fetchCurrentUser,
  logout,
  validatePassword,
};
