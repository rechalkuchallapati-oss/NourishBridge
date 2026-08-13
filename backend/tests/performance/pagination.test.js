import { describe, it, expect, beforeAll } from "vitest";
import { authGet, createRoleAccounts } from "../helpers/auth.js";
import { connectTestDb } from "../helpers/db.js";

describe("Performance — Pagination boundaries", () => {
  let tokens;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("perf-pag");
    tokens = {
      donor: accounts.donor.accessToken,
      admin: accounts.admin.accessToken,
    };
  });

  it("donations/my rejects limit=100000 with 400", async () => {
    const res = await authGet(tokens.donor, "/donations/my?limit=100000");
    expect(res.status).toBe(400);
  });

  it("donations/my accepts limit=100", async () => {
    const res = await authGet(tokens.donor, "/donations/my?limit=100");
    expect(res.status).toBe(200);
  });

  it("notifications rejects limit=100000 with 400", async () => {
    const res = await authGet(tokens.donor, "/notifications?limit=100000");
    expect(res.status).toBe(400);
  });

  it("notifications accepts limit=100", async () => {
    const res = await authGet(tokens.donor, "/notifications?limit=100");
    expect(res.status).toBe(200);
  });

  it("admin/users caps limit=100000 to max 100", async () => {
    const res = await authGet(tokens.admin, "/admin/users?limit=100000");
    expect(res.status).toBe(200);
    expect(res.body.data?.pagination).toBeTruthy();
    expect(res.body.data.pagination.limit).toBe(100);
    expect(Array.isArray(res.body.data?.users)).toBe(true);
  });

  it("admin/users default pagination is bounded", async () => {
    const res = await authGet(tokens.admin, "/admin/users");
    expect(res.status).toBe(200);
    expect(res.body.data?.pagination?.limit).toBeLessThanOrEqual(100);
  });
});
