/**
 * Session timing constants — single place to tune persistence behaviour.
 */
export const SESSION_CHECK_INTERVAL_MS = 30_000;

/** Refresh access token this many seconds before it expires */
export const TOKEN_REFRESH_BUFFER_SECONDS = 60;

/** Minimum gap between proactive refresh attempts */
export const MIN_REFRESH_INTERVAL_MS = 10_000;

export default {
  SESSION_CHECK_INTERVAL_MS,
  TOKEN_REFRESH_BUFFER_SECONDS,
  MIN_REFRESH_INTERVAL_MS,
};
