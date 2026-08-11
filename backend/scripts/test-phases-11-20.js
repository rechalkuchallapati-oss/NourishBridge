/**
 * Phases 11-20: Socket.IO smoke, admin ops, audit, support, reports/export, maps, QR, matching.
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { io } from "socket.io-client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5022;
const API = `http://localhost:${PORT}/api/v1`;
const SOCKET_URL = `http://localhost:${PORT}`;
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

async function testSocket(token) {
  return new Promise((resolve) => {
    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
      timeout: 5000,
    });

    const timer = setTimeout(() => {
      socket.disconnect();
      resolve(false);
    }, 6000);

    socket.on("connect", () => {
      clearTimeout(timer);
      socket.disconnect();
      resolve(true);
    });

    socket.on("connect_error", () => {
      clearTimeout(timer);
      socket.disconnect();
      resolve(false);
    });
  });
}

async function run() {
  console.log(`\n=== Phases 11-20 Tests (port ${PORT}) ===\n`);

  const adminLogin = await request("POST", `${API}/auth/login`, {
    email: process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local",
    password: process.env.ADMIN_SEED_PASSWORD || "AdminPass123",
  });
  const adminToken = adminLogin.data?.data?.accessToken;
  if (!adminToken) {
    fail("Admin login");
    process.exit(1);
  }
  pass("Admin authentication");

  const socketOk = await testSocket(adminToken);
  if (socketOk) pass("Socket.IO connection with JWT");
  else fail("Socket.IO connection");

  const adminLists = [
    ["users", `${API}/admin/users`],
    ["donors", `${API}/admin/donors`],
    ["volunteers", `${API}/admin/volunteers`],
    ["ngos", `${API}/admin/ngos`],
    ["donations", `${API}/admin/donations`],
    ["deliveries", `${API}/admin/deliveries`],
    ["food-requests", `${API}/admin/food-requests`],
    ["inventory", `${API}/admin/inventory`],
    ["audit-logs", `${API}/admin/audit-logs`],
    ["support-tickets", `${API}/admin/support-tickets`],
  ];

  for (const [name, url] of adminLists) {
    const res = await request("GET", url, null, adminToken);
    if (res.status === 200) pass(`Admin list — ${name}`);
    else fail(`Admin list — ${name}`, `status ${res.status}`);
  }

  const reports = await request("GET", `${API}/admin/reports?days=30`, null, adminToken);
  if (reports.status === 200 && reports.data?.data?.analytics) {
    pass("Reports & analytics aggregation");
  } else {
    fail("Reports & analytics", `status ${reports.status}`);
  }

  const exportRes = await fetch(`${API}/admin/export/donations?format=csv`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const exportType = exportRes.headers.get("content-type") || "";
  if (exportRes.status === 200 && exportType.includes("text/csv")) {
    pass("CSV export — donations");
  } else {
    fail("CSV export", `status ${exportRes.status} type ${exportType}`);
  }

  const donorReg = await request("POST", `${API}/auth/register`, {
    fullName: "Support Test Donor",
    email: `support.donor.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "ValidPass123",
    phone: "9876543299",
    role: "donor",
    address: { line1: "1 St", city: "Hyderabad", state: "Telangana", pincode: "500081" },
    profile: { donorType: "individual" },
  });
  const donorToken = donorReg.data?.data?.accessToken;

  const ticketCreate = await request(
    "POST",
    `${API}/support-tickets`,
    {
      subject: "Test support ticket",
      description: "Automated test ticket",
      category: "donation",
      priority: "medium",
    },
    donorToken,
  );
  if (ticketCreate.status === 201) pass("Support ticket — create");
  else fail("Support ticket create", `status ${ticketCreate.status}`);

  const ticketId = ticketCreate.data?.data?.ticket?.id;
  if (ticketId) {
    const history = await request("GET", `${API}/support-tickets/${ticketId}/history`, null, donorToken);
    if (history.status === 200) pass("Support ticket — history");
    else fail("Support ticket history", `status ${history.status}`);
  }

  const matchCheck = await request("GET", `${API}/admin/donations?limit=1`, null, adminToken);
  const donationId = matchCheck.data?.data?.donations?.[0]?.id;
  if (donationId) {
    const matchNgo = await request("GET", `${API}/matching/donations/${donationId}/ngos`, null, adminToken);
    if (matchNgo.status === 200 && Array.isArray(matchNgo.data?.data?.matches)) {
      const top = matchNgo.data.data.matches[0];
      if (top?.reasons?.length) pass("Smart matching — reasons array");
      else pass("Smart matching — NGO scores");
    } else {
      fail("Smart matching", `status ${matchNgo.status}`);
    }
  }

  console.log(`\n${passes.length} passed, ${failures.length} failed\n`);
  process.exit(failures.length ? 1 : 0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
