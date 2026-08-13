import { describe, it, expect, beforeAll } from "vitest";
import Inventory from "../../src/models/Inventory.model.js";
import DistributionRecord from "../../src/models/DistributionRecord.model.js";
import Beneficiary from "../../src/models/Beneficiary.model.js";
import {
  authGet,
  authPost,
  createRoleAccounts,
  registerUser,
} from "../helpers/auth.js";
import { beneficiaryPayload } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";
import { runDonationToCompletion } from "../helpers/e2eHelpers.js";

describe("E2E — Inventory → Distribution Workflow", () => {
  let accounts;
  let inventoryItem;
  let beneficiaryId;
  const distributeQty = 2;
  const initialQty = 10;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-dist");
    const { inventory } = await runDonationToCompletion(accounts, {
      foodName: "E2E Distribution Meal",
      quantity: initialQty,
      estimatedMeals: 50,
    });
    inventoryItem = inventory;

    const bene = await authPost(accounts.ngo.accessToken, "/ngo/beneficiaries", beneficiaryPayload());
    beneficiaryId = bene.body.data?.beneficiary?.id;
  });

  it("NGO distributes food and stock decreases in DB", async () => {
    const before = await Inventory.findById(inventoryItem._id);
    expect(before.quantity).toBe(initialQty);

    const distribute = await authPost(
      accounts.ngo.accessToken,
      `/ngo/inventory/${inventoryItem._id}/distribute`,
      {
        quantity: distributeQty,
        beneficiaryId,
        mealsServed: 10,
        peopleServed: 8,
      },
    );
    expect(distribute.status).toBe(200);

    const after = await Inventory.findById(inventoryItem._id);
    expect(after.quantity).toBe(initialQty - distributeQty);
    expect(after.distributedQuantity).toBe(distributeQty);
  });

  it("distribution record is created", async () => {
    const records = await DistributionRecord.find({ inventoryId: inventoryItem._id });
    expect(records.length).toBeGreaterThan(0);
    expect(records[0].quantity).toBe(distributeQty);
    expect(records[0].beneficiaryId?.toString()).toBe(beneficiaryId);
  });

  it("API distribution records list matches DB", async () => {
    const apiRecords = await authGet(accounts.ngo.accessToken, "/ngo/inventory/distribution-records");
    expect(apiRecords.status).toBe(200);
    expect(apiRecords.body.data?.records?.length).toBeGreaterThan(0);
  });

  it("rejects distribution greater than available stock", async () => {
    const item = await Inventory.findById(inventoryItem._id);
    const excess = await authPost(
      accounts.ngo.accessToken,
      `/ngo/inventory/${inventoryItem._id}/distribute`,
      { quantity: item.quantity + 100, mealsServed: 5 },
    );
    expect(excess.status).toBe(400);

    const unchanged = await Inventory.findById(inventoryItem._id);
    expect(unchanged.quantity).toBe(item.quantity);
  });

  it("unauthorized NGO cannot distribute another NGO's inventory", async () => {
    const otherNgo = await registerUser("ngo", "e2e-dist-other");
    const { loginUser } = await import("../helpers/auth.js");
    const otherLogin = await loginUser(otherNgo.email);
    const attempt = await authPost(
      otherLogin.accessToken,
      `/ngo/inventory/${inventoryItem._id}/distribute`,
      { quantity: 1, mealsServed: 5 },
    );
    expect([403, 404]).toContain(attempt.status);
  });

  it("inventory statistics reflect server state", async () => {
    const stats = await authGet(accounts.ngo.accessToken, "/ngo/inventory/statistics");
    expect(stats.status).toBe(200);
    expect(typeof stats.body.data?.statistics?.availableFoodStock).toBe("number");
  });
});
