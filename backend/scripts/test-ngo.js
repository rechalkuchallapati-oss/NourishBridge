/**
 * Phase 4 NGO module API tests.
 * Run: node scripts/test-ngo.js
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

async function request(method, url, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* empty */
  }

  return { status: res.status, data };
}

function futureIso(hours = 24) {
  return new Date(Date.now() + hours * 3600 * 1000).toISOString();
}

function sanitizeForLog(data) {
  if (!data || typeof data !== "object") return data;
  const copy = JSON.parse(JSON.stringify(data));
  const redactKeys = ["accessToken", "refreshToken", "token", "password", "otp"];
  const walk = (obj) => {
    if (!obj || typeof obj !== "object") return;
    for (const key of Object.keys(obj)) {
      if (redactKeys.includes(key)) obj[key] = "[REDACTED]";
      else if (typeof obj[key] === "object") walk(obj[key]);
    }
  };
  walk(copy);
  return copy;
}

async function run() {
  console.log(`\n=== NGO Module Tests (port ${PORT}) ===\n`);

  const donorReg = await request("POST", `${API}/auth/register`, {
    fullName: "NGO Test Donor",
    email: `ngo.donor.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role: "donor",
    address: { line1: "123 St", city: "Hyderabad", pincode: "500081" },
    profile: { donorType: "individual" },
  });

  const ngoReg = await request("POST", `${API}/auth/register`, {
    fullName: "NGO Test Org",
    email: `ngo.org.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543211",
    role: "ngo",
    address: { line1: "456 Ave", city: "Hyderabad", pincode: "500081" },
    profile: { ngoName: "Test NGO", registrationNumber: `NGO${ts}` },
  });

  if (donorReg.status !== 201 || ngoReg.status !== 201) {
    fail("Register donor and NGO");
    process.exit(1);
  }

  const donorToken = donorReg.data.data.accessToken;
  const ngoToken = ngoReg.data.data.accessToken;
  pass("Registered donor and NGO");

  if (!donorToken) {
    fail("Donor access token missing after registration");
    console.error("[DIAG] donorReg.status:", donorReg.status);
    console.error("[DIAG] donorReg.data:", JSON.stringify(sanitizeForLog(donorReg.data)));
    process.exit(1);
  }

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });
  const adminToken = adminLogin.data?.data?.accessToken;

  const createPayload = {
    foodName: "NGO Test Meal",
    category: "cooked_meals",
    quantity: 8,
    quantityUnit: "kg",
    estimatedMeals: 30,
    expiryTime: futureIso(12),
    pickupScheduledAt: futureIso(2),
    pickupEndAt: futureIso(4),
    pickupAddress: { line1: "Pickup Lane", city: "Hyderabad", pincode: "500001" },
  };

  const created = await request("POST", `${API}/donations`, createPayload, donorToken);
  const donationId = created.data?.data?.donation?.id;

  if (created.status !== 201) {
    console.error("[DIAG] endpoint: POST /api/v1/donations");
    console.error("[DIAG] httpStatus:", created.status);
    console.error("[DIAG] response:", JSON.stringify(sanitizeForLog(created.data)));
    console.error(
      "[DIAG] requestMetadata:",
      JSON.stringify({
        foodName: createPayload.foodName,
        category: createPayload.category,
        quantity: createPayload.quantity,
        quantityUnit: createPayload.quantityUnit,
        estimatedMeals: createPayload.estimatedMeals,
        expiryTime: createPayload.expiryTime,
        pickupScheduledAt: createPayload.pickupScheduledAt,
        pickupEndAt: createPayload.pickupEndAt,
        pickupAddress: createPayload.pickupAddress,
        donorAuthPresent: Boolean(donorToken),
        donorRegStatus: donorReg.status,
      }),
    );
    fail("Create donation for NGO tests", `status ${created.status} — ${created.data?.message || "no message"}`);
    process.exit(1);
  }

  if (adminToken) {
    await request("POST", `${API}/admin/donations/${donationId}/verify`, null, adminToken);
  }

  const dashboard = await request("GET", `${API}/ngo/dashboard`, null, ngoToken);
  if (dashboard.status === 200 && dashboard.data?.data?.summary) {
    pass("GET /ngo/dashboard returns NGO summary");
  } else {
    fail("GET /ngo/dashboard", `status ${dashboard.status}`);
  }

  const available = await request("GET", `${API}/ngo/donations/available`, null, ngoToken);
  if (available.status === 200 && Array.isArray(available.data?.data?.donations)) {
    pass("GET /ngo/donations/available lists verified donations");
  } else {
    fail("GET /ngo/donations/available", `status ${available.status}`);
  }

  const incoming = await request("GET", `${API}/ngo/donations/incoming`, null, ngoToken);
  if (incoming.status === 200 && Array.isArray(incoming.data?.data?.donations)) {
    pass("GET /ngo/donations/incoming returns queue");
  } else {
    fail("GET /ngo/donations/incoming", `status ${incoming.status}`);
  }

  const accept = await request("POST", `${API}/ngo/donations/${donationId}/accept`, null, ngoToken);
  if (accept.status === 200 && accept.data?.data?.donation?.status === "ngo_accepted") {
    pass("POST /ngo/donations/:id/accept accepts donation");
  } else {
    fail("POST /ngo/donations/:id/accept", `status ${accept.status}`);
  }

  const accepted = await request("GET", `${API}/ngo/donations/accepted`, null, ngoToken);
  if (accepted.status === 200 && accepted.data?.data?.donations?.length >= 1) {
    pass("GET /ngo/donations/accepted lists accepted donations");
  } else {
    fail("GET /ngo/donations/accepted", `status ${accepted.status}`);
  }

  const beneficiary = await request(
    "POST",
    `${API}/ngo/beneficiaries`,
    {
      name: "Hope Shelter",
      category: "shelter",
      contactPhone: "9999888877",
      address: { line1: "Shelter Road", city: "Hyderabad" },
      householdSize: 25,
    },
    ngoToken,
  );

  if (beneficiary.status === 201 && beneficiary.data?.data?.beneficiary?.name) {
    pass("POST /ngo/beneficiaries creates beneficiary");
  } else {
    fail("POST /ngo/beneficiaries", `status ${beneficiary.status}`);
  }

  const beneficiaries = await request("GET", `${API}/ngo/beneficiaries`, null, ngoToken);
  if (beneficiaries.status === 200 && beneficiaries.data?.data?.beneficiaries?.length >= 1) {
    pass("GET /ngo/beneficiaries lists beneficiaries");
  } else {
    fail("GET /ngo/beneficiaries", `status ${beneficiaries.status}`);
  }

  const inventory = await request("GET", `${API}/ngo/inventory`, null, ngoToken);
  if (inventory.status === 200 && Array.isArray(inventory.data?.data?.items)) {
    pass("GET /ngo/inventory returns inventory list");
  } else {
    fail("GET /ngo/inventory", `status ${inventory.status}`);
  }

  const donorBlocked = await request("GET", `${API}/ngo/dashboard`, null, donorToken);
  if (donorBlocked.status === 403) {
    pass("Non-NGO role blocked from NGO routes");
  } else {
    fail("NGO authorization", `expected 403, got ${donorBlocked.status}`);
  }

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
