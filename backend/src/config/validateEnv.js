/**
 * Fail fast when required secrets or production settings are missing.
 */
const DEV_PLACEHOLDER_SECRETS = new Set([
  "dev-access-secret-change-in-production",
  "dev-refresh-secret-change-in-production",
  "dev-otp-secret-change-in-production",
]);

const MIN_SECRET_LENGTH = 32;

function assertSecret(name, value, errors, isProduction) {
  if (!value) {
    errors.push(`${name} is required`);
    return;
  }

  if (isProduction) {
    if (DEV_PLACEHOLDER_SECRETS.has(value)) {
      errors.push(`${name} must not use the development placeholder in production`);
    }
    if (value.length < MIN_SECRET_LENGTH) {
      errors.push(`${name} must be at least ${MIN_SECRET_LENGTH} characters in production`);
    }
  }
}

export function validateEnv(config) {
  const errors = [];
  const { isProduction } = config;

  if (!config.mongodb.uri) {
    errors.push("MONGODB_URI is required");
  }

  assertSecret("JWT_ACCESS_SECRET", config.jwt.accessSecret, errors, isProduction);
  assertSecret("JWT_REFRESH_SECRET", config.jwt.refreshSecret, errors, isProduction);
  assertSecret("OTP_SECRET", config.otp.secret, errors, isProduction);

  if (isProduction && config.cors.origins.length === 0) {
    errors.push("CORS_ORIGIN must include at least one allowed origin in production");
  }

  if (isProduction && !config.email.smtp.host) {
    errors.push("SMTP_HOST is required in production for password reset emails");
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n- ${errors.join("\n- ")}`);
  }
}

export default validateEnv;
