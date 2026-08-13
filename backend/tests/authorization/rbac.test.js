import { describe, it, expect, beforeAll } from "vitest";
import { api, path, authHeader } from "../helpers/api.js";
import { createRoleAccounts } from "../helpers/auth.js";
import { DASHBOARD_PATHS } from "../helpers/constants.js";
import { connectTestDb } from "../helpers/db.js";

describe("Authorization — RBAC", () => {
  let tokens;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("rbac");
    tokens = {
      admin: accounts.admin.accessToken,
      donor: accounts.donor.accessToken,
      ngo: accounts.ngo.accessToken,
      volunteer: accounts.volunteer.accessToken,
    };
  });

  const roles = Object.keys(DASHBOARD_PATHS);

  for (const caller of roles) {
    for (const target of roles) {
      it(`${caller} → ${target} dashboard → ${caller === target ? "200" : "403"}`, async () => {
        const res = await (await api())
          .get(path(DASHBOARD_PATHS[target]))
          .set(authHeader(tokens[caller]));
        expect(res.status).toBe(caller === target ? 200 : 403);
      });
    }
  }

  for (const target of roles) {
    it(`no token → ${target} dashboard → 401`, async () => {
      const res = await (await api()).get(path(DASHBOARD_PATHS[target]));
      expect(res.status).toBe(401);
    });
  }

  it("donor cannot access admin users list", async () => {
    const res = await (await api())
      .get(path("/admin/users"))
      .set(authHeader(tokens.donor));
    expect(res.status).toBe(403);
  });

  it("volunteer cannot access NGO inventory", async () => {
    const res = await (await api())
      .get(path("/ngo/inventory"))
      .set(authHeader(tokens.volunteer));
    expect(res.status).toBe(403);
  });

  it("ngo cannot access donor-only donation create", async () => {
    const res = await (await api())
      .post(path("/donations"))
      .set(authHeader(tokens.ngo))
      .send({});
    expect(res.status).toBe(403);
  });
});
