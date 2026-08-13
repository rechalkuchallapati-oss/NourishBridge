import { describe, it, expect, beforeAll } from "vitest";
import {
  authGet,
  authPost,
  createRoleAccounts,
  registerUser,
} from "../helpers/auth.js";
import { createVerifiedDonation, advanceMissionThroughDelivery } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";

describe("Volunteer Module", () => {
  let volAToken;
  let volBToken;
  let ngoToken;
  let adminToken;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("vol-a");
    volAToken = accounts.volunteer.accessToken;
    ngoToken = accounts.ngo.accessToken;
    adminToken = accounts.admin.accessToken;

    const volB = await registerUser("volunteer", "vol-b", { profile: { vehicleType: "car" } });
    volBToken = volB.tokens.accessToken;

    const flow = await createVerifiedDonation(accounts, "vol-mission");
    donationId = flow.donationId;
  });

  it("returns volunteer dashboard", async () => {
    const res = await authGet(volAToken, "/volunteer/dashboard");
    expect(res.status).toBe(200);
  });

  it("lists available missions after NGO accept", async () => {
    const res = await authGet(volAToken, "/volunteer/missions/available");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.missions)).toBe(true);
  });

  it("accepts mission", async () => {
    const res = await authPost(volAToken, `/volunteer/missions/${donationId}/accept`);
    expect(res.status).toBe(200);
    expect(res.body.data?.mission?.status).toBe("volunteer_assigned");
  });

  it("volunteer B cannot accept same mission", async () => {
    const res = await authPost(volBToken, `/volunteer/missions/${donationId}/accept`);
    expect([400, 403, 409]).toContain(res.status);
  });

  it("lists assigned missions", async () => {
    const res = await authGet(volAToken, "/volunteer/missions/assigned");
    expect(res.status).toBe(200);
    expect(res.body.data?.missions?.some((m) => m.id === donationId)).toBe(true);
  });

  it("advances mission through delivery stages", async () => {
    await advanceMissionThroughDelivery(volAToken, donationId);
    const detail = await authGet(volAToken, `/volunteer/missions/${donationId}`);
    expect(detail.status).toBe(200);
    expect(["delivered", "in_transit", "picked_up"].includes(detail.body.data?.mission?.status) ||
      detail.body.data?.mission?.status === "delivered").toBe(true);
  });

  it("volunteer B cannot advance volunteer A mission", async () => {
    const res = await authPost(volBToken, `/volunteer/missions/${donationId}/advance`, {
      action: "mark_picked_up",
    });
    expect([400, 403, 404]).toContain(res.status);
  });

  it("returns performance metrics", async () => {
    await authPost(ngoToken, `/ngo/donations/${donationId}/complete`);
    const res = await authGet(volAToken, "/volunteer/missions/performance");
    expect(res.status).toBe(200);
    expect(res.body.data?.performance).toBeTruthy();
  });

  it("returns mission history", async () => {
    const res = await authGet(volAToken, "/volunteer/missions/history");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.missions)).toBe(true);
  });
});
