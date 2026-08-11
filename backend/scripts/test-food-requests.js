/**
 * Phase 5 food request API tests.
 * Run: node scripts/test-food-requests.js
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

function futureIso(hours = 48) {
  return new Date(Date.now() + hours * 3600 * 1000).toISOString();
}

async function run() {
  console.log(`\n=== Food Request Tests (port ${PORT}) ===\n`);

  const ngoReg = await request("POST", `${API}/auth/register`, {
    fullName: "Food Request NGO",
    email: `fr.ngo.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role: "ngo",
    address: { line1: "123 St", city: "Hyderabad", pincode: "500081" },
    profile: { ngoName: "FR Test NGO", registrationNumber: `FRNGO${ts}` },
  });

  if (ngoReg.status !== 201) {
    fail("Register NGO", JSON.stringify(ngoReg.data));
    process.exit(1);
  }

  const ngoToken = ngoReg.data.data.accessToken;
  pass("Registered NGO");

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });
  const adminToken = adminLogin.data?.data?.accessToken;

  const create = await request(
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
      specialRequirements: "Vegetarian only",
    },
    ngoToken,
  );

  const requestId = create.data?.data?.request?.id;
  if (create.status === 201 && requestId) {
    pass("POST /food-requests creates request");
  } else {
    fail("POST /food-requests", `status ${create.status}`);
    process.exit(1);
  }

  const history = await request("GET", `${API}/food-requests/${requestId}/history`, null, ngoToken);
  if (history.status === 200 && history.data?.data?.history?.some((e) => e.toStatus === "requested")) {
    pass("GET /food-requests/:id/history records initial status");
  } else {
    fail("GET /food-requests/:id/history", `status ${history.status}`);
  }

  const list = await request("GET", `${API}/food-requests`, null, ngoToken);
  if (list.status === 200 && list.data?.data?.requests?.length >= 1) {
    pass("GET /food-requests lists NGO requests");
  } else {
    fail("GET /food-requests", `status ${list.status}`);
  }

  const patch = await request(
    "PATCH",
    `${API}/food-requests/${requestId}`,
    { quantityNeeded: 120 },
    ngoToken,
  );
  if (patch.status === 200 && patch.data?.data?.request?.quantityNeeded === 120) {
    pass("PATCH /food-requests/:id updates pending request");
  } else {
    fail("PATCH /food-requests/:id", `status ${patch.status}`);
  }

  if (adminToken) {
    const approve = await request("POST", `${API}/admin/food-requests/${requestId}/approve`, null, adminToken);
    if (approve.status === 200 && approve.data?.data?.request?.status === "approved") {
      pass("POST /admin/food-requests/:id/approve");
    } else {
      fail("Admin approve", `status ${approve.status}`);
    }
  } else {
    fail("Admin login for food request workflow");
  }

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
