/**
 * Complete authentication system test suite.
 * Run: node scripts/test-auth-complete.js
 * Requires MongoDB + running server on PORT (default 5000).
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../src/models/User.model.js";
import Donor from "../src/models/Donor.model.js";
import RefreshToken from "../src/models/RefreshToken.model.js";
import PasswordResetOtp from "../src/models/PasswordResetOtp.model.js";
import { hashPassword } from "../src/utils/password.js";
import { verifyOtp } from "../src/utils/otp.js";
import config from "../src/config/index.js";
import { USER_ROLES, USER_STATUS, DONOR_TYPES } from "../src/constants/enums.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
const AUTH = `http://localhost:${PORT}/api/v1/auth`;
const API = `http://localhost:${PORT}/api/v1`;
const ts = Date.now();

const bugs = [];
const passes = [];

function pass(label) {
  passes.push(label);
  console.log(`✓ ${label}`);
}

function fail(label, detail = "") {
  bugs.push({ label, detail });
  console.error(`✗ FAIL: ${label}${detail ? ` — ${detail}` : ""}`);
}

function assertStatus(res, expected, label) {
  if (res.status === expected) pass(label);
  else fail(label, `expected ${expected}, got ${res.status}: ${JSON.stringify(res.data?.message)}`);
}

async function request(method, url, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  return { status: res.status, data };
}

const validUser = {
  fullName: "Auth Test Donor",
  email: `auth.complete.${ts}@example.com`,
  password: "ValidPass123",
  confirmPassword: "ValidPass123",
  phone: "9876543210",
  role: "donor",
  address: {
    line1: "123 Test St",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
  },
  profile: { donorType: "individual" },
};

async function findOtp(email) {
  const record = await PasswordResetOtp.findOne({ email: email.toLowerCase() }).sort({ createdAt: -1 });
  if (!record) return null;
  for (let i = 100000; i <= 999999; i++) {
    const candidate = String(i);
    try {
      if (verifyOtp(candidate, record.otpHash)) return candidate;
    } catch {
      /* continue */
    }
  }
  return null;
}

