import { describe, it, expect, beforeAll } from "vitest";
import jwt from "jsonwebtoken";
import config from "../../src/config/index.js";
import { api, path, authHeader } from "../helpers/api.js";
import { registerUser, loginUser } from "../helpers/auth.js";
import { testEmail } from "../helpers/constants.js";
import { connectTestDb } from "../helpers/db.js";

describe("Auth — JWT & Session", () => {
  let accessToken;
  let refreshToken;
  let userId;
  const email = testEmail("donor", "jwt");

  beforeAll(async () => {
    await connectTestDb();
    const reg = await registerUser("donor", "jwt", { email });
    accessToken = reg.tokens.accessToken;
    refreshToken = reg.tokens.refreshToken;
    userId = reg.user?.id;
  });

  it("accepts valid access token on GET /auth/me", async () => {
    const res = await (await api()).get(path("/auth/me")).set(authHeader(accessToken));
    expect(res.status).toBe(200);
    expect(res.body.data?.user?.email).toBe(email.toLowerCase());
  });

  it("returns 401 when token is missing", async () => {
    const res = await (await api()).get(path("/auth/me"));
    expect(res.status).toBe(401);
  });

  it("returns 401 for malformed token", async () => {
    const res = await (await api()).get(path("/auth/me")).set(authHeader("not.a.valid.jwt"));
    expect(res.status).toBe(401);
  });

  it("returns 401 for token signed with wrong secret", async () => {
    const bad = jwt.sign({ sub: userId, type: "access" }, "wrong-secret-minimum-32-characters-long", {
      expiresIn: "15m",
    });
    const res = await (await api()).get(path("/auth/me")).set(authHeader(bad));
    expect(res.status).toBe(401);
  });

  it("returns 401 for expired access token", async () => {
    const expired = jwt.sign(
      { sub: userId, type: "access", email, role: "donor" },
      config.jwt.accessSecret,
      { expiresIn: "-1s" },
    );
    const res = await (await api()).get(path("/auth/me")).set(authHeader(expired));
    expect(res.status).toBe(401);
  });

  it("refreshes tokens with valid refresh token", async () => {
    const res = await (await api()).post(path("/auth/refresh")).send({ refreshToken });
    expect(res.status).toBe(200);
    expect(res.body.data?.accessToken).toBeTruthy();
    expect(res.body.data?.refreshToken).toBeTruthy();
  });

  it("revokes refresh token on logout", async () => {
    const login = await loginUser(email);
    const rt = login.refreshToken;
    const logout = await (await api()).post(path("/auth/logout")).send({ refreshToken: rt });
    expect(logout.status).toBe(200);

    const refresh = await (await api()).post(path("/auth/refresh")).send({ refreshToken: rt });
    expect(refresh.status).toBe(401);
  });

  it("access token remains valid until expiry after logout (stateless JWT)", async () => {
    const login = await loginUser(email);
    await (await api()).post(path("/auth/logout")).send({ refreshToken: login.refreshToken });
    const me = await (await api()).get(path("/auth/me")).set(authHeader(login.accessToken));
    expect(me.status).toBe(200);
  });
});
