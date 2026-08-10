/**
 * Phases 3-6 workflow integration tests.
 * Run: node scripts/test-workflow.js
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

async function register(role, email, profile = {}) {
  return request("POST", `${API}/auth/register`, {
    fullName: `Test ${role}`,
    email,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role,
    address: { line1: "123 Test St", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    profile,
  });
}

async function run() {
  console.log(`\n=== Workflow Tests (port ${PORT}) ===\n`);

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });

  let adminToken = adminLogin.data?.data?.accessToken;
  if (adminLogin.status !== 200) {
    fail("Admin login (seed admin required)", `status ${adminLogin.status}`);
  } else {
    pass("Admin login");
  }

  const donorReg = await register("donor", `wf.donor.${ts}@example.com`, { donorType: "individual" });
  const ngoReg = await register("ngo", `wf.ngo.${ts}@example.com`, {
    ngoName: "Workflow NGO",
    registrationNumber: `NGO${ts}`,
  });
  const volReg = await register("volunteer", `wf.vol.${ts}@example.com`, { vehicleType: "bike" });

  if (donorReg.status !== 201 || ngoReg.status !== 201 || volReg.status !== 201) {
    fail("Register workflow roles");
    process.exit(1);
  }

  const donorToken = donorReg.data.data.accessToken;
  const ngoToken = ngoReg.data.data.accessToken;
  const volToken = volReg.data.data.accessToken;
  pass("Registered donor, NGO, volunteer");

  const createPayload = {
    foodName: "Workflow Test Meal",
    category: "cooked_meals",
    quantity: 10,
    quantityUnit: "kg",
    estimatedMeals: 50,
    expiryTime: futureIso(12),
    pickupScheduledAt: futureIso(2),
    pickupEndAt: futureIso(4),
    pickupAddress: { line1: "Pickup Lane", city: "Hyderabad", pincode: "500001" },
  };

  const created = await request("POST", `${API}/donations`, createPayload, donorToken);
  const donationId = created.data?.data?.donation?.id;

  if (created.status !== 201) {
    fail("Create donation", JSON.stringify(created.data));
    process.exit(1);
  }
  pass("Donor created donation (pending)");

  if (adminToken) {
    const verified = await request("POST", `${API}/admin/donations/${donationId}/verify`, null, adminToken);
    if (verified.status === 200 && verified.data?.data?.donation?.status === "verified") {
      pass("Admin verified donation");
    } else {
      fail("Admin verify", `status ${verified.status}`);
    }
  }

  const accept = await request("POST", `${API}/ngo/donations/${donationId}/accept`, null, ngoToken);
  if (accept.status === 200 && accept.data?.data?.donation?.status === "ngo_accepted") {
    pass("NGO accepted donation");
  } else {
    fail("NGO accept", `status ${accept.status} ${JSON.stringify(accept.data)}`);
  }

  const missionAccept = await request("POST", `${API}/volunteer/missions/${donationId}/accept`, null, volToken);
  if (missionAccept.status === 200 && missionAccept.data?.data?.mission?.status === "volunteer_assigned") {
    pass("Volunteer accepted mission");
  } else {
    fail("Volunteer accept", `status ${missionAccept.status}`);
  }

  for (const action of ["schedule_pickup", "mark_picked_up", "mark_in_transit", "mark_delivered"]) {
    const adv = await request(
      "POST",
      `${API}/volunteer/missions/${donationId}/advance`,
      { action },
      volToken,
    );
    if (adv.status !== 200) {
      fail(`Volunteer advance ${action}`, `status ${adv.status}`);
    }
  }
  pass("Volunteer advanced mission through delivery");

  const complete = await request("POST", `${API}/ngo/donations/${donationId}/complete`, null, ngoToken);
  if (complete.status === 200 && complete.data?.data?.donation?.status === "completed") {
    pass("NGO completed donation");
  } else {
    fail("NGO complete", `status ${complete.status}`);
  }

  const history = await request("GET", `${API}/donations/${donationId}/history`, null, donorToken);
  if (history.status === 200 && history.data?.data?.history?.length >= 5) {
    pass("Donation status history recorded");
  } else {
    fail("Donation history", `status ${history.status}, entries ${history.data?.data?.history?.length}`);
  }

  const rejectCreated = await request("POST", `${API}/donations`, createPayload, donorToken);
  const rejectDonationId = rejectCreated.data?.data?.donation?.id;

  if (rejectCreated.status === 201 && adminToken) {
    await request("POST", `${API}/admin/donations/${rejectDonationId}/verify`, null, adminToken);
    const rejected = await request(
      "POST",
      `${API}/ngo/donations/${rejectDonationId}/reject`,
      { reason: "Capacity full" },
      ngoToken,
    );
    if (rejected.status === 200 && rejected.data?.data?.donation?.status === "rejected") {
      pass("NGO rejected donation (terminal state)");
    } else {
      fail("NGO reject", `status ${rejected.status}`);
    }
  } else {
    fail("Create donation for reject test", `status ${rejectCreated.status}`);
  }

  const invalidAdvance = await request(
    "POST",
    `${API}/volunteer/missions/${donationId}/advance`,
    { action: "mark_picked_up" },
    volToken,
  );
  if (invalidAdvance.status === 400) {
    pass("Invalid transition blocked on completed donation");
  } else {
    fail("Invalid transition guard", `expected 400, got ${invalidAdvance.status}`);
  }

  const foodReq = await request(
    "POST",
    `${API}/food-requests`,
    {
      foodItem: "Rice & Dal",
      foodCategory: "cooked_meals",
      quantityNeeded: 100,
      quantityUnit: "meals",
      estimatedMeals: 100,
      beneficiaries: 80,
      priority: "high",
      requiredDate: futureIso(48),
      location: "Hyderabad",
    },
    ngoToken,
  );

  if (foodReq.status === 201 && foodReq.data?.data?.request?.status === "requested") {
    pass("NGO created food request");
  } else {
    fail("Food request create", `status ${foodReq.status}`);
  }

  const perf = await request("GET", `${API}/volunteer/missions/performance`, null, volToken);
  if (perf.status === 200 && perf.data?.data?.performance) {
    pass("Volunteer performance metrics");
  } else {
    fail("Volunteer performance", `status ${perf.status}`);
  }

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
