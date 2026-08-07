/**
 * Protected route smoke test — run: node scripts/test-protected-routes.js
 * Requires MongoDB + running server. Seeds admin if needed.
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import User from "../src/models/User.model.js";
import { hashPassword } from "../src/utils/password.js";
import { USER_ROLES, USER_STATUS } from "../src/constants/enums.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
const BASE = `http://localhost:${PORT}/api/v1`;
const ADMIN_EMAIL = process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local";
const ADMIN_PASSWORD = process.env.ADMIN_SEED_PASSWORD || "AdminPass123";

const ts = Date.now();

const users = {
  admin: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  donor: {
    fullName: "Test Donor",
    email: `donor.${ts}@example.com`,
    password: "TestPass123",
    confirmPassword: "TestPass123",
    phone: "9876543210",
    role: "donor",
    address: { line1: "1 Test St", city: "Hyderabad", pincode: "500081" },
    profile: { donorType: "individual" },
  },
  ngo: {
    fullName: "NGO Admin",
    email: `ngo.${ts}@example.com`,
    password: "TestPass123",
    confirmPassword: "TestPass123",
    phone: "9876543211",
    role: "ngo",
    address: { line1: "2 NGO St", city: "Hyderabad", pincode: "500081" },
    profile: { ngoName: "Test NGO", registrationNumber: `NGO${ts}` },
  },
  volunteer: {
    fullName: "Test Volunteer",
    email: `volunteer.${ts}@example.com`,
    password: "TestPass123",
    confirmPassword: "TestPass123",
    phone: "9876543212",
    role: "volunteer",
    address: { line1: "3 Vol St", city: "Hyderabad", pincode: "500081" },
    profile: { vehicleType: "bike" },
  },
};

async function ensureAdmin() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nourishbridge";
  await mongoose.connect(uri);

  let admin = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (!admin) {
    admin = await User.create({
      fullName: "Platform Admin",
      email: ADMIN_EMAIL,
      password: await hashPassword(ADMIN_PASSWORD),
      phone: "9000000000",
      role: USER_ROLES.ADMIN,
      address: {
        line1: "HQ",
        city: "Hyderabad",
        pincode: "500081",
      },
      status: USER_STATUS.ACTIVE,
    });
    console.log("Seeded admin user");
  }

  await mongoose.disconnect();
}

async function request(method, url, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { status: res.status, data };
}

async function registerOrLogin(userPayload) {
  if (!userPayload.role) {
    return request("POST", `${BASE}/auth/login`, {
      email: userPayload.email,
      password: userPayload.password,
    });
  }
  const reg = await request("POST", `${BASE}/auth/register`, userPayload);
  if (reg.data.success) return reg;
  return request("POST", `${BASE}/auth/login`, {
    email: userPayload.email,
    password: userPayload.password,
  });
}

function assert(condition, label) {
  if (!condition) {
    console.error(`FAIL: ${label}`);
    process.exit(1);
  }
  console.log(`OK: ${label}`);
}

async function run() {
  await ensureAdmin();

  const adminAuth = await registerOrLogin(users.admin);
  const donorAuth = await registerOrLogin(users.donor);
  const ngoAuth = await registerOrLogin(users.ngo);
  const volunteerAuth = await registerOrLogin(users.volunteer);

  const adminToken = adminAuth.data.data.accessToken;
  const donorToken = donorAuth.data.data.accessToken;
  const ngoToken = ngoAuth.data.data.accessToken;
  const volunteerToken = volunteerAuth.data.data.accessToken;

  // 401 — no token
  const noAuth = await request("GET", `${BASE}/admin/dashboard`);
  assert(noAuth.status === 401, "401 without token");

  // 403 — wrong role (donor → admin)
  const donorToAdmin = await request("GET", `${BASE}/admin/dashboard`, null, donorToken);
  assert(donorToAdmin.status === 403, "403 donor blocked from admin");

  // 200 — admin dashboard
  const adminDash = await request("GET", `${BASE}/admin/dashboard`, null, adminToken);
  assert(adminDash.status === 200 && adminDash.data.success, "200 admin dashboard");

  // 403 — donor → ngo
  const donorToNgo = await request("GET", `${BASE}/ngo/dashboard`, null, donorToken);
  assert(donorToNgo.status === 403, "403 donor blocked from ngo");

  // 200 — ngo dashboard
  const ngoDash = await request("GET", `${BASE}/ngo/dashboard`, null, ngoToken);
  assert(ngoDash.status === 200 && ngoDash.data.success, "200 ngo dashboard");

  // 403 — ngo → volunteer
  const ngoToVol = await request("GET", `${BASE}/volunteer/dashboard`, null, ngoToken);
  assert(ngoToVol.status === 403, "403 ngo blocked from volunteer");

  // 200 — volunteer dashboard
  const volDash = await request("GET", `${BASE}/volunteer/dashboard`, null, volunteerToken);
  assert(volDash.status === 200 && volDash.data.success, "200 volunteer dashboard");

  console.log("\nAll protected route tests passed.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
