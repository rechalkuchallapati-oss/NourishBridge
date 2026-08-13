import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { donationApi } from "../../src/modules/donations/api/client.js";
import { ngoApi } from "../../src/modules/ngo/api/client.js";
import { volunteerApi } from "../../src/modules/volunteer/api/client.js";
import { adminApi } from "../../src/modules/admin/api/client.js";
import { notificationApi } from "../../src/modules/notifications/api/client.js";
import {
  resetClientState,
  registerRole,
  loginAdmin,
  loginAs,
  loginAccount,
  donationPayload,
  advanceMissionThroughDelivery,
  expectAxiosError,
  DEFAULT_PASSWORD,
  futureIso,
} from "../helpers/integrationHelpers.js";

describe("Donation integration (frontend API clients)", () => {
  let donorEmail;
  let adminEmail;

  beforeAll(async () => {
    const donor = await registerRole("donor", "don");
    donorEmail = donor.email;
    const admin = await loginAdmin();
    adminEmail = admin.email;
  });

  beforeEach(() => {
    resetClientState();
  });

  it("creates donation and lists it for donor", async () => {
    await loginAs(donorEmail);
    const created = await donationApi.create(donationPayload({ foodName: "FE Donation List" }));
    expect(created.status).toBe(201);
    const donationId = created.data.data?.donation?.id;
    expect(donationId).toBeTruthy();

    const list = await donationApi.listMine();
    expect(list.status).toBe(200);
    const items = list.data.data?.donations || [];
    expect(items.some((d) => d.id === donationId)).toBe(true);
  });

  it("rejects invalid donation (400)", async () => {
    await loginAs(donorEmail);
    await expectAxiosError(
      donationApi.create(
        donationPayload({ expiryTime: new Date(Date.now() - 3600000).toISOString() }),
      ),
      400,
    );
  });

  it("NGO cannot create donation (403)", async () => {
    const ngo = await registerRole("ngo", "don-ngo-block");
    await loginAs(ngo.email);
    await expectAxiosError(donationApi.create(donationPayload()), 403);
  });
});

describe("NGO + Volunteer + Inventory workflow integration", () => {
  let donorEmail;
  let ngoEmail;
  let ngoBEmail;
  let volEmail;
  let adminEmail;
  let donationId;

  beforeAll(async () => {
    const donor = await registerRole("donor", "wf-d");
    const ngo = await registerRole("ngo", "wf-n");
    const ngoB = await registerRole("ngo", "wf-nb");
    const vol = await registerRole("volunteer", "wf-v");
    const admin = await loginAdmin();
    donorEmail = donor.email;
    ngoEmail = ngo.email;
    ngoBEmail = ngoB.email;
    volEmail = vol.email;
    adminEmail = admin.email;

    await loginAs(donorEmail);
    const created = await donationApi.create(donationPayload({ foodName: "FE Workflow Donation" }));
    donationId = created.data.data?.donation?.id;

    resetClientState();
    await loginAdmin();
    const { default: axiosInstance } = await import("../../src/api/axiosInstance.js");
    await axiosInstance.post(`/admin/donations/${donationId}/verify`);

    resetClientState();
    await loginAs(ngoEmail);
    await ngoApi.acceptDonation(donationId);
  });

  beforeEach(() => {
    resetClientState();
  });

  it("NGO sees accepted donation in list", async () => {
    await loginAs(ngoEmail);
    const accepted = await ngoApi.listAccepted();
    expect(accepted.status).toBe(200);
    const items = accepted.data.data?.donations || [];
    expect(items.some((d) => d.id === donationId)).toBe(true);
  });

  it("NGO B cannot accept donation owned by NGO A", async () => {
    await loginAs(ngoBEmail);
    try {
      await ngoApi.acceptDonation(donationId);
      throw new Error("Expected accept to fail for wrong NGO");
    } catch (error) {
      expect([400, 403, 404, 409]).toContain(error.response?.status);
    }
  });

  it("volunteer accepts and completes delivery workflow", async () => {
    await loginAs(volEmail);
    const accept = await volunteerApi.acceptMission(donationId);
    expect(accept.status).toBe(200);
    await advanceMissionThroughDelivery(volunteerApi, donationId);

    resetClientState();
    await loginAs(ngoEmail);
    const complete = await ngoApi.completeDonation(donationId);
    expect(complete.status).toBe(200);
    expect(complete.data.data?.donation?.status).toBe("completed");
  });

  it("inventory reflects server state after completion", async () => {
    await loginAs(ngoEmail);
    const inventory = await ngoApi.listInventory();
    expect(inventory.status).toBe(200);
    const items = inventory.data.data?.items || [];
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].quantity).toBeGreaterThan(0);
  });

  it("state persists after re-login (server source of truth)", async () => {
    await loginAs(ngoEmail);
    const first = await ngoApi.getDonation(donationId);
    expect(first.data.data?.donation?.status).toBe("completed");

    resetClientState();
    await loginAs(ngoEmail);
    const second = await ngoApi.getDonation(donationId);
    expect(second.data.data?.donation?.status).toBe("completed");
  });
});

describe("Notifications integration", () => {
  it("donor can list notifications and unread count", async () => {
    const { email } = await registerRole("donor", "notif");
    await loginAs(email);
    const list = await notificationApi.list();
    expect(list.status).toBe(200);
    expect(Array.isArray(list.data.data?.notifications)).toBe(true);

    const count = await notificationApi.unreadCount();
    expect(count.status).toBe(200);
    expect(typeof count.data.data?.count === "number").toBe(true);
  });
});

describe("Admin integration (frontend API clients)", () => {
  beforeEach(() => {
    resetClientState();
  });

  const endpoints = [
    ["getDashboard", () => adminApi.getDashboard()],
    ["listUsers", () => adminApi.listUsers()],
    ["listNgos", () => adminApi.listNgos()],
    ["listDonations", () => adminApi.listDonations()],
    ["listVolunteers", () => adminApi.listVolunteers()],
    ["listFoodRequests", () => adminApi.listFoodRequests()],
    ["listDeliveries", () => adminApi.listDeliveries()],
    ["listInventory", () => adminApi.listInventory()],
    ["getReports", () => adminApi.getReports()],
    ["listNotifications", () => adminApi.listNotifications()],
    ["listAuditLogs", () => adminApi.listAuditLogs()],
    ["listSupportTickets", () => adminApi.listSupportTickets()],
  ];

  beforeAll(async () => {
    await loginAdmin();
  });

  for (const [name, call] of endpoints) {
    it(`admin ${name} loads successfully`, async () => {
      resetClientState();
      await loginAdmin();
      const res = await call();
      expect(res.status).toBe(200);
    });
  }

  it("non-admin blocked from admin dashboard", async () => {
    const { email } = await registerRole("donor", "admin-block");
    await loginAs(email);
    await expectAxiosError(adminApi.getDashboard(), 403);
  });
});
