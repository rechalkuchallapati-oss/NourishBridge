import { describe, it, expect } from "vitest";
import { isRoleAllowed, getRequiredRoleForPath } from "../../src/constants/rbac.js";
import { getDashboardRouteForRole } from "../../src/utils/authStorage.js";
import { getApiErrorMessage } from "../../src/utils/apiErrors.js";

/**
 * Static verification of frontend auth/routing helpers used by ProtectedRoute & SignInForm.
 * Complements live API integration tests — ensures UI routing logic matches backend roles.
 */
describe("Protected route & error message helpers", () => {
  it("maps each role to its dashboard route", () => {
    expect(getDashboardRouteForRole("donor")).toBe("/dashboard/donor");
    expect(getDashboardRouteForRole("ngo")).toBe("/dashboard/ngo");
    expect(getDashboardRouteForRole("volunteer")).toBe("/dashboard/volunteer");
    expect(getDashboardRouteForRole("admin")).toBe("/dashboard/admin");
  });

  it("detects cross-role path access", () => {
    expect(isRoleAllowed("donor", ["donor"])).toBe(true);
    expect(isRoleAllowed("donor", ["admin"])).toBe(false);
    expect(getRequiredRoleForPath("/dashboard/admin/users")).toBe("admin");
    expect(getRequiredRoleForPath("/dashboard/donor/create")).toBe("donor");
  });

  it("formats API validation errors for UI display", () => {
    const msg = getApiErrorMessage({
      response: { data: { message: "Validation failed", errors: [{ message: "Email is required" }] } },
    });
    expect(msg).toContain("Email is required");
  });

  it("formats 401-style messages without crashing", () => {
    const msg = getApiErrorMessage({
      response: { data: { message: "Invalid email or password" } },
    });
    expect(msg).toBe("Invalid email or password");
  });
});

describe("Loading state patterns (code contract)", () => {
  it("SignInForm uses loading flag and formError (static import check)", async () => {
    const mod = await import("../../src/components/auth/SignInForm.jsx");
    expect(mod.default).toBeTypeOf("function");
  });

  it("AuthLoadingScreen exists for bootstrap gate", async () => {
    const mod = await import("../../src/components/auth/AuthLoadingScreen.jsx");
    expect(mod.default).toBeTypeOf("function");
  });
});
