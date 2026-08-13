import { describe, it, expect, beforeAll } from "vitest";
import Donation from "../../src/models/Donation.model.js";
import Donor from "../../src/models/Donor.model.js";
import {
  authGet,
  authPost,
  authDelete,
  createRoleAccounts,
  registerUser,
} from "../helpers/auth.js";
import { donationPayload } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";
import {
  createDonationViaApi,
  assertDonorOwnership,
  refetchDonation,
} from "../helpers/e2eHelpers.js";
import { pastIso } from "../helpers/constants.js";

describe("E2E — Donor Workflow", () => {
  let accounts;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-donor");
  });

  it("registers donor, creates donation, verifies DB ownership and API list", async () => {
    const { donor } = accounts;
    const { donationId, res } = await createDonationViaApi(donor.accessToken, {
      foodName: "E2E Donor Meal",
      estimatedMeals: 50,
      quantity: 10,
    });

    expect(res.status).toBe(201);
    expect(res.body.data?.donation?.status).toBe("pending");

    const inDb = await Donation.findById(donationId);
    expect(inDb).toBeTruthy();
    expect(inDb.foodType || inDb.foodName).toBeTruthy();

    const donorProfile = await Donor.findOne({ userId: donor.user?.id || donor.user?._id });
    expect(inDb.donorId.toString()).toBe(donorProfile._id.toString());

    const list = await authGet(donor.accessToken, "/donations/my");
    expect(list.status).toBe(200);
    expect(list.body.data?.donations?.some((d) => d.id === donationId)).toBe(true);
  });

  it("rejects invalid donation (expired food) with 400", async () => {
    const res = await authPost(
      accounts.donor.accessToken,
      "/donations",
      donationPayload({ expiryTime: pastIso(2) }),
    );
    expect(res.status).toBe(400);
  });

  it("rejects missing required fields with 400", async () => {
    const res = await authPost(accounts.donor.accessToken, "/donations", { foodName: "Only name" });
    expect(res.status).toBe(400);
  });

  it("blocks NGO from creating donation (403)", async () => {
    const res = await authPost(
      accounts.ngo.accessToken,
      "/donations",
      donationPayload({ foodName: "NGO Attempt" }),
    );
    expect(res.status).toBe(403);
  });

  it("donor can cancel pending donation", async () => {
    const { donationId } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "Cancel Test Meal",
    });
    const cancel = await authDelete(accounts.donor.accessToken, `/donations/${donationId}`);
    expect([200, 204]).toContain(cancel.status);

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("cancelled");
  });

  it("persists donation status after re-fetch (refresh simulation)", async () => {
    const { donationId } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "Persistence Donor Meal",
    });

    const verify = await authPost(
      accounts.admin.accessToken,
      `/admin/donations/${donationId}/verify`,
    );
    expect(verify.status).toBe(200);

    const refetch = await refetchDonation(accounts.donor.accessToken, donationId, "donor");
    expect(refetch.status).toBe(200);
    expect(refetch.body.data?.donation?.status).toBe("verified");

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("verified");
  });

  it("unauthenticated user cannot list donations (401)", async () => {
    const res = await (await import("../helpers/api.js")).api();
    const unauth = await res.get("/api/v1/donations/my");
    expect(unauth.status).toBe(401);
  });
});
