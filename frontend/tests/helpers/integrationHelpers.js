import API_CONFIG from "../../src/config/api.js";
import { clearTokens } from "../../src/modules/auth/storage/tokenStorage.js";
import { clearSessionUser } from "../../src/utils/authStorage.js";
import * as authService from "../../src/modules/auth/services/authService.js";

export const DEFAULT_PASSWORD = "ValidPass123";
export const ADMIN_PASSWORD = "AdminPass123";
export const RUN_ID = `fe_${Date.now()}`;

export function testEmail(role, suffix = "main") {
  return `fe.integ.${role}.${suffix}.${RUN_ID}@test.nourishbridge.local`;
}

export function resetClientState() {
  sessionStorage.clear();
  localStorage.clear();
}

export function futureIso(hours = 24) {
  return new Date(Date.now() + hours * 3600 * 1000).toISOString();
}

export function donationPayload(overrides = {}) {
  return {
    foodName: "Frontend Integration Meal",
    category: "cooked_meals",
    quantity: 10,
    quantityUnit: "kg",
    estimatedMeals: 50,
    expiryTime: futureIso(12),
    pickupScheduledAt: futureIso(2),
    pickupEndAt: futureIso(4),
    pickupAddress: {
      line1: "Pickup Lane",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500001",
    },
    ...overrides,
  };
}

export async function registerRole(role, suffix = role) {
  const email = testEmail(role, suffix);
  const base = {
    fullName: `FE Test ${role}`,
    email,
    password: DEFAULT_PASSWORD,
    confirmPassword: DEFAULT_PASSWORD,
    phone: "9876543210",
    role,
    address: {
      line1: "123 Test St",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
      country: "India",
    },
  };

  let payload = base;
  if (role === "donor") {
    payload = { ...base, profile: { donorType: "individual" } };
  } else if (role === "ngo") {
    payload = {
      ...base,
      profile: {
        ngoName: `FE NGO ${suffix}`,
        registrationNumber: `FE-NGO-${suffix}-${RUN_ID}`,
      },
    };
  } else if (role === "volunteer") {
    payload = { ...base, profile: { vehicleType: "bike" } };
  }

  const user = await authService.register(payload, true);
  return { email, user, password: DEFAULT_PASSWORD };
}

export async function loginAdmin() {
  resetClientState();
  const email = process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local";
  const user = await authService.login({
    email,
    password: ADMIN_PASSWORD,
    rememberMe: true,
  });
  return { email, user, password: ADMIN_PASSWORD };
}

export async function loginAs(email, password = DEFAULT_PASSWORD) {
  resetClientState();
  const user = await authService.login({ email, password, rememberMe: true });
  return user;
}

export async function loginAccount(account) {
  if (account.user?.role === "admin" || account.password === ADMIN_PASSWORD) {
    resetClientState();
    return authService.login({
      email: account.email,
      password: ADMIN_PASSWORD,
      rememberMe: true,
    });
  }
  return loginAs(account.email, account.password || DEFAULT_PASSWORD);
}

export function assertApiBaseUrl() {
  expect(API_CONFIG.baseURL).toMatch(/\/api\/v1\/?$/);
}

export async function expectAxiosError(promise, status) {
  try {
    await promise;
    throw new Error(`Expected HTTP ${status} but request succeeded`);
  } catch (error) {
    expect(error.response?.status).toBe(status);
    return error;
  }
}

export async function advanceMissionThroughDelivery(volunteerApi, donationId) {
  const actions = ["schedule_pickup", "mark_picked_up", "mark_in_transit", "mark_delivered"];
  for (const action of actions) {
    await volunteerApi.advanceMission(donationId, { action });
  }
}
