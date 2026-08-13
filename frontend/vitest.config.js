import { defineConfig } from "vitest/config";

const apiBase = process.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api/v1";

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./tests/setup/env.js"],
    include: ["tests/integration/**/*.test.js", "tests/e2e/**/*.test.js"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
    maxConcurrency: 1,
    reporters: ["verbose"],
  },
  define: {
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(apiBase),
    "import.meta.env.DEV": JSON.stringify(false),
    "import.meta.env.PROD": JSON.stringify(true),
    "import.meta.env.MODE": JSON.stringify("test"),
  },
});
