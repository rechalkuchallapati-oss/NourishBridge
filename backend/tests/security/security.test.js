import { describe, it, expect, beforeAll } from "vitest";
import { api, path, authHeader } from "../helpers/api.js";
import { registerUser, createRoleAccounts } from "../helpers/auth.js";
import { connectTestDb } from "../helpers/db.js";

describe("Security", () => {
  let donorToken;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("security");
    donorToken = accounts.donor.accessToken;
  });

  it("rejects mass assignment of role on profile update", async () => {
    const { authPatch } = await import("../helpers/auth.js");
    const res = await authPatch(donorToken, "/profile", { role: "admin" });
    expect(res.status).toBe(200);
    const me = await (await api()).get(path("/auth/me")).set(authHeader(donorToken));
    expect(me.body.data?.user?.role).toBe("donor");
  });

  it("does not expose password hash in API responses", async () => {
    const me = await (await api()).get(path("/auth/me")).set(authHeader(donorToken));
    const userJson = JSON.stringify(me.body);
    expect(userJson).not.toMatch(/"\$2[aby]\$/);
    expect(userJson.toLowerCase()).not.toContain("passwordhash");
  });

  it("returns 400 for invalid ObjectId param", async () => {
    const { authGet } = await import("../helpers/auth.js");
    const res = await authGet(donorToken, "/donations/not-a-valid-id");
    expect(res.status).toBe(400);
  });

  it("handles NoSQL injection-like input safely", async () => {
    const res = await (await api())
      .post(path("/auth/login"))
      .send({ email: { $gt: "" }, password: "x" });
    expect([400, 401]).toContain(res.status);
  });

  it("server does not crash on malformed JSON body", async () => {
    const res = await (await api())
      .post(path("/auth/login"))
      .set("Content-Type", "application/json")
      .send("{ not valid json");
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(600);
  });

  it("rejects unauthorized admin mutation", async () => {
    const { authPatch } = await import("../helpers/auth.js");
    const res = await authPatch(donorToken, "/admin/users/000000000000000000000000", {
      isActive: false,
    });
    expect(res.status).toBe(403);
  });
});

describe("File Upload Security", () => {
  it("rejects profile image upload without file", async () => {
    const { res } = await registerUser("donor", "upload-none");
    const token = res.body.data?.accessToken;
    const upload = await (await api())
      .post(path("/profile/image"))
      .set(authHeader(token));
    expect([400, 422]).toContain(upload.status);
  });

  it("rejects invalid MIME type for profile image", async () => {
    const { res } = await registerUser("donor", "upload-bad-mime");
    const token = res.body.data?.accessToken;
    const upload = await (await api())
      .post(path("/profile/image"))
      .set(authHeader(token))
      .attach("image", Buffer.from("not-an-image"), {
        filename: "test.txt",
        contentType: "text/plain",
      });
    expect([400, 415]).toContain(upload.status);
  });
});
