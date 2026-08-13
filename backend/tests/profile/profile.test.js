import { describe, it, expect, beforeAll } from "vitest";
import { authGet, authPatch } from "../helpers/auth.js";
import { createRoleAccounts } from "../helpers/auth.js";
import { connectTestDb } from "../helpers/db.js";

describe("Profile", () => {
  let donorToken;
  let ngoToken;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("profile");
    donorToken = accounts.donor.accessToken;
    ngoToken = accounts.ngo.accessToken;
  });

  it("returns profile for authenticated user", async () => {
    const res = await authGet(donorToken, "/profile");
    expect(res.status).toBe(200);
    expect(res.body.data?.profile).toBeTruthy();
  });

  it("updates profile with valid data", async () => {
    const res = await authPatch(donorToken, "/profile", {
      common: { fullName: "Updated Donor Name" },
    });
    expect(res.status).toBe(200);
    const name =
      res.body.data?.profile?.common?.fullName ||
      res.body.data?.profile?.fullName ||
      res.body.data?.user?.fullName;
    expect(String(name)).toContain("Updated");
  });

  it("returns 401 without token", async () => {
    const { api, path } = await import("../helpers/api.js");
    const res = await (await api()).get(path("/profile"));
    expect(res.status).toBe(401);
  });

  it("returns impact statistics", async () => {
    const res = await authGet(donorToken, "/profile/impact");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeTruthy();
  });

  it("ngo profile includes NGO-specific fields", async () => {
    const res = await authGet(ngoToken, "/profile");
    expect(res.status).toBe(200);
    const profile = res.body.data?.profile;
    expect(profile?.common?.role).toBe("ngo");
    expect(profile?.roleProfile?.ngoName).toBeTruthy();
  });

  it("rejects invalid profile data", async () => {
    const res = await authPatch(donorToken, "/profile", { common: { phone: "abc" } });
    expect(res.status).toBe(400);
  });
});
