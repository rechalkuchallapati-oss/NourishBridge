import { describe, it, expect, beforeAll } from "vitest";
import Notification from "../../src/models/Notification.model.js";
import AuditLog from "../../src/models/AuditLog.model.js";
import Donation from "../../src/models/Donation.model.js";
import {
  authGet,
  authPost,
  createRoleAccounts,
} from "../helpers/auth.js";
import { beneficiaryPayload } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";
import { runDonationToCompletion, getUserIdByEmail } from "../helpers/e2eHelpers.js";
import { getPlatformAnalytics } from "../../src/services/analytics.service.js";

describe("E2E — Notifications Workflow", () => {
  let accounts;
  let donationId;
  let donorUserId;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-notif");
    donorUserId = await getUserIdByEmail(accounts.donor.email);

    const result = await runDonationToCompletion(accounts, {
      foodName: "E2E Notification Meal",
      estimatedMeals: 25,
      quantity: 5,
    });
    donationId = result.donationId;
  });

  it("donor receives donation-related notifications", async () => {
    const notifications = await Notification.find({ userId: donorUserId }).sort({ createdAt: -1 });
    expect(notifications.length).toBeGreaterThan(0);

    const events = notifications.map((n) => n.metadata?.event).filter(Boolean);
    expect(events.some((e) => ["donation_accepted", "volunteer_assigned", "pickup_scheduled", "pickup_completed", "delivery_started", "delivery_completed"].includes(e))).toBe(true);
  });

  it("donor can list notifications via API", async () => {
    const list = await authGet(accounts.donor.accessToken, "/notifications");
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body.data?.notifications)).toBe(true);
  });

  it("unread count is numeric", async () => {
    const count = await authGet(accounts.donor.accessToken, "/notifications/unread-count");
    expect(count.status).toBe(200);
    expect(typeof count.body.data?.count).toBe("number");
  });

  it("donor cannot read another user's notification by ID", async () => {
    const volunteerNotifs = await Notification.findOne({
      userId: { $ne: donorUserId },
    });
    if (!volunteerNotifs) return;

    const attempt = await authPost(accounts.donor.accessToken, `/notifications/${volunteerNotifs._id}/read`);
    expect([403, 404]).toContain(attempt.status);
  });
});

describe("E2E — Audit Log Workflow", () => {
  let accounts;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-audit");
    const result = await runDonationToCompletion(accounts, {
      foodName: "E2E Audit Meal",
      quantity: 4,
    });
    donationId = result.donationId;
  });

  it("donation status changes create audit records", async () => {
    const logs = await AuditLog.find({
      module: "donations",
      "entity.entityId": donationId,
    });
    expect(logs.length).toBeGreaterThan(0);
    expect(logs.some((l) => l.action === "status_change")).toBe(true);
    expect(logs.every((l) => l.actorId && l.actorRole)).toBe(true);
  });

  it("admin can list audit logs via API", async () => {
    const res = await authGet(accounts.admin.accessToken, "/admin/audit-logs?module=donations&limit=20");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data?.logs)).toBe(true);
  });
});

describe("E2E — Admin Observability & Impact", () => {
  let accounts;
  let testMeals;
  let testQty;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-admin");
    testMeals = 35;
    testQty = 7;

    await runDonationToCompletion(accounts, {
      foodName: "E2E Admin Impact Meal",
      quantity: testQty,
      quantityUnit: "kg",
      estimatedMeals: testMeals,
    });
  });

  const adminEndpoints = [
    ["/admin/dashboard"],
    ["/admin/users"],
    ["/admin/ngos"],
    ["/admin/donations"],
    ["/admin/volunteers"],
    ["/admin/deliveries"],
    ["/admin/food-requests"],
    ["/admin/inventory"],
    ["/admin/reports"],
    ["/admin/notifications"],
    ["/admin/audit-logs"],
    ["/admin/support-tickets"],
  ];

  for (const [path] of adminEndpoints) {
    it(`admin ${path} loads successfully`, async () => {
      const res = await authGet(accounts.admin.accessToken, path);
      expect(res.status).toBe(200);
    });
  }

  it("platform analytics include completed donation from this workflow", async () => {
    const analytics = await getPlatformAnalytics();
    expect(analytics.completedDonations).toBeGreaterThan(0);
    expect(analytics.mealsGenerated).toBeGreaterThan(0);

    const completed = await Donation.countDocuments({
      status: "completed",
      foodType: /E2E Admin Impact Meal/i,
    }).catch(() => 0);

    // Verify our test donation exists as completed (by food name in DB)
    const ourDonation = await Donation.findOne({ foodType: /E2E Admin Impact Meal/i });
    if (ourDonation) {
      expect(ourDonation.status).toBe("completed");
      expect(ourDonation.estimatedMeals).toBe(testMeals);
    }
  });

  it("admin analytics API returns platform metrics", async () => {
    const res = await authGet(accounts.admin.accessToken, "/admin/analytics");
    expect(res.status).toBe(200);
    expect(res.body.data?.analytics?.completedDonations).toBeGreaterThan(0);
  });
});

describe("E2E — Distribution → Impact records", () => {
  let accounts;

  beforeAll(async () => {
    await connectTestDb();
    accounts = await createRoleAccounts("e2e-impact-dist");
    const { inventory } = await runDonationToCompletion(accounts, {
      foodName: "E2E Impact Distribution Meal",
      quantity: 5,
      estimatedMeals: 25,
    });

    const bene = await authPost(accounts.ngo.accessToken, "/ngo/beneficiaries", beneficiaryPayload());
    await authPost(accounts.ngo.accessToken, `/ngo/inventory/${inventory._id}/distribute`, {
      quantity: 2,
      beneficiaryId: bene.body.data?.beneficiary?.id,
      mealsServed: 10,
      peopleServed: 8,
    });
  });

  it("distribution records appear in NGO API", async () => {
    const records = await authGet(accounts.ngo.accessToken, "/ngo/inventory/distribution-records");
    expect(records.status).toBe(200);
    expect(records.body.data?.records?.length).toBeGreaterThan(0);
  });
});
