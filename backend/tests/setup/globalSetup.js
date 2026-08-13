import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const TEST_RUN_ID = process.env.NB_TEST_RUN_ID || `run_${Date.now()}`;
process.env.NB_TEST_RUN_ID = TEST_RUN_ID;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const metaPath = path.resolve(__dirname, ".test-meta.json");

export default async function globalSetup() {
  fs.writeFileSync(metaPath, JSON.stringify({ runId: TEST_RUN_ID }), "utf8");
}

export { TEST_RUN_ID };
