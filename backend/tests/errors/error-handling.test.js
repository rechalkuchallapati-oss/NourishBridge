import { describe, it, expect, beforeAll } from "vitest";
import { api, path, authHeader } from "../helpers/api.js";
import { createRoleAccounts } from "../helpers/auth.js";
import { connectTestDb } from "../helpers/db.js";

describe("Error Handling", () => {
  let donorToken;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("errors");
    donorToken = accounts.donor.accessToken;
  });

  it("404 for unknown route", async () => {
    const res = await (await api()).get(path("/does-not-exist"));
    expect(res.status).toBe(404);
  });

  it("400 for validation errors", async () => {
    const res = await (await api()).post(path("/auth/register")).send({ email: "bad" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("401 for missing auth", async () => {
    const res = await (await api()).get(path("/profile"));
    expect(res.status).toBe(401);
  });

  it("403 for wrong role", async () => {
    const res = await (await api()).get(path("/admin/dashboard")).set(authHeader(donorToken));
    expect(res.status).toBe(403);
  });

  it("404 for nonexistent donation", async () => {
    const { authGet } = await import("../helpers/auth.js");
    const res = await authGet(donorToken, "/donations/000000000000000000000001");
    expect(res.status).toBe(404);
  });
});

describe("Health", () => {
  it("returns health check", async () => {
    const res = await (await api()).get(path("/health"));
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
