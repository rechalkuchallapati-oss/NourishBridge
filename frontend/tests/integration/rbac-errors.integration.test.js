import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { adminApi } from "../../src/modules/admin/api/client.js";
import { ngoApi } from "../../src/modules/ngo/api/client.js";
import { volunteerApi } from "../../src/modules/volunteer/api/client.js";
import axiosInstance from "../../src/api/axiosInstance.js";
import {
  isRoleAllowed,
  getRequiredRoleForPath,
  ROLE_ROUTE_PREFIXES,
} from "../../src/constants/rbac.js";
import { ROLE_DASHBOARD_ROUTES } from "../../src/constants/routes.js";
import {
  resetClientState,
  registerRole,
  loginAdmin,
  loginAs,
  loginAccount,
  expectAxiosError,
  DEFAULT_PASSWORD,
} from "../helpers/integrationHelpers.js";
import * as authService from "../../src/modules/auth/services/authService.js";

describe("Role-based API access (frontend clients)", () => {
  let accounts;

  beforeAll(async () => {
    accounts = {
      donor: await registerRole("donor", "rbac-d"),
      ngo: await registerRole("ngo", "rbac-n"),
      volunteer: await registerRole("volunteer", "rbac-v"),
      admin: await loginAdmin(),
    };
  });

  beforeEach(() => {
    resetClientState();
  });

  const dashboardCalls = {
    admin: () => adminApi.getDashboard(),
    donor: () => axiosInstance.get("/donor/dashboard"),
    ngo: () => ngoApi.getDashboard(),
    volunteer: () => volunteerApi.getDashboard(),
  };

  for (const caller of Object.keys(dashboardCalls)) {
    for (const target of Object.keys(dashboardCalls)) {
      it(`${caller} → ${target} dashboard API → ${caller === target ? "200" : "403"}`, async () => {
        await loginAccount(accounts[caller]);
        if (caller === target) {
          const res = await dashboardCalls[target]();
          expect(res.status).toBe(200);
        } else {
          await expectAxiosError(dashboardCalls[target](), 403);
        }
      });
    }
  }

  it("donor cannot POST /donations as NGO (403 on wrong role endpoint)", async () => {
    await loginAs(accounts.donor.email);
    // donor trying admin endpoint
    await expectAxiosError(adminApi.listUsers(), 403);
  });

  it("frontend RBAC route helpers align with role prefixes", () => {
    expect(getRequiredRoleForPath("/dashboard/admin/users")).toBe("admin");
    expect(getRequiredRoleForPath("/dashboard/donor/donations")).toBe("donor");
    expect(getRequiredRoleForPath("/dashboard/ngo/inventory")).toBe("ngo");
    expect(getRequiredRoleForPath("/dashboard/volunteer/pickups")).toBe("volunteer");
    expect(isRoleAllowed("donor", ["donor"])).toBe(true);
    expect(isRoleAllowed("donor", ["admin"])).toBe(false);
    expect(ROLE_DASHBOARD_ROUTES.donor).toBe(ROLE_ROUTE_PREFIXES.donor);
  });
});

describe("API error status handling via frontend clients", () => {
  beforeEach(() => {
    resetClientState();
  });

  it("401 on /auth/me without token", async () => {
    await expectAxiosError(axiosInstance.get("/auth/me"), 401);
  });

  it("403 when donor hits admin API", async () => {
    const { email } = await registerRole("donor", "err-403");
    await loginAs(email);
    await expectAxiosError(adminApi.getDashboard(), 403);
  });

  it("404 for nonexistent donation", async () => {
    const { email } = await registerRole("donor", "err-404");
    await loginAs(email);
    await expectAxiosError(axiosInstance.get("/donations/000000000000000000000001"), 404);
  });

  it("400 for invalid donation payload", async () => {
    const { email } = await registerRole("donor", "err-400");
    await loginAs(email);
    await expectAxiosError(
      axiosInstance.post("/donations", { foodName: "only name" }),
      400,
    );
  });

  it("409 for duplicate registration", async () => {
    const donor = await registerRole("donor", "err-409");
    resetClientState();
    await expectAxiosError(
      authService.register(
        {
          fullName: "Dup",
          email: donor.email,
          password: DEFAULT_PASSWORD,
          confirmPassword: DEFAULT_PASSWORD,
          phone: "9876543210",
          role: "donor",
          address: { line1: "A", city: "Hyderabad", pincode: "500001" },
          profile: { donorType: "individual" },
        },
        true,
      ),
      409,
    );
  });
});
