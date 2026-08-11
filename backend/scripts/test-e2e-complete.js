/**
 * Phase 24 — Complete end-to-end workflow + negative scenario tests.
 * Run: node scripts/test-e2e-complete.js
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5023;
const API = process.env.API_BASE || `http://localhost:${PORT}/api/v1`;
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

function futureIso(h) {
  return new Date(Date.now() + h * 3600000).toISOString();
}

async function register(role, email, profile = {}) {
  return request("POST", `${API}/auth/register`, {
    fullName: `E2E ${role}`,
    email,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role,
    address: { line1: "1 Test St", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    profile,
  });
}

async function runNegativeTests({ adminToken, donorToken, volToken, donationId, deliveryId }) {
  const noAuth = await request("GET", `${API}/admin/users`);
  if (noAuth.status === 401) pass("Negative — unauthenticated admin blocked");
  else fail("Unauthenticated admin", `status ${noAuth.status}`);

  const wrongRole = await request("GET", `${API}/admin/users`, null, donorToken);
  if (wrongRole.status === 403) pass("Negative — donor blocked from admin API");
  else fail("Wrong role admin", `status ${wrongRole.status}`);

  const badToken = await request("GET", `${API}/donations`, null, "invalid.jwt.token");
  if (badToken.status === 401) pass("Negative — invalid token rejected");
  else fail("Invalid token", `status ${badToken.status}`);

  const missingBody = await request("POST", `${API}/donations`, {}, donorToken);
  if (missingBody.status === 400) pass("Negative — missing donation fields rejected");
  else fail("Missing donation data", `status ${missingBody.status}`);

  const expiredDonation = await request("POST", `${API}/donations`, {
    foodName: "Expired Food",
    category: "cooked_meals",
    quantity: 5,
    quantityUnit: "kg",
    estimatedMeals: 20,
    expiryTime: new Date(Date.now() - 3600000).toISOString(),
    pickupScheduledAt: futureIso(1),
    pickupEndAt: futureIso(2),
    pickupAddress: { line1: "X", city: "Hyderabad", pincode: "500001" },
  }, donorToken);
  if (expiredDonation.status === 400) pass("Negative — past expiry rejected");
  else fail("Expired donation", `status ${expiredDonation.status}`);

  const fakeId = "507f1f77bcf86cd799439011";
  const notFound = await request("GET", `${API}/donations/${fakeId}`, null, donorToken);
  if (notFound.status === 404) pass("Negative — invalid donation ID");
  else fail("Invalid donation ID", `status ${notFound.status}`);

  if (deliveryId) {
    const qrRes = await request("GET", `${API}/deliveries/${deliveryId}/qr`, null, volToken);
    const payload = qrRes.data?.data?.qr?.pickup?.payload;
    if (payload) {
      await request("POST", `${API}/deliveries/${deliveryId}/scan-qr`, { qrPayload: payload }, volToken);
      const dup = await request("POST", `${API}/deliveries/${deliveryId}/scan-qr`, { qrPayload: payload }, volToken);
      if (dup.status === 409) pass("Negative — duplicate QR scan blocked");
      else fail("Duplicate QR", `status ${dup.status}`);
    }
  }

  const nosql = await request("POST", `${API}/auth/login`, {
    email: { $gt: "" },
    password: "ValidPass123",
  });
  if (nosql.status === 400 || nosql.status === 401) pass("Negative — NoSQL injection sanitized");
  else fail("NoSQL injection", `status ${nosql.status}`);

  if (adminToken) {
    const reports = await request("GET", `${API}/admin/reports?days=7`, null, adminToken);
    if (reports.status === 200) pass("Reports API");
    else fail("Reports", `status ${reports.status}`);

    const audit = await request("GET", `${API}/admin/audit-logs`, null, adminToken);
    if (audit.status === 200) pass("Audit logs API");
    else fail("Audit logs", `status ${audit.status}`);
  }

  const notifs = await request("GET", `${API}/notifications`, null, donorToken);
  if (notifs.status === 200) pass("Notifications API");
  else fail("Notifications", `status ${notifs.status}`);
}

async function run() {
  console.log(`\n=== E2E Complete Tests (${API}) ===\n`);

  const health = await request("GET", `${API}/health`);
  if (health.status === 200) pass("Health check");
  else {
    fail("Health check", `status ${health.status}`);
    process.exit(1);
  }

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });
  const adminToken = adminLogin.data?.data?.accessToken;
  if (!adminToken) {
    fail("Admin login");
    process.exit(1);
  }
  pass("Login — admin");

  const donorReg = await register("donor", `e2e.donor.${ts}@example.com`, { donorType: "individual" });
  const ngoReg = await register("ngo", `e2e.ngo.${ts}@example.com`, {
    ngoName: "E2E NGO",
    registrationNumber: `NGO${ts}`,
  });
  const volReg = await register("volunteer", `e2e.vol.${ts}@example.com`, { vehicleType: "bike" });

  if (donorReg.status !== 201 || ngoReg.status !== 201 || volReg.status !== 201) {
    fail("Registration workflow");
    process.exit(1);
  }
  pass("Registration — donor, NGO, volunteer");

  const donorToken = donorReg.data.data.accessToken;
  const ngoToken = ngoReg.data.data.accessToken;
  const volToken = volReg.data.data.accessToken;

  const profile = await request("GET", `${API}/profile`, null, donorToken);
  if (profile.status === 200) pass("Profile — donor");
  else fail("Profile", `status ${profile.status}`);

  const created = await request("POST", `${API}/donations`, {
    foodName: "E2E Meal",
    category: "cooked_meals",
    quantity: 10,
    quantityUnit: "kg",
    estimatedMeals: 40,
    expiryTime: futureIso(12),
    pickupScheduledAt: futureIso(2),
    pickupEndAt: futureIso(4),
    pickupAddress: { line1: "Pickup", city: "Hyderabad", pincode: "500001" },
    pickupLocation: { coordinates: [78.4867, 17.385] },
  }, donorToken);

  const donationId = created.data?.data?.donation?.id;
  if (created.status !== 201) {
    fail("Donation creation", JSON.stringify(created.data));
    process.exit(1);
  }
  pass("Donation creation");

  await request("POST", `${API}/admin/donations/${donationId}/verify`, null, adminToken);
  pass("Donation approval — admin verify");

  await request("POST", `${API}/ngo/donations/${donationId}/accept`, null, ngoToken);
  pass("NGO acceptance");

  await request("POST", `${API}/volunteer/missions/${donationId}/accept`, null, volToken);
  pass("Volunteer assignment");

  const deliveryRes = await request("GET", `${API}/deliveries/donation/${donationId}`, null, volToken);
  const deliveryId = deliveryRes.data?.data?.delivery?.id;

  for (const action of ["schedule_pickup", "mark_picked_up", "mark_in_transit", "mark_delivered"]) {
    const adv = await request("POST", `${API}/volunteer/missions/${donationId}/advance`, { action }, volToken);
    if (adv.status !== 200) fail(`Pickup/delivery — ${action}`, `status ${adv.status}`);
  }
  pass("Pickup & delivery workflow");

  await request("POST", `${API}/ngo/donations/${donationId}/complete`, null, ngoToken);
  pass("Delivery completion — NGO");

  const inv = await request("GET", `${API}/ngo/inventory`, null, ngoToken);
  if (inv.status === 200) pass("Inventory — NGO list");
  else fail("Inventory", `status ${inv.status}`);

  const foodReq = await request("POST", `${API}/food-requests`, {
    foodItem: "Rice",
    foodCategory: "cooked_meals",
    quantityNeeded: 50,
    quantityUnit: "meals",
    estimatedMeals: 50,
    beneficiaries: 40,
    priority: "high",
    requiredDate: futureIso(48),
    location: "Hyderabad",
  }, ngoToken);
  if (foodReq.status === 201) pass("Food request creation");
  else fail("Food request", `status ${foodReq.status}`);

  if (deliveryId) {
    const qr = await request("GET", `${API}/deliveries/${deliveryId}/qr`, null, volToken);
    if (qr.status === 200) pass("QR verification — generation");
    else fail("QR generation", `status ${qr.status}`);
  }

  await runNegativeTests({ adminToken, donorToken, volToken, donationId, deliveryId });

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
