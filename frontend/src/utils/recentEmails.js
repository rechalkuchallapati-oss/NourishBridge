const STORAGE_KEY = "nb_recent_emails";
const GOOGLE_ACCOUNTS_KEY = "nb_google_accounts";
const MAX_RECENT = 5;

function readEmails() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function writeEmails(emails) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emails.slice(0, MAX_RECENT)));
}

function readGoogleAccounts() {
  try {
    const stored = localStorage.getItem(GOOGLE_ACCOUNTS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function writeGoogleAccounts(emails) {
  localStorage.setItem(
    GOOGLE_ACCOUNTS_KEY,
    JSON.stringify(emails.slice(0, MAX_RECENT))
  );
}

export function getRecentEmails() {
  return readEmails();
}

export function addRecentEmail(email) {
  const trimmed = email?.trim();
  if (!trimmed) return;

  const normalized = trimmed.toLowerCase();
  const next = [
    trimmed,
    ...readEmails().filter((item) => item.toLowerCase() !== normalized),
  ];

  writeEmails(next);

  if (isGoogleMailAddress(trimmed)) {
    linkGoogleAccount(trimmed);
  }
}

export function removeRecentEmail(email) {
  const normalized = email?.trim().toLowerCase();
  if (!normalized) return;

  writeEmails(
    readEmails().filter((item) => item.toLowerCase() !== normalized)
  );
  writeGoogleAccounts(
    readGoogleAccounts().filter((item) => item.toLowerCase() !== normalized)
  );
}

export function filterRecentEmails(query = "") {
  const trimmed = query.trim().toLowerCase();
  const emails = readEmails();

  if (!trimmed) return emails;

  return emails.filter((email) => email.toLowerCase().includes(trimmed));
}

export function isGoogleMailAddress(email) {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain === "gmail.com" || domain === "googlemail.com";
}

export function linkGoogleAccount(email) {
  const trimmed = email?.trim();
  if (!trimmed || !isGoogleMailAddress(trimmed)) return;

  const normalized = trimmed.toLowerCase();
  const next = [
    trimmed,
    ...readGoogleAccounts().filter((item) => item.toLowerCase() !== normalized),
  ];

  writeGoogleAccounts(next);
}

export function getRecentGoogleAccounts() {
  const linked = readGoogleAccounts();
  if (linked.length > 0) return linked;

  return readEmails().filter(isGoogleMailAddress);
}

export function setActiveGoogleAccount(email) {
  const trimmed = email?.trim();
  if (!trimmed) return;

  sessionStorage.setItem("nb_google_active", trimmed);
  linkGoogleAccount(trimmed);
  addRecentEmail(trimmed);
}

export function getActiveGoogleAccount() {
  return sessionStorage.getItem("nb_google_active") ?? "";
}

/**
 * Opens Google's account chooser without a custom redirect (avoids Error 400).
 * Returns whether the popup was opened successfully.
 */
export function openGoogleAccountChooser(email = "") {
  const trimmed = email.trim();
  let url = "https://accounts.google.com/AccountChooser";

  if (trimmed && isGoogleMailAddress(trimmed)) {
    url += `?Email=${encodeURIComponent(trimmed)}`;
  }

  const popup = window.open(url, "_blank", "noopener,noreferrer");
  return Boolean(popup);
}

export function continueWithGoogleForApp(email) {
  const trimmed = email.trim();

  if (!trimmed || !isGoogleMailAddress(trimmed)) {
    return {
      success: false,
      message: "Use a Gmail address to continue with Google for NourishBridge.",
    };
  }

  setActiveGoogleAccount(trimmed);
  openGoogleAccountChooser(trimmed);

  return {
    success: true,
    email: trimmed,
    message: `Continuing with ${trimmed} for NourishBridge.`,
  };
}

export function openGoogleSignIn(email = "") {
  openGoogleAccountChooser(email);
}
