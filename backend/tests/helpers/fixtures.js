import { futureIso } from "./constants.js";

export function donationPayload(overrides = {}) {
  return {
    foodName: "Test Meal Pack",
    category: "cooked_meals",
    quantity: 10,
    quantityUnit: "kg",
    estimatedMeals: 50,
    expiryTime: futureIso(12),
    pickupScheduledAt: futureIso(2),
    pickupEndAt: futureIso(4),
    pickupAddress: {
      line1: "Pickup Lane",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500001",
    },
    ...overrides,
  };
}

export function foodRequestPayload(overrides = {}) {
  return {
    foodItem: "Rice & Dal",
    foodCategory: "cooked_meals",
    quantityNeeded: 100,
    quantityUnit: "meals",
    estimatedMeals: 100,
    beneficiaries: 80,
    priority: "high",
    requiredDate: futureIso(48),
    location: "Hyderabad",
    ...overrides,
  };
}

export function beneficiaryPayload(overrides = {}) {
  return {
    name: "Test Beneficiary Group",
    category: "community_kitchen",
    contactPerson: "Beneficiary Lead",
    contactPhone: "9876501234",
    estimatedPeople: 50,
    address: {
      line1: "Shelter Road",
      city: "Hyderabad",
      pincode: "500002",
    },
    ...overrides,
  };
}

export function supportTicketPayload(overrides = {}) {
  return {
    subject: "Test support ticket",
    description: "Automated test ticket for support module verification.",
    priority: "medium",
    category: "technical",
    ...overrides,
  };
}

export async function createVerifiedDonation(accounts, suffix = "don") {
  const { donor, ngo, admin } = accounts;

  const created = await (await import("./auth.js")).authPost(
    donor.accessToken,
    "/donations",
    donationPayload({ foodName: `Donation ${suffix}` }),
  );

  const donationId = created.body?.data?.donation?.id;
  if (created.status !== 201 || !donationId) {
    throw new Error(`Failed to create donation: ${created.status} ${JSON.stringify(created.body)}`);
  }

  await (await import("./auth.js")).authPost(
    admin.accessToken,
    `/admin/donations/${donationId}/verify`,
  );

  await (await import("./auth.js")).authPost(
    ngo.accessToken,
    `/ngo/donations/${donationId}/accept`,
  );

  return { donationId, createRes: created };
}

export async function advanceMissionThroughDelivery(volunteerToken, donationId) {
  const { authPost } = await import("./auth.js");
  const actions = ["schedule_pickup", "mark_picked_up", "mark_in_transit", "mark_delivered"];

  for (const action of actions) {
    const res = await authPost(volunteerToken, `/volunteer/missions/${donationId}/advance`, {
      action,
    });
    if (res.status !== 200) {
      throw new Error(`Mission advance '${action}' failed: ${res.status} ${JSON.stringify(res.body)}`);
    }
  }
}
