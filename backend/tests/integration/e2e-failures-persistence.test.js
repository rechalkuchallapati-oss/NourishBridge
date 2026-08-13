import { describe, it, expect, beforeAll } from "vitest";
import Donation from "../../src/models/Donation.model.js";
import {
  authPost,
  createRoleAccounts,
  registerUser,
  loginUser,
} from "../helpers/auth.js";
import { donationPayload, advanceMissionThroughDelivery } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";
import { createDonationViaApi, runDonationToCompletion } from "../helpers/e2eHelpers.js";
import { pastIso } from "../helpers/constants.js";

describe("E2E — Failure & Rollback Scenarios", () => {
  let accounts;
  let ngoB;
  let volunteerB;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-fail");
    const ngoBReg = await registerUser("ngo", "e2e-fail-b");
    ngoB = await loginUser(ngoBReg.email);
    const volBReg = await registerUser("volunteer", "e2e-fail-vb");
    volunteerB = await loginUser(volBReg.email);
  });

  it("rejects invalid donation and DB has no orphan record", async () => {
    const beforeCount = await Donation.countDocuments({ foodType: /Invalid E2E Fail Meal/i });
    const res = await authPost(
      accounts.donor.accessToken,
      "/donations",
      donationPayload({ foodName: "Invalid E2E Fail Meal", expiryTime: pastIso(1) }),
    );
    expect(res.status).toBe(400);
    const afterCount = await Donation.countDocuments({ foodType: /Invalid E2E Fail Meal/i });
    expect(afterCount).toBe(beforeCount);
  });

  it("NGO cannot accept already-accepted donation (400/409)", async () => {
    const { donationId } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "E2E Fail Accept Twice",
    });
    await authPost(accounts.admin.accessToken, `/admin/donations/${donationId}/verify`);
    await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);

    const again = await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);
    expect([400, 409]).toContain(again.status);

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("ngo_accepted");
  });

  it("unauthorized NGO modification leaves DB unchanged", async () => {
    const { donationId } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "E2E Fail NGO Block",
    });
    await authPost(accounts.admin.accessToken, `/admin/donations/${donationId}/verify`);
    await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);

    const before = await Donation.findById(donationId);
    const attempt = await authPost(ngoB.accessToken, `/ngo/donations/${donationId}/complete`);
    expect([400, 403, 404, 409]).toContain(attempt.status);

    const after = await Donation.findById(donationId);
    expect(after.status).toBe(before.status);
    expect(after.ngoId.toString()).toBe(before.ngoId.toString());
  });

  it("volunteer cannot advance another volunteer's mission", async () => {
    const { donationId } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "E2E Fail Vol Block",
    });
    await authPost(accounts.admin.accessToken, `/admin/donations/${donationId}/verify`);
    await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);
    await authPost(accounts.volunteer.accessToken, `/volunteer/missions/${donationId}/accept`);

    const before = await Donation.findById(donationId);
    const attempt = await authPost(volunteerB.accessToken, `/volunteer/missions/${donationId}/advance`, {
      action: "mark_picked_up",
    });
    expect([400, 403, 404, 409]).toContain(attempt.status);

    const after = await Donation.findById(donationId);
    expect(after.volunteerId?.toString()).toBe(before.volunteerId?.toString());
  });

  it("distribution exceeding inventory is rejected without DB change", async () => {
    const { inventory } = await runDonationToCompletion(accounts, {
      foodName: "E2E Fail Over Dist",
      quantity: 3,
    });

    const before = inventory.quantity;
    const excess = await authPost(
      accounts.ngo.accessToken,
      `/ngo/inventory/${inventory._id}/distribute`,
      { quantity: before + 50, mealsServed: 100 },
    );
    expect(excess.status).toBe(400);

    const { default: Inventory } = await import("../../src/models/Inventory.model.js");
    const after = await Inventory.findById(inventory._id);
    expect(after.quantity).toBe(before);
  });

  it("invalid status transition on unverified donation is rejected", async () => {
    const { donationId } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "E2E Fail Skip Verify",
    });
    const accept = await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);
    expect([400, 403, 409]).toContain(accept.status);

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("pending");
  });
});

describe("E2E — Refresh & Persistence", () => {
  let accounts;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-persist");
  });

  it("NGO accept status survives re-fetch and re-login", async () => {
    const { donationId: id } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "E2E Persist Accept",
    });
    donationId = id;
    await authPost(accounts.admin.accessToken, `/admin/donations/${donationId}/verify`);
    await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);

    const fetch1 = await (await import("../helpers/auth.js")).authGet(
      accounts.ngo.accessToken,
      `/ngo/donations/${donationId}`,
    );
    expect(fetch1.body.data?.donation?.status).toBe("ngo_accepted");

    const { loginUser } = await import("../helpers/auth.js");
    const relogin = await loginUser(accounts.ngo.email);
    const fetch2 = await (await import("../helpers/auth.js")).authGet(
      relogin.accessToken,
      `/ngo/donations/${donationId}`,
    );
    expect(fetch2.body.data?.donation?.status).toBe("ngo_accepted");

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("ngo_accepted");
  });

  it("completed mission persists after volunteer re-login", async () => {
    const result = await runDonationToCompletion(accounts, {
      foodName: "E2E Persist Complete",
      quantity: 4,
    });

    const { loginUser } = await import("../helpers/auth.js");
    const relogin = await loginUser(accounts.volunteer.email);
    const missions = await (await import("../helpers/auth.js")).authGet(
      relogin.accessToken,
      "/volunteer/missions/assigned",
    );
    expect(missions.status).toBe(200);

    const inDb = await Donation.findById(result.donationId);
    expect(inDb.status).toBe("completed");
  });
});
