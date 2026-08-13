import { describe, it, expect, beforeAll } from "vitest";
import { api, path } from "../helpers/api.js";
import {
  registerUser,
  loginUser,
  assertPasswordHashed,
} from "../helpers/auth.js";
import { DEFAULT_PASSWORD, testEmail } from "../helpers/constants.js";
import { connectTestDb } from "../helpers/db.js";

describe("Auth — Registration", () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  it("registers a valid donor and returns tokens", async () => {
    const { res, email } = await registerUser("donor", "reg-valid");
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data?.accessToken).toBeTruthy();
    expect(res.body.data?.refreshToken).toBeTruthy();
    expect(res.body.data?.user?.email).toBe(email.toLowerCase());
    expect(res.body.data?.user?.role).toBe("donor");
  });

  it("rejects duplicate email with 409", async () => {
    const email = testEmail("donor", "reg-dup");
    await registerUser("donor", "reg-dup", { email });
    const dup = await registerUser("donor", "reg-dup-2", { email });
    expect(dup.res.status).toBe(409);
  });

  it("rejects invalid email with 400", async () => {
    const res = await (await api())
      .post(path("/auth/register"))
      .send({
        fullName: "Bad Email",
        email: "not-an-email",
        password: DEFAULT_PASSWORD,
        confirmPassword: DEFAULT_PASSWORD,
        phone: "9876543210",
        role: "donor",
        address: { line1: "A", city: "Hyderabad", pincode: "500001" },
        profile: { donorType: "individual" },
      });
    expect(res.status).toBe(400);
  });

  it("rejects missing required fields with 400", async () => {
    const res = await (await api()).post(path("/auth/register")).send({ role: "donor" });
    expect(res.status).toBe(400);
  });

  it("rejects weak password with 400", async () => {
    const { res } = await registerUser("donor", "reg-weak", {
      password: "weak",
      confirmPassword: "weak",
    });
    expect(res.status).toBe(400);
  });

  it("rejects password mismatch with 400", async () => {
    const { res } = await registerUser("donor", "reg-mismatch", {
      password: DEFAULT_PASSWORD,
      confirmPassword: "DifferentPass123",
    });
    expect(res.status).toBe(400);
  });

  it("hashes password in database", async () => {
    const { email } = await registerUser("donor", "reg-hash");
    await assertPasswordHashed(email, DEFAULT_PASSWORD);
  });

  it("blocks admin self-registration", async () => {
    const res = await (await api())
      .post(path("/auth/register"))
      .send({
        fullName: "Fake Admin",
        email: testEmail("admin", "reg-block"),
        password: DEFAULT_PASSWORD,
        confirmPassword: DEFAULT_PASSWORD,
        phone: "9876543210",
        role: "admin",
        address: { line1: "A", city: "Hyderabad", pincode: "500001" },
      });
    expect(res.status).toBe(400);
  });

  it("registers NGO and volunteer roles with profiles", async () => {
    const ngo = await registerUser("ngo", "reg-ngo", {
      profile: {
        ngoName: "Reg NGO",
        registrationNumber: `REG-NGO-${Date.now()}`,
      },
    });
    const vol = await registerUser("volunteer", "reg-vol", { profile: { vehicleType: "bike" } });
    expect(ngo.res.status).toBe(201);
    expect(vol.res.status).toBe(201);
    expect(ngo.user?.role).toBe("ngo");
    expect(vol.user?.role).toBe("volunteer");
  });
});

describe("Auth — Login", () => {
  const loginEmail = testEmail("donor", "login");

  beforeAll(async () => {
    await connectTestDb();
    await registerUser("donor", "login", { email: loginEmail });
  });

  it("logs in with valid credentials", async () => {
    const { res, accessToken } = await loginUser(loginEmail);
    expect(res.status).toBe(200);
    expect(accessToken).toBeTruthy();
  });

  it("returns 401 for incorrect password", async () => {
    const { res } = await loginUser(loginEmail, "WrongPassword123");
    expect(res.status).toBe(401);
  });

  it("returns 401 for nonexistent account", async () => {
    const { res } = await loginUser("nobody@test.nourishbridge.local");
    expect(res.status).toBe(401);
  });

  it("returns 400 for missing credentials", async () => {
    const res = await (await api()).post(path("/auth/login")).send({});
    expect(res.status).toBe(400);
  });
});
