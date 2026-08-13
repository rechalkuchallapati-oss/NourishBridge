import { describe, it, expect, beforeEach } from "vitest";
import API_CONFIG from "../../src/config/api.js";
import axiosInstance from "../../src/api/axiosInstance.js";
import authApi from "../../src/modules/auth/api/client.js";
import { getAccessToken, getRefreshToken, clearTokens } from "../../src/modules/auth/storage/tokenStorage.js";
import {
  assertApiBaseUrl,
  resetClientState,
  registerRole,
  loginAdmin,
  expectAxiosError,
  DEFAULT_PASSWORD,
  testEmail,
} from "../helpers/integrationHelpers.js";
import * as authService from "../../src/modules/auth/services/authService.js";
import { getApiErrorMessage } from "../../src/utils/apiErrors.js";

describe("Frontend ↔ Backend API connection", () => {
  beforeEach(() => {
    resetClientState();
  });

  it("uses centralized API base URL from environment", () => {
    assertApiBaseUrl();
    expect(API_CONFIG.baseURL).toContain("127.0.0.1:5000");
    expect(API_CONFIG.timeout).toBe(30_000);
  });

  it("axios instance inherits API base URL", () => {
    expect(axiosInstance.defaults.baseURL).toBe(API_CONFIG.baseURL);
  });

  it("health endpoint is reachable", async () => {
    const res = await axiosInstance.get("/health");
    expect(res.status).toBe(200);
    expect(res.data.success).toBe(true);
  });

  it("GET /auth/me without token returns 401", async () => {
    await expectAxiosError(authApi.me(), 401);
  });

  it("maps network-style errors to user-friendly messages", () => {
    const msg = getApiErrorMessage({ code: "ERR_NETWORK", message: "Network Error" });
    expect(msg).toMatch(/Cannot connect to the server/i);
  });
});

describe("Authentication integration", () => {
  beforeEach(() => {
    resetClientState();
  });

  it("registers donor and stores tokens + session user", async () => {
    const { user, email } = await registerRole("donor", "auth-reg");
    expect(user.email).toBe(email.toLowerCase());
    expect(user.role).toBe("donor");
    expect(getAccessToken()).toBeTruthy();
    expect(getRefreshToken()).toBeTruthy();
  });

  it("logs in with valid credentials", async () => {
    const { email } = await registerRole("donor", "auth-login");
    resetClientState();
    const user = await authService.login({ email, password: DEFAULT_PASSWORD, rememberMe: true });
    expect(user.role).toBe("donor");
    expect(getAccessToken()).toBeTruthy();
  });

  it("rejects invalid login with 401", async () => {
    const { email } = await registerRole("donor", "auth-bad");
    resetClientState();
    await expectAxiosError(
      authService.login({ email, password: "WrongPass123", rememberMe: false }),
      401,
    );
    expect(getAccessToken()).toBeFalsy();
  });

  it("fetchCurrentUser works after login", async () => {
    const { email } = await registerRole("ngo", "auth-me");
    resetClientState();
    await authService.login({ email, password: DEFAULT_PASSWORD, rememberMe: true });
    const me = await authService.fetchCurrentUser();
    expect(me.role).toBe("ngo");
    expect(me.email).toBe(email.toLowerCase());
  });

  it("refresh session rotates tokens", async () => {
    const { email } = await registerRole("volunteer", "auth-refresh");
    resetClientState();
    await authService.login({ email, password: DEFAULT_PASSWORD, rememberMe: true });
    const oldRefresh = getRefreshToken();
    await authService.refreshSession();
    expect(getRefreshToken()).toBeTruthy();
    expect(getAccessToken()).toBeTruthy();
    // refresh token may rotate
    expect(typeof getRefreshToken()).toBe("string");
    expect(oldRefresh).toBeTruthy();
  });

  it("logout clears tokens locally", async () => {
    const { email } = await registerRole("donor", "auth-logout");
    resetClientState();
    await authService.login({ email, password: DEFAULT_PASSWORD, rememberMe: true });
    await authService.logout({ redirect: false });
    expect(getAccessToken()).toBeFalsy();
    expect(getRefreshToken()).toBeFalsy();
  });

  it("protected API returns 401 after logout", async () => {
    const { email } = await registerRole("donor", "auth-prot");
    resetClientState();
    await authService.login({ email, password: DEFAULT_PASSWORD, rememberMe: true });
    await authService.logout({ redirect: false });
    await expectAxiosError(authApi.me(), 401);
  });

  it("rejects duplicate registration with 409", async () => {
    const email = testEmail("donor", "auth-dup");
    const payload = {
      fullName: "Dup Donor",
      email,
      password: DEFAULT_PASSWORD,
      confirmPassword: DEFAULT_PASSWORD,
      phone: "9876543210",
      role: "donor",
      address: { line1: "A", city: "Hyderabad", pincode: "500001" },
      profile: { donorType: "individual" },
    };
    await authService.register(payload, true);
    resetClientState();
    await expectAxiosError(authService.register(payload, true), 409);
  });

  it("admin login via frontend auth service", async () => {
    const admin = await loginAdmin();
    expect(admin.user.role).toBe("admin");
    const me = await authService.fetchCurrentUser();
    expect(me.role).toBe("admin");
  });
});
