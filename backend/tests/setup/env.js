/**
 * Per-file setup — ensures test env is active before test modules load.
 */
process.env.NODE_ENV = "test";
process.env.RATE_LIMIT_SKIP_IN_DEV = "true";
