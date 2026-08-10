/**
 * Phase 2 donation API tests.
 * Run: node scripts/test-donations.js
 * Requires MongoDB + running server.
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
const API = `http://localhost:${PORT}/api/v1`;
const ts = Date.now();

const passes = [];
const failures = [];

function pass(label) {
  passes.push(label);
  console.log(`✓ ${label}`);
}

function fail(label, detail = "") {
  failures.push({ label, detail });
  console.error(`✗ ${label}${detail ? ` — ${detail}` : ""}`);
}

async function request(method, url, body, token, isFormData = false) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(url, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* empty */
  }

  return { status: res.status, data };
}

function futureIso(hoursFromNow = 24) {
  return new Date(Date.now() + hoursFromNow * 3600 * 1000).toISOString();
}

const MINIMAL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

async function uploadDonationImages(token, donationId) {
  const formData = new FormData();
  formData.append("images", new Blob([MINIMAL_PNG], { type: "image/png" }), "donation-test.png");
  return request("POST", `${API}/donations/${donationId}/images`, formData, token, true);
}

async function registerDonor(email) {
  return request("POST", `${API}/auth/register`, {
    fullName: "Donation Test Donor",
    email,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role: "donor",
    address: {
      line1: "123 Donation St",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
    },
    profile: { donorType: "individual" },
  });
}

async function run() {
  console.log(`\n=== Donation API Tests (port ${PORT}) ===\n`);

  const donorEmail = `donation.donor.${ts}@example.com`;
  const reg = await registerDonor(donorEmail);

  if (reg.status !== 201) {
    fail("Register donor for donation tests", JSON.stringify(reg.data));
    console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
    process.exit(1);
  }

  const token = reg.data.data.accessToken;
  pass("Registered test donor");

  const createPayload = {
    foodName: "Vegetable Biryani",
    category: "cooked_meals",
    quantity: 5,
    quantityUnit: "kg",
    estimatedMeals: 40,
    freshness: "good",
    preparationTime: new Date().toISOString(),
    expiryTime: futureIso(12),
    pickupScheduledAt: futureIso(2),
    pickupEndAt: futureIso(4),
    pickupAddress: {
      line1: "456 Pickup Lane, Banjara Hills",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500034",
    },
    notes: "Handle with care",
    dietType: "vegetarian",
    packagingStatus: "Sealed containers",
    allergenInfo: "None declared",
  };

  const created = await request("POST", `${API}/donations`, createPayload, token);
  const donation = created.data?.data?.donation;

  if (created.status === 201 && donation?.id && donation.status === "pending") {
    pass("POST /donations creates donation with pending status");
  } else {
    fail("POST /donations", `status ${created.status} — ${JSON.stringify(created.data)}`);
  }

  const donationId = donation?.id;

  const history = await request("GET", `${API}/donations/${donationId}/history`, null, token);
  if (
    history.status === 200 &&
    Array.isArray(history.data?.data?.history) &&
    history.data.data.history.some((entry) => entry.toStatus === "pending")
  ) {
    pass("GET /donations/:id/history records initial pending status");
  } else {
    fail("GET /donations/:id/history (create)", `status ${history.status}`);
  }

  const listMine = await request("GET", `${API}/donations/my`, null, token);
  const listData = listMine.data?.data;

  if (
    listMine.status === 200 &&
    Array.isArray(listData?.donations) &&
    listData.donations.length >= 1 &&
    listData.statistics?.totalDonations >= 1
  ) {
    pass("GET /donations/my returns donations and statistics");
  } else {
    fail("GET /donations/my", `status ${listMine.status}`);
  }

  const getOne = await request("GET", `${API}/donations/${donationId}`, null, token);
  if (getOne.status === 200 && getOne.data?.data?.donation?.foodName === "Vegetable Biryani") {
    pass("GET /donations/:id returns donation details");
  } else {
    fail("GET /donations/:id", `status ${getOne.status}`);
  }

  const imageUpload = await uploadDonationImages(token, donationId);
  if (
    imageUpload.status === 200 &&
    imageUpload.data?.data?.donation?.images?.length >= 1
  ) {
    pass("POST /donations/:id/images uploads donation images");
  } else {
    fail("POST /donations/:id/images", `status ${imageUpload.status}`);
  }

  const patched = await request(
    "PATCH",
    `${API}/donations/${donationId}`,
    { foodName: "Updated Biryani", estimatedMeals: 45 },
    token,
  );

  if (patched.status === 200 && patched.data?.data?.donation?.foodName === "Updated Biryani") {
    pass("PATCH /donations/:id updates pending donation");
  } else {
    fail("PATCH /donations/:id", `status ${patched.status}`);
  }

  const otherDonorEmail = `donation.other.${ts}@example.com`;
  const otherReg = await registerDonor(otherDonorEmail);
  if (otherReg.status === 201) {
    const otherToken = otherReg.data.data.accessToken;
    const crossAccess = await request("GET", `${API}/donations/${donationId}`, null, otherToken);
    if (crossAccess.status === 404) {
      pass("GET /donations/:id blocks access to another donor's donation");
    } else {
      fail("Cross-donor access", `expected 404, got ${crossAccess.status}`);
    }
  } else {
    fail("Register second donor for cross-access test", `status ${otherReg.status}`);
  }

  const cancelled = await request("DELETE", `${API}/donations/${donationId}`, null, token);
  if (cancelled.status === 200 && cancelled.data?.data?.donation?.status === "cancelled") {
    pass("DELETE /donations/:id cancels donation via workflow");
  } else {
    fail("DELETE /donations/:id", `status ${cancelled.status}`);
  }

  const patchCancelled = await request(
    "PATCH",
    `${API}/donations/${donationId}`,
    { foodName: "Should Fail" },
    token,
  );
  if (patchCancelled.status === 400) {
    pass("PATCH /donations/:id rejects edit on cancelled donation");
  } else {
    fail("Edit guard on cancelled donation", `expected 400, got ${patchCancelled.status}`);
  }

  const cancelHistory = await request("GET", `${API}/donations/${donationId}/history`, null, token);
  if (
    cancelHistory.status === 200 &&
    cancelHistory.data?.data?.history?.some((entry) => entry.toStatus === "cancelled")
  ) {
    pass("Cancel transition recorded in donation history");
  } else {
    fail("History after cancel", `status ${cancelHistory.status}`);
  }

  const noToken = await request("GET", `${API}/donations/my`);
  if (noToken.status === 401) {
    pass("GET /donations/my without token returns 401");
  } else {
    fail("Unauthorized donation access", `expected 401, got ${noToken.status}`);
  }

  const ngoEmail = `donation.ngo.${ts}@example.com`;
  const ngoReg = await request("POST", `${API}/auth/register`, {
    fullName: "NGO Block Test",
    email: ngoEmail,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543211",
    role: "ngo",
    address: {
      line1: "789 NGO Ave",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
    },
    profile: { ngoName: "Test NGO", registrationNumber: `NGO${ts}` },
  });

  if (ngoReg.status === 201) {
    const ngoToken = ngoReg.data.data.accessToken;
    const blocked = await request("POST", `${API}/donations`, createPayload, ngoToken);
    if (blocked.status === 403) {
      pass("Non-donor role blocked from POST /donations");
    } else {
      fail("Donor authorization", `expected 403, got ${blocked.status}`);
    }
  } else {
    fail("Register NGO for auth test", `status ${ngoReg.status}`);
  }

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);

  if (failures.length) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
