/**
 * Password reset smoke test — run: node scripts/test-password-reset.js
 * Requires MongoDB + running server. OTP logged to console when SMTP is not configured.
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import User from "../src/models/User.model.js";
import PasswordResetOtp from "../src/models/PasswordResetOtp.model.js";
import { hashPassword } from "../src/utils/password.js";
import { hashOtp } from "../src/utils/otp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const BASE = `http://localhost:${process.env.PORT || 5000}/api/v1/auth`;
const TEST_EMAIL = `reset.test.${Date.now()}@example.com`;
const OLD_PASSWORD = "OldPass123";
const NEW_PASSWORD = "NewPass456";

async function request(method, urlPath, body) {
  const res = await fetch(`${BASE}${urlPath}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  return { status: res.status, data };
}

async function seedUser() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nourishbridge";
  await mongoose.connect(uri);

  await User.create({
    fullName: "Reset Test User",
    email: TEST_EMAIL,
    password: await hashPassword(OLD_PASSWORD),
    phone: "9876543210",
    role: "donor",
    address: { line1: "Test", city: "Hyderabad", pincode: "500001" },
    status: "active",
  });
}

async function findOtpFromDb() {
  const record = await PasswordResetOtp.findOne({ email: TEST_EMAIL }).sort({ createdAt: -1 });
  if (!record) return null;

  for (let i = 100000; i <= 999999; i++) {
    const candidate = String(i);
    try {
      const { verifyOtp } = await import("../src/utils/otp.js");
      if (verifyOtp(candidate, record.otpHash)) return candidate;
    } catch {
      /* continue */
    }
  }
  return null;
}

async function run() {
  console.log("1. Seed test user...");
  await seedUser();
  console.log(`   Email: ${TEST_EMAIL}`);

  console.log("2. POST /forgot-password...");
  const forgot = await request("POST", "/forgot-password", { email: TEST_EMAIL });
  console.log(forgot.status, forgot.data.message);
  if (!forgot.data.success) return process.exit(1);

  console.log("3. Resolve OTP (check server console if SMTP not configured)...");
  const otp = await findOtpFromDb();
  if (!otp) {
    console.error("Could not resolve OTP from database.");
    return process.exit(1);
  }
  console.log(`   OTP resolved: ${otp}`);

  console.log("4. POST /reset-password...");
  const reset = await request("POST", "/reset-password", {
    email: TEST_EMAIL,
    otp,
    password: NEW_PASSWORD,
    confirmPassword: NEW_PASSWORD,
  });
  console.log(reset.status, reset.data.message);
  if (!reset.data.success) return process.exit(1);

  console.log("5. Login with new password...");
  const login = await request("POST", "/login", {
    email: TEST_EMAIL,
    password: NEW_PASSWORD,
  });
  console.log(login.status, login.data.success ? "OK" : login.data.message);

  console.log("6. OTP records deleted...");
  const remaining = await PasswordResetOtp.countDocuments({ email: TEST_EMAIL });
  console.log(remaining === 0 ? "OK — no OTP records remain" : `FAIL — ${remaining} records`);

  await mongoose.disconnect();
  console.log("\nAll password reset tests passed.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
