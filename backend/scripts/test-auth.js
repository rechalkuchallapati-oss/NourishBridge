/**
 * Quick auth smoke test — run: node scripts/test-auth.js
 * Requires MongoDB running on localhost.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const BASE = `http://localhost:${process.env.PORT || 5000}/api/v1/auth`;

const sampleUser = {
  fullName: "Test Donor",
  email: `test.donor.${Date.now()}@example.com`,
  password: "TestPass123",
  confirmPassword: "TestPass123",
  phone: "9876543210",
  role: "donor",
  address: {
    line1: "123 Test Street",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    country: "India",
  },
  profile: { donorType: "individual" },
};

async function request(method, path, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { status: res.status, data };
}

async function run() {
  console.log("1. Register...");
  const reg = await request("POST", "/register", sampleUser);
  console.log(reg.status, reg.data.success ? "OK" : reg.data.message);
  if (!reg.data.success) return process.exit(1);

  const { accessToken, refreshToken } = reg.data.data;

  console.log("2. Login...");
  const login = await request("POST", "/login", {
    email: sampleUser.email,
    password: sampleUser.password,
  });
  console.log(login.status, login.data.success ? "OK" : login.data.message);

  console.log("3. GET /me...");
  const me = await request("GET", "/me", null, accessToken);
  console.log(me.status, me.data.data?.user?.email);

  console.log("4. Refresh token...");
  const refresh = await request("POST", "/refresh", { refreshToken });
  console.log(refresh.status, refresh.data.success ? "OK" : refresh.data.message);

  console.log("5. Logout...");
  const logout = await request("POST", "/logout", {
    refreshToken: refresh.data.data?.refreshToken || refreshToken,
  });
  console.log(logout.status, logout.data.message);

  console.log("6. Duplicate email...");
  const dup = await request("POST", "/register", sampleUser);
  console.log(dup.status, dup.data.message);

  console.log("\nAll auth smoke tests passed.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
