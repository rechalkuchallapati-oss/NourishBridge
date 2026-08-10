/**
 * Phases 12-16: maps, QR, matching, security, deployment smoke tests.
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
  return { status: res.status, data, headers: res.headers };
}

function futureIso(h) {
  return new Date(Date.now() + h * 3600000).toISOString();
}

async function run() {
  console.log(`\n=== Phases 12-16 Tests (port ${PORT}) ===\n`);

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });
  const adminToken = adminLogin.data?.data?.accessToken;
  if (!adminToken) {
    fail("Admin login");
    process.exit(1);
  }
  pass("Authentication");

  const rbac = await request("GET", `${API}/admin/users`, null, "invalid-token");
  if (rbac.status === 401) pass("Authorization rejects invalid token");
  else fail("Authorization", `status ${rbac.status}`);

  const reg = await request("POST", `${API}/auth/register`, {
    fullName: "Map Test Donor",
    email: `map.donor.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role: "donor",
    address: { line1: "1 St", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    profile: { donorType: "individual" },
  });
  const ngoReg = await request("POST", `${API}/auth/register`, {
    fullName: "Map Test NGO",
    email: `map.ngo.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543211",
    role: "ngo",
    address: { line1: "2 St", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    profile: { ngoName: "Map NGO", registrationNumber: `NGO${ts}` },
  });
  const volReg = await request("POST", `${API}/auth/register`, {
    fullName: "Map Test Vol",
    email: `map.vol.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543212",
    role: "volunteer",
    address: { line1: "3 St", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    profile: { vehicleType: "bike" },
  });

  const donorToken = reg.data?.data?.accessToken;
  const ngoToken = ngoReg.data?.data?.accessToken;
  const volToken = volReg.data?.data?.accessToken;

  const created = await request(
    "POST",
    `${API}/donations`,
    {
      foodName: "Map Test Food",
      category: "cooked_meals",
      quantity: 10,
      quantityUnit: "kg",
      estimatedMeals: 40,
      expiryTime: futureIso(12),
      pickupScheduledAt: futureIso(2),
      pickupEndAt: futureIso(4),
      pickupAddress: { line1: "Pickup", city: "Hyderabad", pincode: "500001" },
      pickupLocation: { coordinates: [78.4867, 17.385] },
    },
    donorToken,
  );
  const donationId = created.data?.data?.donation?.id;

  if (created.status !== 201) {
    fail("Create donation with geo");
    process.exit(1);
  }
  pass("Donation workflow with location");

  await request("POST", `${API}/admin/donations/${donationId}/verify`, null, adminToken);
  await request("POST", `${API}/ngo/donations/${donationId}/accept`, null, ngoToken);
  await request("POST", `${API}/volunteer/missions/${donationId}/accept`, null, volToken);

  const mapRes = await request("GET", `${API}/maps/donation/${donationId}`, null, volToken);
  if (mapRes.status === 200 && mapRes.data?.data?.map?.routes) {
    pass("Maps API — donation locations & routes");
  } else {
    fail("Maps API", `status ${mapRes.status}`);
  }

  const deliveryRes = await request("GET", `${API}/deliveries/donation/${donationId}`, null, volToken);
  const deliveryId = deliveryRes.data?.data?.delivery?.id;

  const locUpdate = await request(
    "PATCH",
    `${API}/maps/volunteer/location`,
    { coordinates: [78.49, 17.39] },
    volToken,
  );
  if (locUpdate.status === 200) pass("Volunteer location update");
  else fail("Volunteer location", `status ${locUpdate.status}`);

  if (deliveryId) {
    const routeRes = await request("GET", `${API}/maps/delivery/${deliveryId}`, null, volToken);
    if (routeRes.status === 200 && routeRes.data?.data?.route?.routes?.etaMinutes != null) {
      pass("Delivery route with distance/ETA");
    } else {
      fail("Delivery route", JSON.stringify(routeRes.data?.data));
    }

    const qrRes = await request("GET", `${API}/deliveries/${deliveryId}/qr`, null, volToken);
    const pickupPayload = qrRes.data?.data?.qr?.pickup?.payload;
    if (qrRes.status === 200 && pickupPayload) {
      pass("QR code generation");
    } else {
      fail("QR generation", `status ${qrRes.status}`);
    }

    const scan1 = await request(
      "POST",
      `${API}/deliveries/${deliveryId}/scan-qr`,
      { qrPayload: pickupPayload },
      volToken,
    );
    if (scan1.status === 200) pass("QR pickup verification");
    else fail("QR pickup scan", `status ${scan1.status} ${JSON.stringify(scan1.data)}`);

    const scanDup = await request(
      "POST",
      `${API}/deliveries/${deliveryId}/scan-qr`,
      { qrPayload: pickupPayload },
      volToken,
    );
    if (scanDup.status === 409) pass("Duplicate QR verification blocked");
    else fail("Duplicate QR block", `expected 409 got ${scanDup.status}`);
  }

  const matchNgo = await request("GET", `${API}/matching/donations/${donationId}/ngos`, null, adminToken);
  if (matchNgo.status === 200 && matchNgo.data?.data?.matches) {
    pass(`Smart matching — NGO scores (${matchNgo.data.data.matches.length} matches)`);
  } else {
    fail("NGO matching", `status ${matchNgo.status}`);
  }

  const matchVol = await request(
    "GET",
    `${API}/matching/donations/${donationId}/volunteers`,
    null,
    adminToken,
  );
  if (matchVol.status === 200) pass("Smart matching — volunteer scores");

  const notifs = await request("GET", `${API}/notifications`, null, adminToken);
  if (notifs.status === 200) pass("Notifications API");

  const audit = await request("GET", `${API}/admin/audit-logs`, null, adminToken);
  if (audit.status === 200) pass("Audit logs API");

  const health = await request("GET", `${API}/health`);
  if (health.status === 200) pass("Health check");

  if (health.headers.get("x-ratelimit-limit") || process.env.RATE_LIMIT_SKIP_IN_DEV !== "false") {
    pass("Rate limit headers / dev skip");
  }

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
