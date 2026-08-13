import { describe, it, expect, beforeAll } from "vitest";
import Donation from "../../src/models/Donation.model.js";
import { authGet, authPost, authPatch, authDelete, createRoleAccounts } from "../helpers/auth.js";
import { donationPayload } from "../helpers/fixtures.js";
import { pastIso } from "../helpers/constants.js";
import { connectTestDb } from "../helpers/db.js";

describe("Donations", () => {
  let donorToken;
  let ngoToken;
  let adminToken;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("donations");
    donorToken = accounts.donor.accessToken;
    ngoToken = accounts.ngo.accessToken;
    adminToken = accounts.admin.accessToken;
  });

  it("creates donation with valid payload", async () => {
    const res = await authPost(donorToken, "/donations", donationPayload());
    expect(res.status).toBe(201);
    donationId = res.body.data?.donation?.id;
    expect(donationId).toBeTruthy();
    expect(res.body.data?.donation?.status).toBe("pending");

    const inDb = await Donation.findById(donationId);
    expect(inDb).toBeTruthy();
    expect(inDb.foodType).toBe("Test Meal Pack");
  });

  it("rejects missing required fields", async () => {
    const res = await authPost(donorToken, "/donations", { foodName: "Only name" });
    expect(res.status).toBe(400);
  });

  it("rejects invalid quantity", async () => {
    const res = await authPost(donorToken, "/donations", donationPayload({ quantity: -5 }));
    expect(res.status).toBe(400);
  });

  it("rejects expired expiryTime", async () => {
    const res = await authPost(
      donorToken,
      "/donations",
      donationPayload({ expiryTime: pastIso(1) }),
    );
    expect(res.status).toBe(400);
  });

  it("lists own donations", async () => {
    const res = await authGet(donorToken, "/donations/my");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.donations)).toBe(true);
    expect(res.body.data.donations.some((d) => d.id === donationId)).toBe(true);
  });

  it("gets donation details with ownership", async () => {
    const res = await authGet(donorToken, `/donations/${donationId}`);
    expect(res.status).toBe(200);
    expect(res.body.data?.donation?.id).toBe(donationId);
  });

  it("updates pending donation", async () => {
    const res = await authPatch(donorToken, `/donations/${donationId}`, {
      foodName: "Updated Meal",
      quantity: 12,
    });
    expect(res.status).toBe(200);
    expect(res.body.data?.donation?.foodName).toBe("Updated Meal");
  });

  it("admin verifies donation", async () => {
    const res = await authPost(adminToken, `/admin/donations/${donationId}/verify`);
    expect(res.status).toBe(200);
    expect(res.body.data?.donation?.status).toBe("verified");
  });

  it("ngo accepts verified donation", async () => {
    const res = await authPost(ngoToken, `/ngo/donations/${donationId}/accept`);
    expect(res.status).toBe(200);
    expect(res.body.data?.donation?.status).toBe("ngo_accepted");
  });

  it("rejects invalid status transition from donor update after accept", async () => {
    const res = await authPatch(donorToken, `/donations/${donationId}`, { status: "completed" });
    expect([400, 403, 422]).toContain(res.status);
  });

  it("creates and rejects donation via NGO", async () => {
    const created = await authPost(donorToken, "/donations", donationPayload({ foodName: "Reject Me" }));
    const id = created.body.data?.donation?.id;
    await authPost(adminToken, `/admin/donations/${id}/verify`);
    const rejected = await authPost(ngoToken, `/ngo/donations/${id}/reject`, {
      reason: "Capacity full",
    });
    expect(rejected.status).toBe(200);
    expect(rejected.body.data?.donation?.status).toBe("rejected");
  });

  it("cancels/deletes pending donation", async () => {
    const created = await authPost(donorToken, "/donations", donationPayload({ foodName: "Delete Me" }));
    const id = created.body.data?.donation?.id;
    const del = await authDelete(donorToken, `/donations/${id}`);
    expect([200, 204]).toContain(del.status);
  });

  it("returns donation status history", async () => {
    const res = await authGet(donorToken, `/donations/${donationId}/history`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.history)).toBe(true);
    expect(res.body.data.history.length).toBeGreaterThan(0);
  });
});
