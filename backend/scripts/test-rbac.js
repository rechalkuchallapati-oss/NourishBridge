/**
 * RBAC smoke test — run: node scripts/test-rbac.js
 * Verifies each role can only access its own dashboard API (403 for cross-role).
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import User from "../src/models/User.model.js";
import Donor from "../src/models/Donor.model.js";
import Volunteer from "../src/models/Volunteer.model.js";
import NGO from "../src/models/NGO.model.js";
import { hashPassword } from "../src/utils/password.js";
import { USER_ROLES, USER_STATUS, DONOR_TYPES, VEHICLE_TYPES } from "../src/constants/enums.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const BASE = `http://localhost:${process.env.PORT || 5000}/api/v1`;
const PASSWORD = "RbacTest123";
const ts = Date.now();

const DASHBOARD_PATHS = {
  admin: "/admin/dashboard",
  donor: "/donor/dashboard",
  ngo: "/ngo/dashboard",
  volunteer: "/volunteer/dashboard",
};

async function request(method, urlPath, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${urlPath}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { status: res.status, data };
}

async function login(email) {
  const res = await request("POST", "/auth/login", { email, password: PASSWORD });
  return res.data.data?.accessToken;
}

async function seedUsers() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nourishbridge";
  await mongoose.connect(uri);

  const users = {
    admin: { email: `rbac.admin.${ts}@example.com`, role: USER_ROLES.ADMIN, fullName: "RBAC Admin" },
    donor: { email: `rbac.donor.${ts}@example.com`, role: USER_ROLES.DONOR, fullName: "RBAC Donor" },
    ngo: { email: `rbac.ngo.${ts}@example.com`, role: USER_ROLES.NGO, fullName: "RBAC NGO" },
    volunteer: { email: `rbac.vol.${ts}@example.com`, role: USER_ROLES.VOLUNTEER, fullName: "RBAC Vol" },
  };

  for (const [key, meta] of Object.entries(users)) {
    const user = await User.create({
      fullName: meta.fullName,
      email: meta.email,
      password: await hashPassword(PASSWORD),
      phone: "9876543210",
      role: meta.role,
      address: { line1: "Test", city: "Hyderabad", pincode: "500001" },
      status: USER_STATUS.ACTIVE,
    });

    if (key === "donor") {
      await Donor.create({
        userId: user._id,
        donorType: DONOR_TYPES.INDIVIDUAL,
        organizationName: meta.fullName,
        contactPerson: meta.fullName,
      });
    }
    if (key === "ngo") {
      await NGO.create({
        userId: user._id,
        ngoName: "RBAC NGO Org",
        registrationNumber: `RBAC${ts}`,
        address: user.address,
        contactPerson: meta.fullName,
        contactPhone: user.phone,
      });
    }
    if (key === "volunteer") {
      await Volunteer.create({
        userId: user._id,
        vehicleType: VEHICLE_TYPES.BIKE,
      });
    }
  }

  return users;
}

function assert(condition, label) {
  if (!condition) {
    console.error(`FAIL: ${label}`);
    process.exit(1);
  }
  console.log(`OK: ${label}`);
}

async function run() {
  console.log("Seeding RBAC test users...");
  const users = await seedUsers();

  const tokens = {};
  for (const [role, meta] of Object.entries(users)) {
    tokens[role] = await login(meta.email);
    assert(Boolean(tokens[role]), `${role} login`);
  }

  console.log("\nCross-role API access (expect 403)...");

  const roles = Object.keys(DASHBOARD_PATHS);
  for (const callerRole of roles) {
    for (const targetRole of roles) {
      const path = DASHBOARD_PATHS[targetRole];
      const res = await request("GET", path, null, tokens[callerRole]);
      const expected = callerRole === targetRole ? 200 : 403;

      assert(
        res.status === expected,
        `${callerRole} → ${targetRole} dashboard → ${res.status} (expected ${expected})`,
      );
    }
  }

  console.log("\nUnauthenticated access (expect 401)...");
  for (const targetRole of roles) {
    const res = await request("GET", DASHBOARD_PATHS[targetRole]);
    assert(res.status === 401, `no token → ${targetRole} → 401`);
  }

  await mongoose.disconnect();
  console.log("\nAll RBAC tests passed.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
