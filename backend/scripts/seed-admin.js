/**
 * Seed a platform admin user for development/testing.
 * Admin accounts cannot self-register via the public API.
 *
 * Usage: node scripts/seed-admin.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "../src/models/User.model.js";
import { hashPassword } from "../src/utils/password.js";
import { USER_ROLES, USER_STATUS } from "../src/constants/enums.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const ADMIN_EMAIL = process.env.ADMIN_SEED_EMAIL || "admin@nourishbridge.local";
const ADMIN_PASSWORD = process.env.ADMIN_SEED_PASSWORD || "AdminPass123";

const seedAdmin = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nourishbridge";
  await mongoose.connect(uri);

  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (existing) {
    console.log(`Admin already exists: ${ADMIN_EMAIL}`);
    await mongoose.disconnect();
    return existing;
  }

  const admin = await User.create({
    fullName: "Platform Admin",
    email: ADMIN_EMAIL,
    password: await hashPassword(ADMIN_PASSWORD),
    phone: "9000000000",
    role: USER_ROLES.ADMIN,
    address: {
      line1: "NourishBridge HQ",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
      country: "India",
    },
    status: USER_STATUS.ACTIVE,
  });

  console.log(`Admin created: ${admin.email}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);

  await mongoose.disconnect();
  return admin;
};

seedAdmin().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