async function run() {
  console.log(`\n=== NourishBridge Auth Test Suite (port ${PORT}) ===\n`);

  // ── 1. Registration ──
  console.log("── Registration ──");
  const reg = await request("POST", `${AUTH}/register`, validUser);
  assertStatus(reg, 201, "Registration returns 201");
  if (!reg.data.data?.accessToken) fail("Registration returns tokens");

  const { accessToken, refreshToken } = reg.data.data || {};

  // ── 2. Duplicate email ──
  console.log("\n── Duplicate email ──");
  const dup = await request("POST", `${AUTH}/register`, validUser);
  assertStatus(dup, 409, "Duplicate email returns 409");

  // ── 3. Invalid password ──
  console.log("\n── Invalid password ──");
  const weakPass = await request("POST", `${AUTH}/register`, {
    ...validUser,
    email: `weak.${ts}@example.com`,
    password: "weak",
    confirmPassword: "weak",
  });
  assertStatus(weakPass, 400, "Weak password returns 400");

  const mismatch = await request("POST", `${AUTH}/register`, {
    ...validUser,
    email: `mismatch.${ts}@example.com`,
    password: "ValidPass123",
    confirmPassword: "DifferentPass123",
  });
  assertStatus(mismatch, 400, "Password mismatch returns 400");

  const adminReg = await request("POST", `${AUTH}/register`, {
    ...validUser,
    email: `admin.${ts}@example.com`,
    role: "admin",
  });
  assertStatus(adminReg, 400, "Admin self-registration blocked (400)");

  // ── 3b. Invalid login ──
  console.log("\n── Invalid login ──");
  const badLogin = await request("POST", `${AUTH}/login`, {
    email: validUser.email,
    password: "WrongPassword123",
  });
  assertStatus(badLogin, 401, "Wrong password login returns 401");

  const unknownLogin = await request("POST", `${AUTH}/login`, {
    email: "nobody@example.com",
    password: "ValidPass123",
  });
  assertStatus(unknownLogin, 401, "Unknown email login returns 401");

  // ── 4. JWT validation ──
  console.log("\n── JWT validation ──");
  const me = await request("GET", `${AUTH}/me`, null, accessToken);
  assertStatus(me, 200, "Valid JWT → GET /me returns 200");

  const badJwt = await request("GET", `${AUTH}/me`, null, "invalid.token.here");
  assertStatus(badJwt, 401, "Invalid JWT returns 401");

  const wrongSecret = jwt.sign(
    { sub: "fake", type: "access" },
    "wrong-secret",
    { expiresIn: "15m" },
  );
  const wrongSecretRes = await request("GET", `${AUTH}/me`, null, wrongSecret);
  assertStatus(wrongSecretRes, 401, "JWT with wrong secret returns 401");

  // ── 5. Expired token ──
  console.log("\n── Expired token ──");
  const expiredToken = jwt.sign(
    { sub: reg.data.data?.user?.id || "000000000000000000000000", type: "access", email: validUser.email, role: "donor" },
    config.jwt.accessSecret,
    { expiresIn: "-1s" },
  );
  const expiredRes = await request("GET", `${AUTH}/me`, null, expiredToken);
  assertStatus(expiredRes, 401, "Expired access token returns 401");

  // ── 6. Role protection ──
  console.log("\n── Role protection ──");
  const donorToAdmin = await request("GET", `${API}/admin/dashboard`, null, accessToken);
  assertStatus(donorToAdmin, 403, "Donor blocked from admin API (403)");

  const donorDash = await request("GET", `${API}/donor/dashboard`, null, accessToken);
  assertStatus(donorDash, 200, "Donor can access donor API (200)");

  const noToken = await request("GET", `${API}/donor/dashboard`);
  assertStatus(noToken, 401, "No token returns 401");

  // ── 7. Logout ──
  console.log("\n── Logout ──");
  const loginBeforeLogout = await request("POST", `${AUTH}/login`, {
    email: validUser.email,
    password: validUser.password,
  });
  const logoutRefresh = loginBeforeLogout.data.data?.refreshToken;
  const logoutAccess = loginBeforeLogout.data.data?.accessToken;

  const logoutRes = await request("POST", `${AUTH}/logout`, { refreshToken: logoutRefresh });
  assertStatus(logoutRes, 200, "Logout returns 200");

  const refreshAfterLogout = await request("POST", `${AUTH}/refresh`, { refreshToken: logoutRefresh });
  assertStatus(refreshAfterLogout, 401, "Revoked refresh token cannot refresh (401)");

  // Access token still works until expiry (stateless JWT) — document behavior
  const meAfterLogout = await request("GET", `${AUTH}/me`, null, logoutAccess);
  if (meAfterLogout.status === 200) {
    pass("Access token still valid until expiry after logout (expected JWT behavior)");
  } else {
    fail("Unexpected access token behavior after logout", `status ${meAfterLogout.status}`);
  }

  // ── 8. Session persistence (refresh flow) ──
  console.log("\n── Session persistence ──");
  const login2 = await request("POST", `${AUTH}/login`, {
    email: validUser.email,
    password: validUser.password,
  });
  const rt2 = login2.data.data?.refreshToken;
  const refreshRes = await request("POST", `${AUTH}/refresh`, { refreshToken: rt2 });
  assertStatus(refreshRes, 200, "Refresh token rotation returns 200");
  if (!refreshRes.data.data?.accessToken) fail("Refresh returns new access token");
  if (!refreshRes.data.data?.refreshToken) fail("Refresh returns new refresh token");

  const newAccess = refreshRes.data.data.accessToken;
  const meAfterRefresh = await request("GET", `${AUTH}/me`, null, newAccess);
  assertStatus(meAfterRefresh, 200, "New access token works after refresh");

  // Old refresh token should be revoked after rotation
  const oldRefreshRetry = await request("POST", `${AUTH}/refresh`, { refreshToken: rt2 });
  assertStatus(oldRefreshRetry, 401, "Old refresh token revoked after rotation (401)");

  // ── 9. Forgot password ──
  console.log("\n── Forgot password ──");
  const forgot = await request("POST", `${AUTH}/forgot-password`, { email: validUser.email });
  assertStatus(forgot, 200, "Forgot password returns 200");

  const forgotUnknown = await request("POST", `${AUTH}/forgot-password`, { email: "unknown@example.com" });
  assertStatus(forgotUnknown, 200, "Forgot password unknown email still returns 200 (no enumeration)");

  // ── 10. Reset password ──
  console.log("\n── Reset password ──");
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nourishbridge";
  await mongoose.connect(uri);
  const otp = await findOtp(validUser.email);
  await mongoose.disconnect();

  if (!otp) {
    fail("Could not resolve OTP from database");
  } else {
    pass(`OTP resolved from database (${otp})`);

    const badOtp = await request("POST", `${AUTH}/reset-password`, {
      email: validUser.email,
      otp: "000000",
      password: "NewPass789",
      confirmPassword: "NewPass789",
    });
    assertStatus(badOtp, 400, "Wrong OTP returns 400");

    const reset = await request("POST", `${AUTH}/reset-password`, {
      email: validUser.email,
      otp,
      password: "NewPass789",
      confirmPassword: "NewPass789",
    });
    assertStatus(reset, 200, "Reset password with valid OTP returns 200");

    const loginNewPass = await request("POST", `${AUTH}/login`, {
      email: validUser.email,
      password: "NewPass789",
    });
    assertStatus(loginNewPass, 200, "Login with new password after reset");

    const loginOldPass = await request("POST", `${AUTH}/login`, {
      email: validUser.email,
      password: validUser.password,
    });
    assertStatus(loginOldPass, 401, "Old password rejected after reset (401)");

    await mongoose.connect(uri);
    const otpRemaining = await PasswordResetOtp.countDocuments({ email: validUser.email.toLowerCase() });
    await mongoose.disconnect();
    if (otpRemaining === 0) pass("OTP records deleted after successful reset");
    else fail("OTP records not deleted", `${otpRemaining} remain`);
  }

  // ── Summary ──
  console.log("\n=== SUMMARY ===");
  console.log(`Passed: ${passes.length}`);
  console.log(`Failed: ${bugs.length}`);

  if (bugs.length) {
    console.log("\nBugs found:");
    bugs.forEach((b, i) => console.log(`  ${i + 1}. ${b.label}${b.detail ? `: ${b.detail}` : ""}`));
    process.exit(1);
  }

  console.log("\nAll authentication tests passed.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Test suite error:", err.message);
  process.exit(1);
});
