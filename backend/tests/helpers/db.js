import mongoose from "mongoose";
import { ensureTestAdmin } from "./seedAdmin.js";

let connected = false;

export function getTestUri() {
  return (
    process.env.MONGODB_URI_TEST ||
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/nourishbridge_test"
  );
}

export async function connectTestDb() {
  if (connected && mongoose.connection.readyState === 1) return mongoose.connection;
  const uri = getTestUri();
  process.env.MONGODB_URI = uri;
  await mongoose.connect(uri);
  await import("../../src/models/index.js");
  await ensureTestAdmin();
  connected = true;
  return mongoose.connection;
}

export async function disconnectTestDb() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    connected = false;
  }
}
