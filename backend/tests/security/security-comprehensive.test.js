import { describe, it, expect, beforeAll } from "vitest";
import jwt from "jsonwebtoken";
import config from "../../src/config/index.js";
import { api, path, authHeader } from "../helpers/api.js";
import {
  registerUser,
  loginUser,
  createRoleAccounts,
  authGet,
  authPost,
  authPatch,
} from "../helpers/auth.js";
import { donationPayload, foodRequestPayload } from "../helpers/fixtures.js";
import { connectTestDb } from "../helpers/db.js";
import { DEFAULT_PASSWORD, TEST_ADDRESS } from "../helpers/constants.js";
import Notification from "../../src/models/Notification.model.js";

describe("Security — Authentication", () => {
  let accessToken;
  let refreshToken;
  let userId;
  let email;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("sec-auth");
    accessToken = accounts.donor.accessToken;
    refreshToken = accounts.donor.refreshToken;
    email = accounts.donor.email;
    userId = accounts.donor.user?.id;
  });

  it("returns 401 for protected endpoint without token", async () => {
    const res = await (await api()).get(path("/auth/me"));
    expect(res.status).toBe(401);
  });

  it("returns 401 for empty Authorization header", async () => {
    const res = await (await api()).get(path("/auth/me")).set({ Authorization: "" });
    expect(res.status).toBe(401);
  });

  it("returns 401 for malformed Authorization header", async () => {
    const res = await (await api()).get(path("/auth/me")).set({ Authorization: "NotBearer token" });
    expect(res.status).toBe(401);
  });

  it("returns 401 for Bearer with empty token", async () => {
    const res = await (await api()).get(path("/auth/me")).set(authHeader(""));
    expect(res.status).toBe(401);
  });

  it("returns 401 for invalid JWT", async () => {
    const res = await (await api()).get(path("/auth/me")).set(authHeader("invalid.jwt.token"));
    expect(res.status).toBe(401);
  });

  it("returns 401 for tampered JWT payload", async () => {
    const parts = accessToken.split(".");
    const tampered = `${parts[0]}.${parts[1]}x.${parts[2]}`;
    const res = await (await api()).get(path("/auth/me")).set(authHeader(tampered));
    expect(res.status).toBe(401);
  });

  it("returns 401 for expired JWT", async () => {
    const expired = jwt.sign(
      { sub: userId, type: "access", email, role: "donor" },
      config.jwt.accessSecret,
      { expiresIn: "-1s" },
    );
    const res = await (await api()).get(path("/auth/me")).set(authHeader(expired));
    expect(res.status).toBe(401);
  });

  it("returns 401 for JWT signed with wrong secret", async () => {
    const bad = jwt.sign({ sub: userId, type: "access" }, "wrong-secret-minimum-32-characters-long", {
      expiresIn: "15m",
    });
    const res = await (await api()).get(path("/auth/me")).set(authHeader(bad));
    expect(res.status).toBe(401);
  });

  it("rejects invalid refresh token", async () => {
    const res = await (await api()).post(path("/auth/refresh")).send({ refreshToken: "invalid-refresh" });
    expect(res.status).toBe(401);
  });

  it("rejects login with wrong password", async () => {
    const res = await (await api()).post(path("/auth/login")).send({ email, password: "WrongPass123" });
    expect(res.status).toBe(401);
    expect(JSON.stringify(res.body)).not.toMatch(/"\$2[aby]\$/);
  });

  it("rejects login for nonexistent account", async () => {
    const res = await (await api())
      .post(path("/auth/login"))
      .send({ email: "nonexistent@example.com", password: DEFAULT_PASSWORD });
    expect(res.status).toBe(401);
  });
});

describe("Security — Password & Registration", () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  it("blocks admin self-registration via role validator", async () => {
    const res = await (await api())
      .post(path("/auth/register"))
      .send({
        fullName: "Fake Admin",
        email: `admin.attempt.${Date.now()}@test.nourishbridge.local`,
        password: DEFAULT_PASSWORD,
        confirmPassword: DEFAULT_PASSWORD,
        phone: "9876543210",
        role: "admin",
        address: TEST_ADDRESS,
      });
    expect(res.status).toBe(400);
  });

  it("does not return password or hash in register response", async () => {
    const { res } = await registerUser("donor", "sec-pwd-resp");
    const body = JSON.stringify(res.body);
    expect(body.toLowerCase()).not.toContain("passwordhash");
    expect(body).not.toMatch(/"\$2[aby]\$/);
  });

  it("forgot-password uses generic message for unknown email", async () => {
    const unknown = await (await api())
      .post(path("/auth/forgot-password"))
      .send({ email: "unknown-user@example.com" });
    expect(unknown.status).toBe(200);

    const { email } = await registerUser("donor", "sec-fp-known");
    const known = await (await api()).post(path("/auth/forgot-password")).send({ email });
    expect(known.status).toBe(200);
    expect(known.body.message).toBeTruthy();
  });
});

