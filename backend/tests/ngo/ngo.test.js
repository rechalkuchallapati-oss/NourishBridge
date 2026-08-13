import { describe, it, expect, beforeAll } from "vitest";
import Inventory from "../../src/models/Inventory.model.js";
import {
  authGet,
  authPost,
  createRoleAccounts,
} from "../helpers/auth.js";
import {
  donationPayload,
  beneficiaryPayload,
  createVerifiedDonation,
  advanceMissionThroughDelivery,
} from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";

describe("NGO Module", () => {
  let accounts;
  let ngoAToken;
  let ngoBToken;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("ngo-a");
    ngoAToken = accounts.ngo.accessToken;

    const ngoB = await (await import("../helpers/auth.js")).registerUser("ngo", "ngo-b", {
      profile: {
        ngoName: "NGO B Org",
        registrationNumber: `NGO-B-${Date.now()}`,
      },
    });
    expect(ngoB.res.status).toBe(201);
    ngoBToken = ngoB.tokens?.accessToken;

    const flow = await createVerifiedDonation(accounts, "ngo-flow");
    donationId = flow.donationId;
  });

  it("returns NGO dashboard", async () => {
    const res = await authGet(ngoAToken, "/ngo/dashboard");
    expect(res.status).toBe(200);
  });

  it("lists incoming donations", async () => {
    const res = await authGet(ngoAToken, "/ngo/donations/incoming");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.donations)).toBe(true);
  });

  it("lists accepted donations", async () => {
    const res = await authGet(ngoAToken, "/ngo/donations/accepted");
    expect(res.status).toBe(200);
    expect(res.body.data?.donations?.some((d) => d.id === donationId)).toBe(true);
  });

  it("returns donation statistics", async () => {
    const res = await authGet(ngoAToken, "/ngo/donations/statistics");
    expect(res.status).toBe(200);
    expect(res.body.data?.statistics || res.body.data).toBeTruthy();
  });

  it("NGO B cannot accept donation owned by NGO A", async () => {
    const res = await authPost(ngoBToken, `/ngo/donations/${donationId}/accept`);
    expect([400, 403, 404, 409]).toContain(res.status);
  });

  it("creates beneficiary", async () => {
    const res = await authPost(ngoAToken, "/ngo/beneficiaries", beneficiaryPayload());
    expect(res.status).toBe(201);
    expect(res.body.data?.beneficiary?.name).toBeTruthy();
  });

  it("lists beneficiaries", async () => {
    const res = await authGet(ngoAToken, "/ngo/beneficiaries");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.beneficiaries)).toBe(true);
  });

  it("completes full delivery workflow and inventory", async () => {
    const volToken = accounts.volunteer.accessToken;
    await (await import("../helpers/auth.js")).authPost(
      volToken,
      `/volunteer/missions/${donationId}/accept`,
    );
    await advanceMissionThroughDelivery(volToken, donationId);

    const complete = await authPost(ngoAToken, `/ngo/donations/${donationId}/complete`);
    expect(complete.status).toBe(200);
    expect(complete.body.data?.donation?.status).toBe("completed");

    const inventory = await authGet(ngoAToken, "/ngo/inventory");
    expect(inventory.status).toBe(200);
    expect(inventory.body.data?.items?.length).toBeGreaterThan(0);

    const itemId = inventory.body.data.items[0].id;
    const inDb = await Inventory.findById(itemId);
    expect(inDb).toBeTruthy();
    expect(inDb.quantity).toBeGreaterThan(0);
  });

  it("returns inventory statistics", async () => {
    const res = await authGet(ngoAToken, "/ngo/inventory/statistics");
    expect(res.status).toBe(200);
  });

  it("returns inventory alerts", async () => {
    const res = await authGet(ngoAToken, "/ngo/inventory/alerts");
    expect(res.status).toBe(200);
  });
});
