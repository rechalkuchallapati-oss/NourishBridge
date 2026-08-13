import { describe, it, expect, beforeAll } from "vitest";
import Donation from "../../src/models/Donation.model.js";
import Delivery from "../../src/models/Delivery.model.js";
import Inventory from "../../src/models/Inventory.model.js";
import DistributionRecord from "../../src/models/DistributionRecord.model.js";
import Notification from "../../src/models/Notification.model.js";
import AuditLog from "../../src/models/AuditLog.model.js";
import FoodRequest from "../../src/models/FoodRequest.model.js";
import {
  authGet,
  authPost,
  createRoleAccounts,
} from "../helpers/auth.js";
import {
  donationPayload,
  foodRequestPayload,
  beneficiaryPayload,
  advanceMissionThroughDelivery,
} from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";
import { getUserIdByEmail } from "../helpers/e2eHelpers.js";
import { getPlatformAnalytics } from "../../src/services/analytics.service.js";

/**
 * Task 15 — Complete automated E2E business scenario:
 * DONOR → ADMIN → NGO → VOLUNTEER → INVENTORY → DISTRIBUTION → OBSERVABILITY
 */
describe("E2E — Complete Business Scenario (Task 15)", () => {
  let donor;
  let ngo;
  let volunteer;
  let admin;
  let donationId;
  let inventoryId;
  let beneficiaryId;
  let foodRequestId;
  let donorUserId;

  const MEALS = 40;
  const QTY = 8;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("e2e-complete");
    donor = accounts.donor;
    ngo = accounts.ngo;
    volunteer = accounts.volunteer;
    admin = accounts.admin;
    donorUserId = await getUserIdByEmail(donor.email);
  });

  it("STEP 1 — Donor registers (via setup) and creates donation", async () => {
    const created = await authPost(
      donor.accessToken,
      "/donations",
      donationPayload({
        foodName: "E2E Complete Scenario Meal",
        estimatedMeals: MEALS,
        quantity: QTY,
      }),
    );
    expect(created.status).toBe(201);
    donationId = created.body.data?.donation?.id;
    expect(donationId).toBeTruthy();

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("pending");
    expect(inDb.estimatedMeals).toBe(MEALS);
  });

  it("STEP 2 — Admin verifies donation", async () => {
    const verify = await authPost(admin.accessToken, `/admin/donations/${donationId}/verify`);
    expect(verify.status).toBe(200);

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("verified");
  });

  it("STEP 3 — NGO receives and accepts donation", async () => {
    const incoming = await authGet(ngo.accessToken, "/ngo/donations/incoming");
    expect(incoming.body.data?.donations?.some((d) => d.id === donationId)).toBe(true);

    const accept = await authPost(ngo.accessToken, `/ngo/donations/${donationId}/accept`);
    expect(accept.status).toBe(200);

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("ngo_accepted");
  });

  it("STEP 4 — Volunteer accepts mission and completes pickup/delivery", async () => {
    const accept = await authPost(volunteer.accessToken, `/volunteer/missions/${donationId}/accept`);
    expect(accept.status).toBe(200);

    await advanceMissionThroughDelivery(volunteer.accessToken, donationId);

    const donation = await Donation.findById(donationId);
    expect(["delivered", "in_transit", "picked_up"].includes(donation.status)).toBe(true);

    const delivery = await Delivery.findOne({ donationId });
    expect(delivery).toBeTruthy();
  });

  it("STEP 5 — NGO completes donation → inventory created", async () => {
    const complete = await authPost(ngo.accessToken, `/ngo/donations/${donationId}/complete`);
    expect(complete.status).toBe(200);

    const donation = await Donation.findById(donationId);
    expect(donation.status).toBe("completed");

    const inventory = await Inventory.findOne({ sourceDonationId: donationId });
    expect(inventory).toBeTruthy();
    expect(inventory.quantity).toBe(QTY);
    inventoryId = inventory._id.toString();
  });

  it("STEP 6 — NGO distributes food from inventory", async () => {
    const bene = await authPost(ngo.accessToken, "/ngo/beneficiaries", beneficiaryPayload({
      name: "E2E Complete Beneficiary",
    }));
    beneficiaryId = bene.body.data?.beneficiary?.id;

    const distribute = await authPost(ngo.accessToken, `/ngo/inventory/${inventoryId}/distribute`, {
      quantity: 2,
      beneficiaryId,
      mealsServed: 10,
      peopleServed: 8,
    });
    expect(distribute.status).toBe(200);

    const record = await DistributionRecord.findOne({ inventoryId });
    expect(record).toBeTruthy();
    expect(record.quantity).toBe(2);

    const item = await Inventory.findById(inventoryId);
    expect(item.quantity).toBe(QTY - 2);
  });

  it("STEP 7 — NGO creates food request (parallel track)", async () => {
    const req = await authPost(ngo.accessToken, "/food-requests", foodRequestPayload({
      foodItem: "E2E Complete Food Request",
    }));
    expect(req.status).toBe(201);
    foodRequestId = req.body.data?.request?.id;

    await authPost(admin.accessToken, `/admin/food-requests/${foodRequestId}/review`);
    await authPost(admin.accessToken, `/admin/food-requests/${foodRequestId}/approve`);

    const inDb = await FoodRequest.findById(foodRequestId);
    expect(inDb.status).toBe("approved");
  });

  it("STEP 8 — Notifications generated for donor", async () => {
    const notifications = await Notification.find({ userId: donorUserId });
    expect(notifications.length).toBeGreaterThan(0);

    const apiList = await authGet(donor.accessToken, "/notifications");
    expect(apiList.status).toBe(200);
  });

  it("STEP 9 — Audit logs record workflow actions", async () => {
    const logs = await AuditLog.find({
      module: "donations",
      "entity.entityId": donationId,
    });
    expect(logs.length).toBeGreaterThan(0);
    expect(logs.some((l) => l.action === "status_change")).toBe(true);
  });

  it("STEP 10 — Admin dashboard and analytics reflect activity", async () => {
    const dashboard = await authGet(admin.accessToken, "/admin/dashboard");
    expect(dashboard.status).toBe(200);

    const analytics = await getPlatformAnalytics();
    expect(analytics.completedDonations).toBeGreaterThan(0);

    const adminAnalytics = await authGet(admin.accessToken, "/admin/analytics");
    expect(adminAnalytics.status).toBe(200);
    expect(adminAnalytics.body.data?.analytics).toBeTruthy();
  });

  it("STEP 11 — State persists after re-fetch (database source of truth)", async () => {
    const refetch = await authGet(ngo.accessToken, `/ngo/donations/${donationId}`);
    expect(refetch.body.data?.donation?.status).toBe("completed");

    const inDb = await Donation.findById(donationId);
    expect(inDb.status).toBe("completed");
    expect(inDb.estimatedMeals).toBe(MEALS);
  });
});
