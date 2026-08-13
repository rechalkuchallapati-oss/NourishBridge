import { describe, it, expect, beforeAll } from "vitest";
import { authGet, authPost, authPatch, createRoleAccounts } from "../helpers/auth.js";
import { connectTestDb } from "../helpers/db.js";

describe("Admin Module", () => {
  let adminToken;
  let donorToken;
  let ngoUserId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("admin-mod");
    adminToken = accounts.admin.accessToken;
    donorToken = accounts.donor.accessToken;
    ngoUserId = accounts.ngo.user?.id;
  });

  const adminEndpoints = [
    ["GET", "/admin/dashboard"],
    ["GET", "/admin/analytics"],
    ["GET", "/admin/reports"],
    ["GET", "/admin/users"],
    ["GET", "/admin/donors"],
    ["GET", "/admin/volunteers"],
    ["GET", "/admin/ngos"],
    ["GET", "/admin/donations"],
    ["GET", "/admin/deliveries"],
    ["GET", "/admin/food-requests"],
    ["GET", "/admin/inventory"],
    ["GET", "/admin/audit-logs"],
    ["GET", "/admin/notifications"],
    ["GET", "/admin/support-tickets"],
  ];

  for (const [method, endpoint] of adminEndpoints) {
    it(`admin can ${method} ${endpoint}`, async () => {
      const res =
        method === "GET"
          ? await authGet(adminToken, endpoint)
          : await authPost(adminToken, endpoint);
      expect(res.status).toBe(200);
    });
  }

  for (const [method, endpoint] of adminEndpoints.slice(0, 5)) {
    it(`donor blocked from ${endpoint}`, async () => {
      const res = await authGet(donorToken, endpoint);
      expect(res.status).toBe(403);
    });
  }

  it("admin verifies NGO", async () => {
    const ngos = await authGet(adminToken, "/admin/ngos");
    const ngoId = ngos.body.data?.ngos?.find((n) => n.userId === ngoUserId || n.id)?.id ||
      ngos.body.data?.ngos?.[0]?.id;
    if (!ngoId) return;
    const res = await authPost(adminToken, `/admin/ngos/${ngoId}/verify`);
    expect([200, 400, 409]).toContain(res.status);
  });

  it("admin export donations report", async () => {
    const res = await authGet(adminToken, "/admin/export/donations");
    expect([200, 204]).toContain(res.status);
  });
});

describe("Audit Logs", () => {
  let adminToken;
  let donorToken;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("audit");
    adminToken = accounts.admin.accessToken;
    donorToken = accounts.donor.accessToken;
  });

  it("admin can list audit logs with expected fields", async () => {
    const res = await authGet(adminToken, "/admin/audit-logs");
    expect(res.status).toBe(200);
    const logs = res.body.data?.logs || res.body.data?.auditLogs || [];
    if (logs.length > 0) {
      const log = logs[0];
      expect(log.action || log.details).toBeTruthy();
      expect(log.createdAt || log.timestamp).toBeTruthy();
    }
  });

  it("donor cannot access audit logs", async () => {
    const res = await authGet(donorToken, "/admin/audit-logs");
    expect(res.status).toBe(403);
  });
});
