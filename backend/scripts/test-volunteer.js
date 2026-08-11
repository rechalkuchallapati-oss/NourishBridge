/**
 * Phase 6 volunteer module API tests.
 * Run: node scripts/test-volunteer.js
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

async function register(role, email, profile) {
  return request("POST", `${API}/auth/register`, {
    fullName: `Vol Test ${role}`,
    email,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role,
    address: { line1: "123 St", city: "Hyderabad", pincode: "500081" },
    profile,
  });
}

async function run() {
  console.log(`\n=== Volunteer Module Tests (port ${PORT}) ===\n`);

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });
  const adminToken = adminLogin.data?.data?.accessToken;

  const donorReg = await register("donor", `vol.donor.${ts}@example.com`, { donorType: "individual" });
  const ngoReg = await register("ngo", `vol.ngo.${ts}@example.com`, {
    ngoName: "Vol Test NGO",
    registrationNumber: `VNGO${ts}`,
  });
  const volReg = await register("volunteer", `vol.vol.${ts}@example.com`, { vehicleType: "bike" });
  const vol2Reg = await register("volunteer", `vol.vol2.${ts}@example.com`, { vehicleType: "car" });

  if (donorReg.status !== 201 || ngoReg.status !== 201 || volReg.status !== 201) {
    fail("Register donor, NGO, volunteer");
    process.exit(1);
  }

  const donorToken = donorReg.data.data.accessToken;
  const ngoToken = ngoReg.data.data.accessToken;
  const volToken = volReg.data.data.accessToken;
  const vol2Token = vol2Reg.data.data.accessToken;
  pass("Registered donor, NGO, and volunteers");

  const createPayload = {
    foodName: "Volunteer Test Meal",
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
    fail("Create donation for volunteer tests");
    process.exit(1);
  }

  if (adminToken) {
    await request("POST", `${API}/admin/donations/${donationId}/verify`, null, adminToken);
  }

  await request("POST", `${API}/ngo/donations/${donationId}/accept`, null, ngoToken);

  const dashboard = await request("GET", `${API}/volunteer/dashboard`, null, volToken);
  if (dashboard.status === 200) {
    pass("GET /volunteer/dashboard");
  } else {
    fail("GET /volunteer/dashboard", `status ${dashboard.status}`);
  }

  const available = await request("GET", `${API}/volunteer/missions/available`, null, volToken);
  if (available.status === 200 && available.data?.data?.missions?.length >= 1) {
    pass("GET /volunteer/missions/available lists missions");
  } else {
    fail("GET /volunteer/missions/available", `status ${available.status}`);
  }

  const accept = await request("POST", `${API}/volunteer/missions/${donationId}/accept`, null, volToken);
  if (accept.status === 200 && accept.data?.data?.mission?.status === "volunteer_assigned") {
    pass("POST /volunteer/missions/:id/accept assigns mission");
  } else {
    fail("Volunteer accept", `status ${accept.status}`);
  }

  const assigned = await request("GET", `${API}/volunteer/missions/assigned`, null, volToken);
  if (assigned.status === 200 && assigned.data?.data?.missions?.length >= 1) {
    pass("GET /volunteer/missions/assigned returns own mission");
  } else {
    fail("GET /volunteer/missions/assigned", `status ${assigned.status}`);
  }

  const otherVolunteerBlocked = await request(
    "GET",
    `${API}/volunteer/missions/${donationId}`,
    null,
    vol2Token,
  );
  if (otherVolunteerBlocked.status === 403 || otherVolunteerBlocked.status === 404) {
    pass("Volunteer cannot access another volunteer's assigned mission");
  } else {
    fail("Volunteer mission isolation", `expected 403/404, got ${otherVolunteerBlocked.status}`);
  }

  const performance = await request("GET", `${API}/volunteer/missions/performance`, null, volToken);
  if (performance.status === 200 && performance.data?.data?.performance) {
    pass("GET /volunteer/missions/performance");
  } else {
    fail("GET /volunteer/missions/performance", `status ${performance.status}`);
  }

  const rejectCreated = await request("POST", `${API}/donations`, createPayload, donorToken);
  const rejectDonationId = rejectCreated.data?.data?.donation?.id;
  if (rejectCreated.status === 201 && adminToken) {
    await request("POST", `${API}/admin/donations/${rejectDonationId}/verify`, null, adminToken);
    await request("POST", `${API}/ngo/donations/${rejectDonationId}/accept`, null, ngoToken);

    const rejected = await request(
      "POST",
      `${API}/volunteer/missions/${rejectDonationId}/reject`,
      { reason: "Too far" },
      volToken,
    );
    if (rejected.status === 200) {
      pass("POST /volunteer/missions/:id/reject declines mission");
    } else {
      fail("Volunteer reject", `status ${rejected.status} ${JSON.stringify(rejected.data?.message || rejected.data)}`);
    }
  }

  const history = await request("GET", `${API}/volunteer/missions/history`, null, volToken);
  if (history.status === 200 && Array.isArray(history.data?.data?.missions)) {
    pass("GET /volunteer/missions/history");
  } else {
    fail("GET /volunteer/missions/history", `status ${history.status}`);
  }

  const donorBlocked = await request("GET", `${API}/volunteer/missions/available`, null, donorToken);
  if (donorBlocked.status === 403) {
    pass("Non-volunteer blocked from volunteer routes");
  } else {
    fail("Volunteer authorization", `expected 403, got ${donorBlocked.status}`);
  }

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
