import User from "../../src/models/User.model.js";
import PasswordResetOtp from "../../src/models/PasswordResetOtp.model.js";
import { verifyOtp } from "../../src/utils/otp.js";
import { comparePassword } from "../../src/utils/password.js";
import { api, path, authHeader } from "./api.js";
import {
  DEFAULT_PASSWORD,
  ADMIN_PASSWORD,
  TEST_ADDRESS,
  testEmail,
} from "./constants.js";

import { getTestAdminEmail } from "./seedAdmin.js";

import { getRunId } from "./constants.js";

function buildRoleProfile(role, suffix) {
  const runId = getRunId().replace(/[^a-zA-Z0-9]/g, "");
  const profiles = {
    donor: { donorType: "individual" },
    ngo: {
      ngoName: `Test NGO ${suffix}`,
      registrationNumber: `NGO-${suffix}-${runId}-${Date.now()}`,
    },
    volunteer: { vehicleType: "bike" },
  };
  return profiles[role] || {};
}

export async function registerUser(role, suffix = "main", overrides = {}) {
  const email = overrides.email || testEmail(role, suffix);
  const profile = {
    ...buildRoleProfile(role, suffix),
    ...(overrides.profile || {}),
  };

  const payload = {
    fullName: overrides.fullName || `Test ${role}`,
    email,
    password: overrides.password || DEFAULT_PASSWORD,
    confirmPassword: overrides.confirmPassword || overrides.password || DEFAULT_PASSWORD,
    phone: overrides.phone || "9876543210",
    role,
    address: overrides.address || TEST_ADDRESS,
    profile,
    ...overrides.extra,
  };

  const res = await (await api())
    .post(path("/auth/register"))
    .send(payload)
    .expect("Content-Type", /json/);

  return {
    res,
    email,
    password: payload.password,
    body: res.body,
    tokens: res.body?.data,
    user: res.body?.data?.user,
  };
}

export async function loginUser(email, password = DEFAULT_PASSWORD) {
  const res = await (await api())
    .post(path("/auth/login"))
    .send({ email, password })
    .expect("Content-Type", /json/);

  return {
    res,
    body: res.body,
    tokens: res.body?.data,
    accessToken: res.body?.data?.accessToken,
    refreshToken: res.body?.data?.refreshToken,
  };
}

export async function loginAdmin() {
  const email = getTestAdminEmail();
  if (!email) throw new Error("Test admin not seeded — connectTestDb may have failed");
  return loginUser(email, ADMIN_PASSWORD);
}

export async function createRoleAccounts(suffix = "shared") {
  const [donor, ngo, volunteer] = await Promise.all([
    registerUser("donor", suffix),
    registerUser("ngo", suffix),
    registerUser("volunteer", suffix),
  ]);

  const admin = await loginAdmin();

  return {
    donor: {
      ...donor,
      accessToken: donor.tokens?.accessToken,
      refreshToken: donor.tokens?.refreshToken,
    },
    ngo: {
      ...ngo,
      accessToken: ngo.tokens?.accessToken,
      refreshToken: ngo.tokens?.refreshToken,
    },
    volunteer: {
      ...volunteer,
      accessToken: volunteer.tokens?.accessToken,
      refreshToken: volunteer.tokens?.refreshToken,
    },
    admin: {
      email: getTestAdminEmail(),
      accessToken: admin.accessToken,
      refreshToken: admin.refreshToken,
    },
  };
}

export async function authGet(token, urlPath) {
  return (await api()).get(path(urlPath)).set(authHeader(token));
}

export async function authPost(token, urlPath, body = {}) {
  return (await api()).post(path(urlPath)).set(authHeader(token)).send(body);
}

export async function authPatch(token, urlPath, body = {}) {
  return (await api()).patch(path(urlPath)).set(authHeader(token)).send(body);
}

export async function authDelete(token, urlPath, body = {}) {
  return (await api()).delete(path(urlPath)).set(authHeader(token)).send(body);
}

export async function findPasswordResetOtp(email) {
  const record = await PasswordResetOtp.findOne({ email: email.toLowerCase() }).sort({
    createdAt: -1,
  });
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

export async function assertPasswordHashed(email, plainPassword) {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) throw new Error(`User not found: ${email}`);
  const match = await comparePassword(plainPassword, user.password);
  if (!match) throw new Error("Stored password does not match plain text via bcrypt");
  if (user.password === plainPassword) throw new Error("Password stored in plain text");
  return user;
}
