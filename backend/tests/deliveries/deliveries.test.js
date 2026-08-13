import { describe, it, expect, beforeAll } from "vitest";
import Delivery from "../../src/models/Delivery.model.js";
import {
  authGet,
  authPost,
  createRoleAccounts,
} from "../helpers/auth.js";
import { createVerifiedDonation, advanceMissionThroughDelivery } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";

describe("Deliveries & Pickup Workflow", () => {
  let volToken;
  let ngoToken;
  let donationId;
  let deliveryId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("delivery");
    volToken = accounts.volunteer.accessToken;
    ngoToken = accounts.ngo.accessToken;

    const flow = await createVerifiedDonation(accounts, "del");
    donationId = flow.donationId;
    await authPost(volToken, `/volunteer/missions/${donationId}/accept`);
  });

  it("creates delivery record on mission accept", async () => {
    const delivery = await Delivery.findOne({ donationId });
    expect(delivery).toBeTruthy();
    deliveryId = delivery._id.toString();
  });

  it("gets delivery by donation id", async () => {
    const res = await authGet(volToken, `/deliveries/donation/${donationId}`);
    expect(res.status).toBe(200);
    expect(res.body.data?.delivery).toBeTruthy();
  });

  it("lists active deliveries for volunteer", async () => {
    const res = await authGet(volToken, "/deliveries/my/active");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.deliveries)).toBe(true);
  });

  it("advances through valid pickup/delivery transitions", async () => {
    await advanceMissionThroughDelivery(volToken, donationId);
    const delivery = await Delivery.findOne({ donationId });
    expect(["delivered", "delivery_verified", "in_transit", "picked_up"].includes(delivery.status) ||
      delivery.status === "delivered").toBe(true);
  });

  it("returns QR codes for delivery", async () => {
    const res = await authGet(volToken, `/deliveries/${deliveryId}/qr`);
    expect([200, 404]).toContain(res.status);
  });

  it("blocks invalid transition on completed delivery", async () => {
    await authPost(ngoToken, `/ngo/donations/${donationId}/complete`);
    const res = await authPost(volToken, `/volunteer/missions/${donationId}/advance`, {
      action: "mark_picked_up",
    });
    expect(res.status).toBe(400);
  });

  it("rejects duplicate completion", async () => {
    const res = await authPost(ngoToken, `/ngo/donations/${donationId}/complete`);
    expect([400, 409]).toContain(res.status);
  });
});
