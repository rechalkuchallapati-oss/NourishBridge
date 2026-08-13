import { describe, it, expect, beforeAll } from "vitest";
import Notification from "../../src/models/Notification.model.js";
import { authGet, authPatch, createRoleAccounts } from "../helpers/auth.js";
import { connectTestDb } from "../helpers/db.js";

describe("Notifications", () => {
  let donorToken;
  let ngoToken;
  let donorUserId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("notif");
    donorToken = accounts.donor.accessToken;
    ngoToken = accounts.ngo.accessToken;
    donorUserId = accounts.donor.user?.id;
  });

  it("lists notifications for authenticated user", async () => {
    const res = await authGet(donorToken, "/notifications");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.notifications)).toBe(true);
  });

  it("returns unread count", async () => {
    const res = await authGet(donorToken, "/notifications/unread-count");
    expect(res.status).toBe(200);
    expect(typeof res.body.data?.count === "number").toBe(true);
  });

  it("returns 401 without authentication", async () => {
    const { api, path } = await import("../helpers/api.js");
    const res = await (await api()).get(path("/notifications"));
    expect(res.status).toBe(401);
  });

  it("marks all notifications as read", async () => {
    const res = await authPatch(donorToken, "/notifications/read-all");
    expect(res.status).toBe(200);
  });

  it("cannot access another user's notification by id guess", async () => {
    const other = await Notification.findOne({ userId: { $ne: donorUserId } });
    if (!other) return;
    const res = await authPatch(donorToken, `/notifications/${other._id}/read`);
    expect([403, 404]).toContain(res.status);
  });

  it("ngo can list notifications", async () => {
    const res = await authGet(ngoToken, "/notifications");
    expect(res.status).toBe(200);
  });
});
