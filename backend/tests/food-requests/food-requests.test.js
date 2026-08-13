import { describe, it, expect, beforeAll } from "vitest";
import FoodRequest from "../../src/models/FoodRequest.model.js";
import { authGet, authPost, authPatch, authDelete, createRoleAccounts } from "../helpers/auth.js";
import { foodRequestPayload } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";

describe("Food Requests", () => {
  let ngoToken;
  let adminToken;
  let requestId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("foodreq");
    ngoToken = accounts.ngo.accessToken;
    adminToken = accounts.admin.accessToken;
  });

  it("creates food request as NGO", async () => {
    const res = await authPost(ngoToken, "/food-requests", foodRequestPayload());
    expect(res.status).toBe(201);
    requestId = res.body.data?.request?.id;
    expect(requestId).toBeTruthy();
    expect(res.body.data?.request?.status).toBe("requested");

    const inDb = await FoodRequest.findById(requestId);
    expect(inDb).toBeTruthy();
  });

  it("rejects invalid payload", async () => {
    const res = await authPost(ngoToken, "/food-requests", { foodItem: "" });
    expect(res.status).toBe(400);
  });

  it("lists food requests", async () => {
    const res = await authGet(ngoToken, "/food-requests");
    expect(res.status).toBe(200);
    expect(res.body.data?.requests?.some((r) => r.id === requestId)).toBe(true);
  });

  it("gets single request", async () => {
    const res = await authGet(ngoToken, `/food-requests/${requestId}`);
    expect(res.status).toBe(200);
    expect(res.body.data?.request?.id).toBe(requestId);
  });

  it("updates request", async () => {
    const res = await authPatch(ngoToken, `/food-requests/${requestId}`, {
      priority: "critical",
    });
    expect(res.status).toBe(200);
  });

  it("admin approves food request", async () => {
    const review = await authPost(adminToken, `/admin/food-requests/${requestId}/review`);
    expect([200, 201]).toContain(review.status);

    const approve = await authPost(adminToken, `/admin/food-requests/${requestId}/approve`);
    expect(approve.status).toBe(200);
  });

  it("returns request history", async () => {
    const res = await authGet(ngoToken, `/food-requests/${requestId}/history`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.history)).toBe(true);
  });

  it("cancels food request", async () => {
    const created = await authPost(ngoToken, "/food-requests", foodRequestPayload({ foodItem: "Cancel Me" }));
    const id = created.body.data?.request?.id;
    const res = await authDelete(ngoToken, `/food-requests/${id}`, { reason: "No longer needed" });
    expect([200, 204]).toContain(res.status);
  });
});
