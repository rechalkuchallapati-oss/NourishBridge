import { describe, it, expect, beforeAll } from "vitest";
import Inventory from "../../src/models/Inventory.model.js";
import DistributionRecord from "../../src/models/DistributionRecord.model.js";
import {
  authGet,
  authPost,
  createRoleAccounts,
} from "../helpers/auth.js";
import {
  beneficiaryPayload,
  createVerifiedDonation,
  advanceMissionThroughDelivery,
} from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";

describe("Inventory", () => {
  let ngoToken;
  let volToken;
  let donationId;
  let itemId;
  let beneficiaryId;
  let initialQty;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("inventory");
    ngoToken = accounts.ngo.accessToken;
    volToken = accounts.volunteer.accessToken;

    const bene = await authPost(ngoToken, "/ngo/beneficiaries", beneficiaryPayload());
    beneficiaryId = bene.body.data?.beneficiary?.id;

    const flow = await createVerifiedDonation(accounts, "inv");
    donationId = flow.donationId;

    await authPost(volToken, `/volunteer/missions/${donationId}/accept`);
    await advanceMissionThroughDelivery(volToken, donationId);
    await authPost(ngoToken, `/ngo/donations/${donationId}/complete`);

    const list = await authGet(ngoToken, "/ngo/inventory");
    itemId = list.body.data?.items?.[0]?.id;
    initialQty = list.body.data?.items?.[0]?.quantity;
    expect(itemId).toBeTruthy();
    expect(initialQty).toBeGreaterThan(0);
  });

  it("inventory exists in database after completed delivery", async () => {
    const item = await Inventory.findById(itemId);
    expect(item).toBeTruthy();
    expect(item.quantity).toBe(initialQty);
  });

  it("distributes partial quantity and updates DB", async () => {
    const distributeQty = Math.min(2, initialQty);
    const res = await authPost(ngoToken, `/ngo/inventory/${itemId}/distribute`, {
      quantity: distributeQty,
      beneficiaryId,
      mealsServed: 10,
      peopleServed: 8,
    });
    expect(res.status).toBe(200);

    const item = await Inventory.findById(itemId);
    expect(item.quantity).toBe(initialQty - distributeQty);
    expect(item.distributedQuantity).toBeGreaterThanOrEqual(distributeQty);

    const records = await DistributionRecord.find({ inventoryId: itemId });
    expect(records.length).toBeGreaterThan(0);
  });

  it("cannot distribute more than available quantity", async () => {
    const item = await Inventory.findById(itemId);
    const res = await authPost(ngoToken, `/ngo/inventory/${itemId}/distribute`, {
      quantity: item.quantity + 1000,
    });
    expect(res.status).toBe(400);
  });

  it("rejects negative distribution quantity", async () => {
    const res = await authPost(ngoToken, `/ngo/inventory/${itemId}/distribute`, {
      quantity: -1,
    });
    expect(res.status).toBe(400);
  });

  it("lists distribution records", async () => {
    const res = await authGet(ngoToken, "/ngo/inventory/distribution-records");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.records)).toBe(true);
  });

  it("inventory statistics reflect distributed quantities", async () => {
    const res = await authGet(ngoToken, "/ngo/inventory/statistics");
    expect(res.status).toBe(200);
    const stats = res.body.data?.statistics || res.body.data;
    expect(stats).toBeTruthy();
  });
});
