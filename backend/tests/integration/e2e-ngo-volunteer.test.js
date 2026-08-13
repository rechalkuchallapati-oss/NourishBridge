import { describe, it, expect, beforeAll } from "vitest";
import Donation from "../../src/models/Donation.model.js";
import Delivery from "../../src/models/Delivery.model.js";
import Volunteer from "../../src/models/Volunteer.model.js";
import {
  authGet,
  authPost,
  createRoleAccounts,
  registerUser,
  loginUser,
} from "../helpers/auth.js";
import { connectTestDb } from "../helpers/db.js";
import {
  createDonationViaApi,
  runDonationToCompletion,
  refetchDonation,
} from "../helpers/e2eHelpers.js";
import { advanceMissionThroughDelivery } from "../helpers/fixtures.js";

describe("E2E — NGO Workflow", () => {
  let accounts;
  let ngoB;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-ngo");
    const ngoBReg = await registerUser("ngo", "e2e-ngo-b");
    ngoB = await loginUser(ngoBReg.email);

    const { donationId: id } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "E2E NGO Flow Meal",
      quantity: 8,
      estimatedMeals: 40,
    });
    donationId = id;

    await authPost(accounts.admin.accessToken, `/admin/donations/${donationId}/verify`);
  });

  it("NGO sees verified donation in incoming list", async () => {
    const incoming = await authGet(accounts.ngo.accessToken, "/ngo/donations/incoming");
    expect(incoming.status).toBe(200);
    expect(incoming.body.data?.donations?.some((d) => d.id === donationId)).toBe(true);
  });

  it("NGO accepts donation and DB reflects ngo_accepted", async () => {
    const accept = await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);
    expect(accept.status).toBe(200);
    expect(accept.body.data?.donation?.status).toBe("ngo_accepted");

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("ngo_accepted");
    expect(inDb.ngoId).toBeTruthy();
  });

  it("duplicate acceptance by same NGO is rejected", async () => {
    const again = await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);
    expect([400, 409]).toContain(again.status);
  });

  it("unauthorized NGO B cannot accept donation owned by NGO A", async () => {
    const attempt = await authPost(ngoB.accessToken, `/ngo/donations/${donationId}/accept`);
    expect([400, 403, 404, 409]).toContain(attempt.status);

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("ngo_accepted");
  });

  it("NGO accepted list reflects status after re-fetch", async () => {
    const accepted = await authGet(accounts.ngo.accessToken, "/ngo/donations/accepted");
    expect(accepted.status).toBe(200);
    expect(accepted.body.data?.donations?.some((d) => d.id === donationId)).toBe(true);

    const detail = await refetchDonation(accounts.ngo.accessToken, donationId, "ngo");
    expect(detail.status).toBe(200);
    expect(detail.body.data?.donation?.status).toBe("ngo_accepted");
  });
});

describe("E2E — Volunteer Pickup & Delivery Workflow", () => {
  let accounts;
  let volunteerB;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-vol");
    const volBReg = await registerUser("volunteer", "e2e-vol-b");
    volunteerB = await loginUser(volBReg.email);

    const { donationId: id } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "E2E Volunteer Flow Meal",
      quantity: 6,
      estimatedMeals: 30,
    });
    donationId = id;

    await authPost(accounts.admin.accessToken, `/admin/donations/${donationId}/verify`);
    await authPost(accounts.ngo.accessToken, `/ngo/donations/${donationId}/accept`);
  });

  it("volunteer sees available mission", async () => {
    const available = await authGet(accounts.volunteer.accessToken, "/volunteer/missions/available");
    expect(available.status).toBe(200);
    expect(available.body.data?.missions?.some((m) => m.id === donationId || m.donationId === donationId)).toBe(true);
  });

  it("volunteer accepts mission and delivery record is created", async () => {
    const accept = await authPost(
      accounts.volunteer.accessToken,
      `/volunteer/missions/${donationId}/accept`,
    );
    expect(accept.status).toBe(200);

    const donation = await Donation.findById(donationId);
    expect(["volunteer_assigned", "pickup_scheduled"].includes(donation.status)).toBe(true);

    const delivery = await Delivery.findOne({ donationId });
    expect(delivery).toBeTruthy();
    expect(delivery.status).toBeTruthy();
  });

  it("volunteer B cannot advance mission assigned to volunteer A", async () => {
    const advance = await authPost(volunteerB.accessToken, `/volunteer/missions/${donationId}/advance`, {
      action: "schedule_pickup",
    });
    expect([400, 403, 404, 409]).toContain(advance.status);
  });

  it("volunteer completes pickup and delivery chain", async () => {
    await advanceMissionThroughDelivery(accounts.volunteer.accessToken, donationId);

    const donation = await Donation.findById(donationId);
    expect(["delivered", "in_transit", "picked_up"].includes(donation.status)).toBe(true);

    const delivery = await Delivery.findOne({ donationId });
    expect(["delivery_verified", "delivered", "in_transit", "picked_up"].includes(delivery.status)).toBe(true);
  });

  it("duplicate delivery advance after completion is rejected", async () => {
    const again = await authPost(
      accounts.volunteer.accessToken,
      `/volunteer/missions/${donationId}/advance`,
      { action: "mark_delivered" },
    );
    expect([400, 409]).toContain(again.status);
  });

  it("mission status persists after re-login simulation", async () => {
    const assigned = await authGet(accounts.volunteer.accessToken, "/volunteer/missions/assigned");
    expect(assigned.status).toBe(200);

    const inDb = await Donation.findById(donationId);
    expect(inDb.volunteerId).toBeTruthy();

    const volProfile = await Volunteer.findOne({ userId: accounts.volunteer.user?.id });
    expect(volProfile).toBeTruthy();
  });
});

describe("E2E — Delivery → Inventory (quantity verification)", () => {
  let accounts;
  let result;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-inv");
    result = await runDonationToCompletion(accounts, {
      foodName: "E2E Inventory Quantity Meal",
      quantity: 12,
      quantityUnit: "kg",
      estimatedMeals: 60,
    });
  });

  it("inventory quantity matches delivery/donation quantity in DB", async () => {
    const { donation, inventory, delivery } = result;
    expect(donation.status).toBe("completed");
    expect(inventory).toBeTruthy();

    const expectedQty =
      delivery.deliveryQuantity || delivery.pickupQuantity || donation.quantity;
    expect(inventory.quantity).toBe(expectedQty);
    expect(inventory.initialQuantity).toBe(expectedQty);
    expect(inventory.sourceDonationId.toString()).toBe(donation._id.toString());
  });

  it("frontend/API inventory list matches DB", async () => {
    const apiList = await authGet(accounts.ngo.accessToken, "/ngo/inventory");
    expect(apiList.status).toBe(200);

    const dbItem = result.inventory;
    const apiItem = apiList.body.data?.items?.find((i) => i.id === dbItem._id.toString());
    expect(apiItem).toBeTruthy();
    expect(apiItem.quantity).toBe(dbItem.quantity);
  });
});
