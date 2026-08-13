import User from "../../src/models/User.model.js";
import Admin from "../../src/models/Admin.model.js";
import { hashPassword } from "../../src/utils/password.js";
import {
  USER_ROLES,
  USER_STATUS,
  ADMIN_LEVELS,
  ADMIN_PERMISSIONS,
} from "../../src/constants/enums.js";
import { ADMIN_PASSWORD } from "./constants.js";

let seeded = false;

export async function ensureTestAdmin() {
  if (seeded && process.env.NB_TEST_ADMIN_EMAIL) {
    return process.env.NB_TEST_ADMIN_EMAIL;
  }

  const runId = process.env.NB_TEST_RUN_ID || `run_${Date.now()}`;
  process.env.NB_TEST_RUN_ID = runId;
  globalThis.__NB_TEST_RUN_ID__ = runId;

  const adminEmail = `suite.admin.${runId}@test.nourishbridge.local`;
  let adminUser = await User.findOne({ email: adminEmail });

  if (!adminUser) {
    adminUser = await User.create({
      fullName: "Suite Admin",
      email: adminEmail,
      password: await hashPassword(ADMIN_PASSWORD),
      phone: "9000000001",
      role: USER_ROLES.ADMIN,
      address: {
        line1: "Test HQ",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500081",
        country: "India",
      },
      status: USER_STATUS.ACTIVE,
    });

    await Admin.create({
      userId: adminUser._id,
      adminLevel: ADMIN_LEVELS.SUPER_ADMIN,
      permissions: Object.values(ADMIN_PERMISSIONS),
      department: "Test",
    });
  }

  process.env.NB_TEST_ADMIN_EMAIL = adminEmail;
  globalThis.__NB_TEST_ADMIN_EMAIL__ = adminEmail;
  seeded = true;
  return adminEmail;
}

export function getTestAdminEmail() {
  return process.env.NB_TEST_ADMIN_EMAIL || globalThis.__NB_TEST_ADMIN_EMAIL__;
}