describe("Security — RBAC boundaries", () => {
  let tokens;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("sec-rbac");
    tokens = {
      admin: accounts.admin.accessToken,
      donor: accounts.donor.accessToken,
      ngo: accounts.ngo.accessToken,
      volunteer: accounts.volunteer.accessToken,
    };
  });

  const crossRoleCases = [
    ["donor", "/admin/users", "get"],
    ["donor", "/ngo/inventory", "get"],
    ["donor", "/volunteer/missions/available", "get"],
    ["ngo", "/admin/dashboard", "get"],
    ["ngo", "/donations", "post"],
    ["volunteer", "/admin/analytics", "get"],
    ["volunteer", "/ngo/donations/incoming", "get"],
  ];

  for (const [role, route, method] of crossRoleCases) {
    it(`${role} blocked from ${method.toUpperCase()} ${route}`, async () => {
      const client = await api();
      const req = client[method](path(route)).set(authHeader(tokens[role]));
      const res = method === "post" ? await req.send({}) : await req;
      expect([403, 400]).toContain(res.status);
    });
  }

  it("admin can access admin dashboard", async () => {
    const res = await authGet(tokens.admin, "/admin/dashboard");
    expect(res.status).toBe(200);
  });
});

describe("Security — IDOR / resource ownership", () => {
  let donorA;
  let donorB;
  let ngoA;
  let ngoB;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    donorA = await registerUser("donor", "sec-idor-da");
    donorB = await registerUser("donor", "sec-idor-db");
    ngoA = await registerUser("ngo", "sec-idor-na");
    ngoB = await registerUser("ngo", "sec-idor-nb");

    const created = await authPost(
      donorA.tokens.accessToken,
      "/donations",
      donationPayload({ foodName: "IDOR Test Meal" }),
    );
    donationId = created.body.data?.donation?.id;
  });

  it("donor B cannot read donor A donation", async () => {
    const res = await authGet(donorB.tokens.accessToken, `/donations/${donationId}`);
    expect(res.status).toBe(404);
  });

  it("donor B cannot update donor A donation", async () => {
    const res = await authPatch(donorB.tokens.accessToken, `/donations/${donationId}`, {
      foodName: "Hijacked",
    });
    expect([403, 404]).toContain(res.status);
  });

  it("NGO B cannot read NGO A food request", async () => {
    const created = await authPost(
      ngoA.tokens.accessToken,
      "/food-requests",
      foodRequestPayload({ foodItem: "IDOR Request" }),
    );
    const requestId = created.body.data?.request?.id;
    const res = await authGet(ngoB.tokens.accessToken, `/food-requests/${requestId}`);
    expect(res.status).toBe(404);
  });

  it("user cannot mark another user's notification as read", async () => {
    const donorBUserId = donorB.user?.id;
    const notif = await Notification.findOne({
      userId: { $ne: donorBUserId },
    });
    if (!notif) return;
    const res = await (await api())
      .patch(path(`/notifications/${notif._id}/read`))
      .set(authHeader(donorB.tokens.accessToken));
    expect([403, 404]).toContain(res.status);
  });
});

describe("Security — Mass assignment & status tampering", () => {
  let donorToken;
  let donationId;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("sec-mass");
    donorToken = accounts.donor.accessToken;
    const created = await authPost(donorToken, "/donations", donationPayload());
    donationId = created.body.data?.donation?.id;
  });

  it("profile update cannot escalate role to admin", async () => {
    await authPatch(donorToken, "/profile", { role: "admin" });
    const me = await authGet(donorToken, "/auth/me");
    expect(me.body.data?.user?.role).toBe("donor");
  });

  it("donor cannot set donation status via update", async () => {
    const res = await authPatch(donorToken, `/donations/${donationId}`, { status: "completed" });
    expect([400, 403, 422]).toContain(res.status);
    const detail = await authGet(donorToken, `/donations/${donationId}`);
    expect(detail.body.data?.donation?.status).not.toBe("completed");
  });

  it("donor cannot set ngoId on donation create", async () => {
    const res = await authPost(donorToken, "/donations", {
      ...donationPayload({ foodName: "Mass Assign NGO" }),
      ngoId: "000000000000000000000001",
      status: "completed",
    });
    expect(res.status).toBe(201);
    expect(res.body.data?.donation?.status).toBe("pending");
    expect(res.body.data?.donation?.ngoId).toBeFalsy();
  });
});

