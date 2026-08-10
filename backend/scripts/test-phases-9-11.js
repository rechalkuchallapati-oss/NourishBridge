/**
 * Phases 9-11: notifications, admin ops, analytics tests.
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

async function run() {
  console.log(`\n=== Phases 9-11 Tests (port ${PORT}) ===\n`);

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });
  const adminToken = adminLogin.data?.data?.accessToken;
  if (!adminToken) {
    fail("Admin login");
    process.exit(1);
  }
  pass("Admin login");

  const dash = await request("GET", `${API}/admin/dashboard`, null, adminToken);
  if (dash.status === 200 && dash.data?.data?.analytics) {
    pass("Admin dashboard with real analytics");
  } else {
    fail("Admin dashboard", `status ${dash.status}`);
  }

  const analytics = await request("GET", `${API}/admin/analytics`, null, adminToken);
  const m = analytics.data?.data?.analytics;
  if (analytics.status === 200 && m && typeof m.totalDonations === "number") {
    pass(`Platform analytics (donations: ${m.totalDonations}, meals: ${m.mealsGenerated})`);
  } else {
    fail("Platform analytics", JSON.stringify(analytics.data));
  }

  const reports = await request("GET", `${API}/admin/reports`, null, adminToken);
  if (reports.status === 200 && reports.data?.data?.trend) {
    pass("Admin reports endpoint");
  } else {
    fail("Admin reports", `status ${reports.status}`);
  }

  for (const ep of ["users", "donors", "volunteers", "ngos", "donations", "deliveries", "food-requests", "inventory", "audit-logs", "notifications", "support-tickets"]) {
    const res = await request("GET", `${API}/admin/${ep}`, null, adminToken);
    if (res.status === 200) {
      pass(`Admin list /${ep}`);
    } else {
      fail(`Admin list /${ep}`, `status ${res.status}`);
    }
  }

  const donorReg = await request("POST", `${API}/auth/register`, {
    fullName: "Notify Donor",
    email: `notify.donor.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543210",
    role: "donor",
    address: { line1: "123 St", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    profile: { donorType: "individual" },
  });
  const donorToken = donorReg.data?.data?.accessToken;

  if (donorToken) {
    const fut = new Date(Date.now() + 12 * 3600 * 1000).toISOString();
    await request("POST", `${API}/donations`, {
      foodName: "Notify Test Meal",
      category: "cooked_meals",
      quantity: 5,
      quantityUnit: "kg",
      estimatedMeals: 20,
      expiryTime: fut,
      pickupScheduledAt: new Date(Date.now() + 7200000).toISOString(),
      pickupEndAt: new Date(Date.now() + 14400000).toISOString(),
      pickupAddress: { line1: "P", city: "H", pincode: "500001" },
    }, donorToken);

    const adminNotifs = await request("GET", `${API}/admin/notifications`, null, adminToken);
    const adminCount = adminNotifs.data?.data?.notifications?.length || 0;
    if (adminNotifs.status === 200 && adminCount > 0) {
      pass("Donation created → admin notification");
    } else {
      fail("Donation notification", `admin notifications ${adminCount}`);
    }

    const myNotifs = await request("GET", `${API}/notifications`, null, adminToken);
    if (myNotifs.status === 200 && myNotifs.data?.data?.notifications) {
      pass("User notifications API");
    } else {
      fail("User notifications API", `status ${myNotifs.status}`);
    }
  } else {
    fail("Register donor for notification test");
  }

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
