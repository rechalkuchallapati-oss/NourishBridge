import { describe, it, expect, beforeAll } from "vitest";
import FoodRequest from "../../src/models/FoodRequest.model.js";
import {
  authGet,
  authPost,
  authDelete,
  createRoleAccounts,
} from "../helpers/auth.js";
import { foodRequestPayload } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";
import { createDonationViaApi } from "../helpers/e2eHelpers.js";

describe("E2E — Food Request Workflow", () => {
  let ngoToken;
  let adminToken;
  let requestId;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("e2e-foodreq");
    ngoToken = accounts.ngo.accessToken;
    adminToken = accounts.admin.accessToken;

    const created = await authPost(ngoToken, "/food-requests", foodRequestPayload({
      foodItem: "E2E Rice & Dal Request",
      quantityNeeded: 80,
    }));
    requestId = created.body.data?.request?.id;
    expect(requestId).toBeTruthy();
  });

  it("NGO creates food request → requested status in DB", async () => {
    const inDb = await FoodRequest.findById(requestId);
    expect(inDb).toBeTruthy();
    expect(inDb.status).toBe("requested");
  });

  it("rejects invalid food request payload (400)", async () => {
    const res = await authPost(ngoToken, "/food-requests", { foodItem: "" });
    expect(res.status).toBe(400);
  });

  it("donor cannot create food request (403)", async () => {
    const accounts = await createRoleAccounts("e2e-foodreq-donor-block");
    const res = await authPost(
      accounts.donor.accessToken,
      "/food-requests",
      foodRequestPayload({ foodItem: "Donor Attempt" }),
    );
    expect(res.status).toBe(403);
  });

  it("admin reviews and approves request", async () => {
    const review = await authPost(adminToken, `/admin/food-requests/${requestId}/review`);
    expect(review.status).toBe(200);

    const approve = await authPost(adminToken, `/admin/food-requests/${requestId}/approve`);
    expect(approve.status).toBe(200);

    const inDb = await FoodRequest.findById(requestId);
    expect(inDb.status).toBe("approved");
  });

  it("admin matches donation to approved request", async () => {
    const accounts = await createRoleAccounts("e2e-foodreq-match");
    const { donationId: dId } = await createDonationViaApi(accounts.donor.accessToken, {
      foodName: "Match Target Meal",
    });
    donationId = dId;

    await authPost(accounts.admin.accessToken, `/admin/donations/${donationId}/verify`);

    const match = await authPost(adminToken, `/admin/food-requests/${requestId}/match`, {
      donationId,
    });
    expect(match.status).toBe(200);

    const inDb = await FoodRequest.findById(requestId);
    expect(inDb.status).toBe("donation_matched");
    expect(inDb.matchedDonationIds?.map(String)).toContain(String(donationId));
  });

  it("request history is available after transitions", async () => {
    const history = await authGet(ngoToken, `/food-requests/${requestId}/history`);
    expect(history.status).toBe(200);
    expect(history.body.data?.history?.length).toBeGreaterThan(0);
  });

  it("NGO can cancel a separate open request", async () => {
    const created = await authPost(ngoToken, "/food-requests", foodRequestPayload({
      foodItem: "Cancel Me E2E",
    }));
    const id = created.body.data?.request?.id;
    const cancel = await authDelete(ngoToken, `/food-requests/${id}`, { reason: "Test cancel" });
    expect([200, 204]).toContain(cancel.status);

    const inDb = await FoodRequest.findById(id);
    expect(inDb.status).toBe("cancelled");
  });

  it("NOT IMPLEMENTED: fulfill via HTTP API — no route exposes fulfill transition", () => {
    // Transitions define FULFILL (delivery_scheduled|volunteer_assigned|donation_matched → fulfilled)
    // but admin.routes.js only exposes review, approve, reject, match — not fulfill.
    // Distribution fulfillment is handled separately via inventory distribution workflow.
    expect(true).toBe(true);
  });
});