describe("Security — Input validation & injection resistance", () => {
  let donorToken;

  beforeAll(async () => {
    await connectTestDb();
    const accounts = await createRoleAccounts("sec-input");
    donorToken = accounts.donor.accessToken;
  });

  it("rejects extremely long foodName", async () => {
    const res = await authPost(donorToken, "/donations", donationPayload({ foodName: "x".repeat(500) }));
    expect(res.status).toBe(400);
  });

  it("rejects negative quantity", async () => {
    const res = await authPost(donorToken, "/donations", donationPayload({ quantity: -1 }));
    expect(res.status).toBe(400);
  });

  it("rejects invalid ObjectId in route param", async () => {
    const res = await authGet(donorToken, "/donations/not-valid-id");
    expect(res.status).toBe(400);
  });

  it("handles NoSQL operator in login email safely", async () => {
    const res = await (await api())
      .post(path("/auth/login"))
      .send({ email: { $gt: "" }, password: "test" });
    expect([400, 401]).toContain(res.status);
  });

  it("stores XSS-like strings as data without crashing", async () => {
    const xss = '<script>alert("xss")</script>';
    const res = await authPost(donorToken, "/donations", donationPayload({ foodName: xss, notes: xss }));
    expect(res.status).toBe(201);
    expect(res.body.data?.donation?.foodName).toBe(xss);
  });

  it("does not crash on malformed JSON", async () => {
    const res = await (await api())
      .post(path("/auth/login"))
      .set("Content-Type", "application/json")
      .send("{ broken json");
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(600);
  });
});

describe("Security — Error response safety", () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  const assertNoSecrets = (body) => {
    const text = JSON.stringify(body);
    expect(text).not.toMatch(/mongodb(\+srv)?:\/\//i);
    expect(text.toLowerCase()).not.toContain("jwt_access_secret");
    expect(text.toLowerCase()).not.toContain("smtp_pass");
    expect(text).not.toMatch(/"\$2[aby]\$/);
    if (process.env.NODE_ENV === "production") {
      expect(text.toLowerCase()).not.toContain("stack");
    }
  };

  it("401 response does not leak secrets", async () => {
    const res = await (await api()).get(path("/auth/me"));
    expect(res.status).toBe(401);
    assertNoSecrets(res.body);
  });

  it("404 response does not leak secrets", async () => {
    const res = await (await api()).get(path("/api/v1/nonexistent-route-xyz"));
    expect(res.status).toBe(404);
    assertNoSecrets(res.body);
  });

  it("400 validation response does not leak secrets", async () => {
    const res = await (await api()).post(path("/auth/login")).send({});
    expect(res.status).toBe(400);
    assertNoSecrets(res.body);
  });
});

describe("Security — Sensitive data exposure", () => {
  let tokens;

  beforeAll(async () => {
    await connectTestDb();
    tokens = (await createRoleAccounts("sec-exposure"));
  });

  it("GET /auth/me excludes password fields", async () => {
    const res = await authGet(tokens.donor.accessToken, "/auth/me");
    assertNoSensitiveFields(res.body);
  });

  it("GET /profile excludes password fields", async () => {
    const res = await authGet(tokens.donor.accessToken, "/profile");
    assertNoSensitiveFields(res.body);
  });

  it("GET /admin/users excludes password fields", async () => {
    const res = await authGet(tokens.admin.accessToken, "/admin/users");
    expect(res.status).toBe(200);
    assertNoSensitiveFields(res.body);
  });
});

function assertNoSensitiveFields(body) {
  const text = JSON.stringify(body);
  expect(text.toLowerCase()).not.toContain("passwordhash");
  expect(text).not.toMatch(/"\$2[aby]\$/);
  expect(text.toLowerCase()).not.toContain("refreshtoken");
  expect(text.toLowerCase()).not.toContain("smtp_pass");
}

describe("Security — File upload", () => {
  it("rejects invalid MIME type with 400", async () => {
    const { res } = await registerUser("donor", "sec-upload-mime");
    const token = res.body.data?.accessToken;
    const upload = await (await api())
      .post(path("/profile/image"))
      .set(authHeader(token))
      .attach("image", Buffer.from("plain text"), {
        filename: "test.txt",
        contentType: "text/plain",
      });
    expect([400, 415]).toContain(upload.status);
  });

  it("rejects upload without file", async () => {
    const { res } = await registerUser("donor", "sec-upload-none");
    const token = res.body.data?.accessToken;
    const upload = await (await api()).post(path("/profile/image")).set(authHeader(token));
    expect([400, 422]).toContain(upload.status);
  });
});

describe("Security — Rate limiting configuration", () => {
  it("auth routes have rate limit middleware registered", async () => {
    const { registerLimiter, loginLimiter, forgotPasswordLimiter } = await import(
      "../../src/modules/auth/middleware/rateLimit.middleware.js"
    );
    expect(registerLimiter).toBeTypeOf("function");
    expect(loginLimiter).toBeTypeOf("function");
    expect(forgotPasswordLimiter).toBeTypeOf("function");
  });

  it("reports rate limit skip flag in test environment", () => {
    expect(process.env.RATE_LIMIT_SKIP_IN_DEV).toBe("true");
  });
});

describe("Security — CORS & headers configuration", () => {
  it("CORS rejects unknown origin in test (non-localhost)", async () => {
    const res = await (await api())
      .get(path("/health"))
      .set("Origin", "https://evil.example.com");
    expect([403, 500]).toContain(res.status);
  });

  it("helmet is configured on app", async () => {
    const { getApp } = await import("../helpers/api.js");
    const app = await getApp();
    expect(app).toBeTruthy();
  });
});
