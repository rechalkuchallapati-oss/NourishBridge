/**
 * Phase 7-8 delivery & inventory tests.
 * Run: node scripts/test-delivery.js
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
    address: { line1: "123 St", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    profile,
  });
}

async function runFullDeliveryFlow(adminToken, donorToken, ngoToken, volToken) {
  const createPayload = {
    foodName: "Delivery Flow Meal",
    category: "cooked_meals",
    quantity: 15,
    quantityUnit: "kg",
    estimatedMeals: 60,
    expiryTime: futureIso(12),
    pickupScheduledAt: futureIso(2),
    pickupEndAt: futureIso(4),
    pickupAddress: { line1: "Pickup St", city: "Hyderabad", pincode: "500001" },
  };

  const created = await request("POST", `${API}/donations`, createPayload, donorToken);
  const donationId = created.data?.data?.donation?.id;
  if (created.status !== 201) {
    fail("Create donation for delivery flow");
    return null;
  }
  pass("Created donation for delivery test");

  await request("POST", `${API}/admin/donations/${donationId}/verify`, null, adminToken);
  await request("POST", `${API}/ngo/donations/${donationId}/accept`, null, ngoToken);
  await request("POST", `${API}/volunteer/missions/${donationId}/accept`, null, volToken);

  const deliveryRes = await request("GET", `${API}/deliveries/donation/${donationId}`, null, volToken);
  const deliveryId = deliveryRes.data?.data?.delivery?.id;

  if (!deliveryId) {
    fail("Get delivery by donation", JSON.stringify(deliveryRes.data));
    return null;
  }
  pass("Delivery record created and fetched");

  const steps = [
    "schedule_pickup",
    "arrive_at_pickup",
    "verify_pickup",
    "collect_food",
    "start_delivery",
    "arrive_at_ngo",
    "verify_delivery",
  ];

  for (const action of steps) {
    const adv = await request(
      "POST",
      `${API}/deliveries/${deliveryId}/advance`,
      { action, quantity: 15, notes: `Step ${action}` },
      volToken,
    );
    if (adv.status !== 200) {
      fail(`Delivery advance ${action}`, `status ${adv.status} ${JSON.stringify(adv.data)}`);
      return donationId;
    }
  }
  pass("Full delivery logistics workflow completed");

  const complete = await request("POST", `${API}/ngo/donations/${donationId}/complete`, null, ngoToken);
  if (complete.status === 200 && complete.data?.data?.donation?.status === "completed") {
    pass("NGO completed donation → inventory created");
  } else {
    fail("NGO complete donation", `status ${complete.status}`);
  }

  const inventory = await request("GET", `${API}/ngo/inventory`, null, ngoToken);
  const batches = inventory.data?.data?.items || [];
  if (inventory.status === 200 && batches.length > 0) {
    pass("NGO inventory auto-updated from delivery");
  } else {
    fail("Inventory after delivery", `batches ${batches.length}`);
  }

  const alerts = await request("GET", `${API}/ngo/inventory/alerts`, null, ngoToken);
  if (alerts.status === 200 && alerts.data?.data?.alerts) {
    pass("Inventory expiry alerts endpoint");
  } else {
    fail("Inventory alerts", `status ${alerts.status}`);
  }

  return donationId;
}

async function run() {
  console.log(`\n=== Delivery & Inventory Tests (port ${PORT}) ===\n`);

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });

  const adminToken = adminLogin.data?.data?.accessToken;
  if (!adminToken) {
    fail("Admin login required");
    process.exit(1);
  }
  pass("Admin login");

  const donorReg = await register("donor", `del.donor.${ts}@example.com`, { donorType: "individual" });
  const ngoReg = await register("ngo", `del.ngo.${ts}@example.com`, {
    ngoName: "Delivery NGO",
    registrationNumber: `NGO${ts}`,
  });
  const volReg = await register("volunteer", `del.vol.${ts}@example.com`, { vehicleType: "bike" });

  const donorToken = donorReg.data.data.accessToken;
  const ngoToken = ngoReg.data.data.accessToken;
  const volToken = volReg.data.data.accessToken;

  await runFullDeliveryFlow(adminToken, donorToken, ngoToken, volToken);

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
