import { defineConfig } from "vitest/config";

// Test environment — must be set before any src/ imports load config
process.env.NODE_ENV = "test";
process.env.RATE_LIMIT_SKIP_IN_DEV = "true";
process.env.MONGODB_URI =
  process.env.MONGODB_URI_TEST || "mongodb://127.0.0.1:27017/nourishbridge_test";
process.env.JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET || "test-access-secret-minimum-32-characters-long";
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "test-refresh-secret-minimum-32-characters-long";
process.env.OTP_SECRET = process.env.OTP_SECRET || "test-otp-secret-minimum-32-characters-long";
process.env.JWT_ACCESS_EXPIRES_IN = "15m";
process.env.JWT_REFRESH_EXPIRES_IN = "7d";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup/env.js"],
    globalSetup: ["./tests/setup/globalSetup.js"],
    globalTeardown: ["./tests/setup/globalTeardown.js"],
    include: ["tests/**/*.test.js"],
    exclude: ["tests/setup/**", "node_modules/**"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
    maxConcurrency: 1,
    reporters: ["verbose"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      include: ["src/**/*.js"],
      exclude: [
        "src/models/index.js",
        "src/**/*.routes.js",
        "src/constants/**",
      ],
    },
  },
});
