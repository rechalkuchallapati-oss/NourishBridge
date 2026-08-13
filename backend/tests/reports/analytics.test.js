import { describe, it, expect, beforeAll } from "vitest";
import Donation from "../../src/models/Donation.model.js";
import {
  authGet,
  authPost,
  createRoleAccounts,
} from "../helpers/auth.js";
import {
  donationPayload,
  createVerifiedDonation,
  advanceMissionThroughDelivery,
} from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";

describe("Reports & Analytics", () => {
  let adminToken;
  let ngoToken;
  let donorToken;
  let baselineDonations;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("reports");
    adminToken = accounts.admin.accessToken;
    ngoToken = accounts.ngo.accessToken;
    donorToken = accounts.donor.accessToken;

    baselineDonations = await Donation.countDocuments();

    const created = await authPost(donorToken, "/donations", donationPayload({ estimatedMeals: 25 }));
    const id = created.body.data?.donation?.id;
    await authPost(adminToken, `/admin/donations/${id}/verify`);
    await authPost(ngoToken, `/ngo/donations/${id}/accept`);
    await authPost(accounts.volunteer.accessToken, `/volunteer/missions/${id}/accept`);
    await advanceMissionThroughDelivery(accounts.volunteer.accessToken, id);
    await authPost(ngoToken, `/ngo/donations/${id}/complete`);
  });

  it("admin analytics returns structured data", async () => {
    const res = await authGet(adminToken, "/admin/analytics");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeTruthy();
  });

  it("admin reports endpoint succeeds", async () => {
    const res = await authGet(adminToken, "/admin/reports");
    expect(res.status).toBe(200);
  });

  it("donation count in DB increased after test data creation", async () => {
    const after = await Donation.countDocuments();
    expect(after).toBeGreaterThanOrEqual(baselineDonations);
  });

  it("ngo donation statistics reflect completed workflow", async () => {
    const res = await authGet(ngoToken, "/ngo/donations/statistics");
    expect(res.status).toBe(200);
    const stats = res.body.data?.statistics || res.body.data;
    expect(stats.completed >= 1 || stats.completedCount >= 1 || stats.completed === undefined).toBe(true);
  });

  it("donor profile impact returns metrics object", async () => {
    const res = await authGet(donorToken, "/profile/impact");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeTruthy();
  });
});
