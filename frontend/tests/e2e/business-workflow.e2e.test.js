/**
 * Frontend-layer E2E business workflow — uses actual frontend API clients
 * against live backend (same stack as Step 4, extended for full business scenario).
 *
 * Requires backend running on port 5000 OR uses VITE_API_BASE_URL from tests/setup/env.js
 */
import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { donationApi } from "../../src/modules/donations/api/client.js";
import { ngoApi } from "../../src/modules/ngo/api/client.js";
import { volunteerApi } from "../../src/modules/volunteer/api/client.js";
import { adminApi } from "../../src/modules/admin/api/client.js";
import { notificationApi } from "../../src/modules/notifications/api/client.js";
import { foodRequestApi } from "../../src/modules/foodRequests/services/foodRequestService.js";
import axiosInstance from "../../src/api/axiosInstance.js";
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
import * as authService from "../../src/modules/auth/services/authService.js";

describe("Frontend E2E — Complete Business Scenario", () => {
  let donor;
  let ngo;
  let volunteer;
  let admin;
  let donationId;
  let inventoryItemId;

  beforeAll(async () => {
    donor = await registerRole("donor", "e2e-fe-d");
    ngo = await registerRole("ngo", "e2e-fe-n");
    volunteer = await registerRole("volunteer", "e2e-fe-v");
    admin = await loginAdmin();
  });

  beforeEach(() => {
    resetClientState();
  });

  it("donor creates donation via frontend client", async () => {
    await loginAs(donor.email);
    const created = await donationApi.create(
      donationPayload({ foodName: "FE E2E Complete Meal", estimatedMeals: 45, quantity: 9 }),
    );
    expect(created.status).toBe(201);
    donationId = created.data.data?.donation?.id;
    expect(donationId).toBeTruthy();

    const list = await donationApi.listMine();
    expect(list.data.data?.donations?.some((d) => d.id === donationId)).toBe(true);
  });

  it("admin verifies → NGO accepts → volunteer delivers → NGO completes", async () => {
    await loginAdmin();
    await axiosInstance.post(`/admin/donations/${donationId}/verify`);

    resetClientState();
    await loginAs(ngo.email);
    await ngoApi.acceptDonation(donationId);

    resetClientState();
    await loginAs(volunteer.email);
    await volunteerApi.acceptMission(donationId);
    await advanceMissionThroughDelivery(volunteerApi, donationId);

    resetClientState();
    await loginAs(ngo.email);
    const complete = await ngoApi.completeDonation(donationId);
    expect(complete.data.data?.donation?.status).toBe("completed");
  });

  it("inventory and distribution via frontend NGO client", async () => {
    await loginAs(ngo.email);
    const inventory = await ngoApi.listInventory();
    const item = inventory.data.data?.items?.find((i) => i.sourceDonationId === donationId);
    expect(item).toBeTruthy();
    inventoryItemId = item.id;

    const bene = await axiosInstance.post("/ngo/beneficiaries", {
      name: "FE E2E Beneficiary",
      category: "community_kitchen",
      contactPerson: "Lead",
      contactPhone: "9876501234",
      estimatedPeople: 30,
      address: { line1: "Shelter", city: "Hyderabad", pincode: "500002" },
    });
    const beneficiaryId = bene.data.data?.beneficiary?.id;

    const distribute = await ngoApi.distributeInventory(inventoryItemId, {
      quantity: 1,
      beneficiaryId,
      mealsServed: 5,
      peopleServed: 4,
    });
    expect(distribute.status).toBe(200);

    const records = await ngoApi.listDistributionRecords();
    expect(records.data.data?.records?.length).toBeGreaterThan(0);
  });

  it("food request workflow via frontend client", async () => {
    await loginAs(ngo.email);
    const created = await foodRequestApi.create({
      foodItem: "FE E2E Food Request",
      foodCategory: "cooked_meals",
      quantityNeeded: 50,
      quantityUnit: "meals",
      estimatedMeals: 50,
      beneficiaries: 40,
      priority: "high",
      requiredDate: futureIso(48),
      location: "Hyderabad",
    });
    expect(created.status).toBe(201);
    const requestId = created.data.data?.request?.id;

    resetClientState();
    await loginAdmin();
    await axiosInstance.post(`/admin/food-requests/${requestId}/review`);
    await axiosInstance.post(`/admin/food-requests/${requestId}/approve`);

    resetClientState();
    await loginAs(ngo.email);
    const list = await foodRequestApi.list();
    expect(list.data.data?.requests?.some((r) => r.id === requestId)).toBe(true);
  });

  it("notifications and admin observability via frontend clients", async () => {
    await loginAs(donor.email);
    const notifs = await notificationApi.list();
    expect(notifs.status).toBe(200);

    resetClientState();
    await loginAdmin();
    const dashboard = await adminApi.getDashboard();
    expect(dashboard.status).toBe(200);

    const donations = await adminApi.listDonations();
    expect(donations.data.data?.donations?.some((d) => d.id === donationId)).toBe(true);

    const audit = await adminApi.listAuditLogs();
    expect(audit.status).toBe(200);
  });

  it("persistence — re-login shows completed donation", async () => {
    resetClientState();
    await authService.login({ email: ngo.email, password: DEFAULT_PASSWORD, rememberMe: true });
    const detail = await ngoApi.getDonation(donationId);
    expect(detail.data.data?.donation?.status).toBe("completed");
  });

  it("failure — invalid donation rejected by frontend client", async () => {
    await loginAs(donor.email);
    await expectAxiosError(
      donationApi.create(
        donationPayload({ expiryTime: new Date(Date.now() - 3600000).toISOString() }),
      ),
      400,
    );
  });
});

describe("Frontend E2E — Role isolation", () => {
  let donor;
  let admin;

  beforeAll(async () => {
    donor = await registerRole("donor", "e2e-fe-rbac");
    admin = await loginAdmin();
  });

  beforeEach(() => {
    resetClientState();
  });

  it("donor cannot access admin dashboard via frontend client", async () => {
    await loginAccount(donor);
    await expectAxiosError(adminApi.getDashboard(), 403);
  });
});
