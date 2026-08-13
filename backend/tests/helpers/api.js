import supertest from "supertest";
import { connectTestDb } from "./db.js";
import { API_PREFIX } from "./constants.js";

let appInstance = null;

export async function getApp() {
  if (!appInstance) {
    await connectTestDb();
    const { default: createApp } = await import("../../src/app.js");
    appInstance = createApp();
  }
  return appInstance;
}

export async function api() {
  const app = await getApp();
  return supertest(app);
}

export function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

export function path(segment) {
  return `${API_PREFIX}${segment}`;
}
