/**
 * NourishBridge — controlled performance & load test harness.
 * Uses native fetch (no external load-test framework).
 *
 * Usage:
 *   node scripts/perf-load-test.js
 *   PERF_BASE_URL=http://127.0.0.1:5000/api/v1 node scripts/perf-load-test.js
 *
 * Requires backend running locally. Uses isolated test accounts and cleans up.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const BASE = process.env.PERF_BASE_URL || "http://127.0.0.1:5000/api/v1";
const RUN_ID = `perf_${Date.now()}`;
const PASSWORD = "ValidPass123";
const ADMIN_PASSWORD = process.env.ADMIN_SEED_PASSWORD || "AdminPass123";
const ADMIN_EMAIL = process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local";

const THRESHOLDS = {
  excellent: 300,
  acceptable: 500,
  investigate: 1000,
  critical: 2000,
};

function percentile(sorted, p) {
  if (!sorted.length) return 0;
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

function stats(latencies) {
  const sorted = [...latencies].sort((a, b) => a - b);
  const sum = sorted.reduce((a, b) => a + b, 0);
  return {
    count: sorted.length,
    min: sorted[0] ?? 0,
    max: sorted[sorted.length - 1] ?? 0,
    avg: sorted.length ? Math.round(sum / sorted.length) : 0,
    p50: Math.round(percentile(sorted, 50)),
    p90: Math.round(percentile(sorted, 90)),
    p95: Math.round(percentile(sorted, 95)),
    p99: Math.round(percentile(sorted, 99)),
  };
}

function classifyP95(ms, label) {
  if (label.includes("dashboard") || label.includes("reports") || label.includes("analytics")) {
    if (ms <= 1000) return "Acceptable (complex)";
    if (ms <= 2000) return "Needs investigation";
    return "Critical";
  }
  if (ms <= THRESHOLDS.excellent) return "Excellent";
  if (ms <= THRESHOLDS.acceptable) return "Acceptable";
  if (ms <= THRESHOLDS.investigate) return "Needs investigation";
  return "Critical";
}

async function request(method, urlPath, { token, body, label } = {}) {
  const start = performance.now();
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE}${urlPath}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    return { status: 0, ms: performance.now() - start, error: err.message, label };
  }

  const ms = performance.now() - start;
  return { status: res.status, ms, label, ok: res.ok };
}

async function runConcurrent(fn, concurrency, total) {
  const latencies = [];
  const statuses = {};
  let errors = 0;
  let completed = 0;

  const worker = async () => {
    while (completed < total) {
      const idx = completed++;
      if (idx >= total) break;
      const result = await fn(idx);
      latencies.push(result.ms);
      statuses[result.status] = (statuses[result.status] || 0) + 1;
      if (!result.ok && result.status !== 0) errors += 1;
      if (result.status === 0) errors += 1;
    }
  };

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return { ...stats(latencies), errors, statuses, total };
}

async function registerRole(role, suffix) {
  const email = `perf.${role}.${suffix}.${RUN_ID}@test.nourishbridge.local`;
  const payload = {
    fullName: `Perf ${role}`,
    email,
    password: PASSWORD,
    confirmPassword: PASSWORD,
    phone: "9876543210",
    role,
    address: { line1: "123 Perf St", city: "Hyderabad", state: "Telangana", pincode: "500081", country: "India" },
    profile:
      role === "donor"
        ? { donorType: "individual" }
        : role === "ngo"
          ? { ngoName: `Perf NGO ${suffix}`, registrationNumber: `PERF-NGO-${suffix}-${RUN_ID}` }
          : { vehicleType: "bike" },
  };

  const start = performance.now();
  const res = await fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const ms = performance.now() - start;
  if (res.status !== 201) {
    const err = await res.text();
    throw new Error(`Register ${role} failed: ${res.status} ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  return { email, token: data.data?.accessToken, userId: data.data?.user?.id, registerMs: ms };
}

async function login(email, password = PASSWORD) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, rememberMe: false }),
  });
  const data = await res.json();
  return { status: res.status, token: data.data?.accessToken };
}

async function cleanup() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nourishbridge";
  try {
    await mongoose.connect(uri);
    const emailPattern = new RegExp(`perf\\..*\\.${RUN_ID}@test\\.nourishbridge\\.local`, "i");
    const { default: User } = await import("../src/models/User.model.js");
    const users = await User.find({ email: emailPattern }).select("_id");
    const userIds = users.map((u) => u._id);
    if (userIds.length) {
      const [
        Donor, Volunteer, NGO, Donation, FoodRequest, Notification, RefreshToken,
      ] = await Promise.all([
        import("../src/models/Donor.model.js"),
        import("../src/models/Volunteer.model.js"),
        import("../src/models/NGO.model.js"),
        import("../src/models/Donation.model.js"),
        import("../src/models/FoodRequest.model.js"),
        import("../src/models/Notification.model.js"),
        import("../src/models/RefreshToken.model.js"),
      ]);
      const donors = await Donor.default.find({ userId: { $in: userIds } }).select("_id");
      const donorIds = donors.map((d) => d._id);
      await Promise.all([
        Donation.default.deleteMany({ donorId: { $in: donorIds } }),
        FoodRequest.default.deleteMany({ requestedBy: { $in: userIds } }),
        Notification.default.deleteMany({ userId: { $in: userIds } }),
        RefreshToken.default.deleteMany({ userId: { $in: userIds } }),
        Donor.default.deleteMany({ userId: { $in: userIds } }),
        Volunteer.default.deleteMany({ userId: { $in: userIds } }),
        NGO.default.deleteMany({ userId: { $in: userIds } }),
        User.deleteMany({ _id: { $in: userIds } }),
      ]);
    }
    await mongoose.disconnect();
  } catch {
    /* cleanup best-effort */
  }
}

