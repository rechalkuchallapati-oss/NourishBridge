/**
 * Lightweight structured logger — swap for Winston/Pino in production if needed.
 */
const formatMessage = (level, args) => {
  const timestamp = new Date().toISOString();
  const message = args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
    .join(" ");
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
};

const logger = {
  info: (...args) => console.log(formatMessage("info", args)),
  warn: (...args) => console.warn(formatMessage("warn", args)),
  error: (...args) => console.error(formatMessage("error", args)),
  debug: (...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug(formatMessage("debug", args));
    }
  },
};

export default logger;
