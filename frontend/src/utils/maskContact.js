export function maskEmail(email = "") {
  const trimmed = email.trim();
  const [local, domain] = trimmed.split("@");
  if (!local || !domain) return trimmed;

  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(local.length - 2, 1))}@${domain}`;
}

export function maskPhone(phone = "") {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;

  return `${"*".repeat(Math.max(digits.length - 4, 0))}${digits.slice(-4)}`;
}

export function maskContact({ email, phone } = {}) {
  if (email) return maskEmail(email);
  if (phone) return maskPhone(phone);
  return "your contact";
}