function printResult(name, result, concurrency) {
  const rating = classifyP95(result.p95, name);
  console.log(`\n── ${name} (concurrency=${concurrency}, n=${result.total}) ──`);
  console.log(`  p50=${result.p50}ms  p90=${result.p90}ms  p95=${result.p95}ms  p99=${result.p99}ms`);
  console.log(`  avg=${result.avg}ms  min=${Math.round(result.min)}ms  max=${Math.round(result.max)}ms`);
  console.log(`  throughput≈${result.total && result.avg ? Math.round((result.total / (result.avg * result.total / 1000 / concurrency)) ) : 0} req/s (approx)`);
  console.log(`  errors=${result.errors}  statuses=${JSON.stringify(result.statuses)}`);
  console.log(`  rating(p95): ${rating}`);
  return { name, concurrency, ...result, rating };
}

async function main() {
  console.log("NourishBridge Performance Load Test");
  console.log(`Base URL: ${BASE}`);
  console.log(`Run ID: ${RUN_ID}`);

  const results = [];

  // Health check baseline
  for (const c of [1, 5, 10]) {
    const r = await runConcurrent(() => request("GET", "/health"), c, c * 5);
    results.push(printResult("GET /health", r, c));
  }

  // Setup accounts
  console.log("\nSetting up isolated perf test accounts...");
  const donor = await registerRole("donor", "d");
  const ngo = await registerRole("ngo", "n");
  const volunteer = await registerRole("volunteer", "v");
  const adminLogin = await login(ADMIN_EMAIL, ADMIN_PASSWORD);
  if (!adminLogin.token) throw new Error("Admin login failed");
  const adminToken = adminLogin.token;

  // Auth login performance
  for (const c of [1, 5, 10, 25]) {
    const captured = await runConcurrent(async () => {
      const start = performance.now();
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: donor.email, password: PASSWORD }),
      });
      const ms = performance.now() - start;
      return { status: res.status, ms, ok: res.ok };
    }, c, c * 3);
    results.push(printResult("POST /auth/login", captured, c));
  }

  // Read APIs
  const readTests = [
    ["GET /donor/dashboard", donor.token, "/donor/dashboard"],
    ["GET /donations/my", donor.token, "/donations/my"],
    ["GET /ngo/dashboard", ngo.token, "/ngo/dashboard"],
    ["GET /ngo/inventory", ngo.token, "/ngo/inventory"],
    ["GET /volunteer/missions/available", volunteer.token, "/volunteer/missions/available"],
    ["GET /notifications", donor.token, "/notifications"],
    ["GET /admin/dashboard", adminToken, "/admin/dashboard"],
    ["GET /admin/analytics", adminToken, "/admin/analytics"],
  ];

  for (const [name, token, path] of readTests) {
    for (const c of [1, 5, 10]) {
      const r = await runConcurrent(
        () => request("GET", path, { token }),
        c,
        c * 3,
      );
      results.push(printResult(name, r, c));
    }
  }

  // Write — single donation create (low volume)
  for (const c of [1, 5]) {
    let i = 0;
    const r = await runConcurrent(async () => {
      const res = await request("POST", "/donations", {
        token: donor.token,
        body: {
          foodName: `Perf Meal ${i++}`,
          category: "cooked_meals",
          quantity: 5,
          quantityUnit: "kg",
          estimatedMeals: 25,
          expiryTime: new Date(Date.now() + 12 * 3600000).toISOString(),
          pickupScheduledAt: new Date(Date.now() + 2 * 3600000).toISOString(),
          pickupEndAt: new Date(Date.now() + 4 * 3600000).toISOString(),
          pickupAddress: { line1: "Perf Lane", city: "Hyderabad", state: "Telangana", pincode: "500001" },
        },
      });
      return res;
    }, c, c * 2);
    results.push(printResult("POST /donations (write)", r, c));
  }

  // Pagination boundary
  console.log("\n── Pagination boundary tests ──");
  const pagTests = [
    ["/donations/my?limit=100000", donor.token, "donations"],
    ["/notifications?limit=100000", donor.token, "notifications"],
    ["/admin/users?limit=100000", adminToken, "admin/users"],
  ];
  for (const [path, token, label] of pagTests) {
    const res = await request("GET", path, { token });
    console.log(`  ${label} limit=100000 → HTTP ${res.status} (${Math.round(res.ms)}ms)`);
  }

  // Controlled load burst (10, 25, 50 concurrent health)
  console.log("\n── Controlled load burst (health) ──");
  for (const c of [10, 25, 50]) {
    const r = await runConcurrent(() => request("GET", "/health"), c, c * 10);
    results.push(printResult(`LOAD health @${c}`, r, c));
    if (r.errors > r.total * 0.05) {
      console.log(`  ⚠ Stopping higher load — error rate ${((r.errors / r.total) * 100).toFixed(1)}%`);
      break;
    }
  }

  // Short stability (30 sequential health checks)
  console.log("\n── Stability (30 sequential health) ──");
  const stability = [];
  for (let i = 0; i < 30; i++) {
    const r = await request("GET", "/health");
    stability.push(r.ms);
  }
  const stab = stats(stability);
  console.log(`  p50=${stab.p50}ms p95=${stab.p95}ms max=${stab.max}ms — no crash`);

  // Summary JSON
  const summary = {
    runId: RUN_ID,
    baseUrl: BASE,
    timestamp: new Date().toISOString(),
    results: results.filter(Boolean),
    stability: stab,
    thresholds: THRESHOLDS,
  };

  console.log("\n══════════════════════════════════════");
  console.log("PERF SUMMARY (key p95 at concurrency=5 or nearest):");
  for (const key of ["GET /health", "POST /auth/login", "GET /admin/dashboard", "GET /donations/my"]) {
    const match = results.find((r) => r?.name === key && r?.concurrency === 5)
      || results.find((r) => r?.name === key);
    if (match) console.log(`  ${key}: p95=${match.p95}ms (${match.rating})`);
  }

  await cleanup();
  console.log("\nCleanup complete.");
  return summary;
}

main().catch(async (err) => {
  console.error("Perf test failed:", err.message);
  await cleanup();
  process.exit(1);
});
