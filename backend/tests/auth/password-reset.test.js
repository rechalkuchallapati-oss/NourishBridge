import { describe, it, expect, beforeAll } from "vitest";
import { api, path } from "../helpers/api.js";
import {
  registerUser,
  loginUser,
  findPasswordResetOtp,
  assertPasswordHashed,
} from "../helpers/auth.js";
import { DEFAULT_PASSWORD, testEmail } from "../helpers/constants.js";
import { connectTestDb } from "../helpers/db.js";
import PasswordResetOtp from "../../src/models/PasswordResetOtp.model.js";

describe("Auth — Password Reset", () => {
  const email = testEmail("donor", "pwd-reset");
  const newPassword = "NewSecurePass123";

  beforeAll(async () => {
    await connectTestDb();
    await registerUser("donor", "pwd-reset", { email });
  });

  it("generates OTP on forgot-password", async () => {
    const res = await (await api()).post(path("/auth/forgot-password")).send({ email });
    expect(res.status).toBe(200);

    const record = await PasswordResetOtp.findOne({ email: email.toLowerCase() }).sort({
      createdAt: -1,
    });
    expect(record).toBeTruthy();
    expect(record.otpHash).toBeTruthy();
  });

  it("resets password with valid OTP", async () => {
    const otp = await findPasswordResetOtp(email);
    expect(otp).toBeTruthy();

    const res = await (await api())
      .post(path("/auth/reset-password"))
      .send({ email, otp, password: newPassword, confirmPassword: newPassword });
    expect(res.status).toBe(200);

    await assertPasswordHashed(email, newPassword);
  });

  it("logs in with new password", async () => {
    const { res } = await loginUser(email, newPassword);
    expect(res.status).toBe(200);
  });

  it("rejects login with old password", async () => {
    const { res } = await loginUser(email, DEFAULT_PASSWORD);
    expect(res.status).toBe(401);
  });

  it("rejects incorrect OTP", async () => {
    await (await api()).post(path("/auth/forgot-password")).send({ email });
    const res = await (await api())
      .post(path("/auth/reset-password"))
      .send({
        email,
        otp: "000000",
        password: "AnotherPass123",
        confirmPassword: "AnotherPass123",
      });
    expect(res.status).toBe(400);
  });

  it("cleans up OTP after successful reset", async () => {
    const freshEmail = testEmail("donor", "pwd-cleanup");
    await registerUser("donor", "pwd-cleanup", { email: freshEmail });
    await (await api()).post(path("/auth/forgot-password")).send({ email: freshEmail });
    const otp = await findPasswordResetOtp(freshEmail);
    await (await api())
      .post(path("/auth/reset-password"))
      .send({
        email: freshEmail,
        otp,
        password: newPassword,
        confirmPassword: newPassword,
      });

    const remaining = await PasswordResetOtp.findOne({
      email: freshEmail.toLowerCase(),
      usedAt: null,
    });
    expect(remaining).toBeFalsy();
  });
});

describe("Auth — Email Verification", () => {
  it("skips email verification OTP flow — not implemented in API", () => {
    // No /auth/verify-email route exists; isVerified is set on registration.
    expect(true).toBe(true);
  });
});
