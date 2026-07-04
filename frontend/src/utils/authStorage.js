const USER_KEY = "nb_user";
const PROFILE_KEY = "nb_donor_profile";
const SETTINGS_KEY = "nb_donor_settings";
const ADDRESSES_KEY = "nb_saved_addresses";

const DEFAULT_SETTINGS = {
  emailNotifications: true,
  smsNotifications: true,
  pickupReminders: true,
  foodSafetyAlerts: true,
  ngoUpdates: true,
  weeklyImpactSummary: false,
  volunteerUpdates: true,
  deliveryConfirmations: true,
  donationStatusUpdates: true,
  autoSaveDonationDrafts: true,
  showImpactSummary: true,
  privacyHidePhone: false,
};

export function setSessionUser(user) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getSessionUser() {
  try {
    const stored = sessionStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function clearSessionUser() {
  sessionStorage.removeItem(USER_KEY);
}

export function getDonorDisplayName(user) {
  const profile = getDonorProfile();
  const source = user ?? getSessionUser();

  if (profile.fullName?.trim()) return profile.fullName.trim().split(" ")[0];
  if (source?.fullName?.trim()) return source.fullName.trim().split(" ")[0];
  if (source?.email) return source.email.split("@")[0];
  return "Donor";
}

export function getDonorProfile() {
  const session = getSessionUser() ?? {};

  try {
    const stored = localStorage.getItem(PROFILE_KEY);
    const saved = stored ? JSON.parse(stored) : {};
    return {
      fullName: saved.fullName ?? session.fullName ?? "",
      email: saved.email ?? session.email ?? "",
      phone: saved.phone ?? session.phone ?? "",
      organization: saved.organization ?? "",
      donorType: saved.donorType ?? "Individual",
      contactPerson: saved.contactPerson ?? "",
    };
  } catch {
    return {
      fullName: session.fullName ?? "",
      email: session.email ?? "",
      phone: session.phone ?? "",
      organization: "",
      donorType: "Individual",
      contactPerson: "",
    };
  }
}

export function saveDonorProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  setSessionUser({ ...getSessionUser(), ...profile });
}

export function getSavedAddresses() {
  try {
    const stored = localStorage.getItem(ADDRESSES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSavedAddresses(addresses) {
  localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
}

export function getDonorSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveDonorSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function logoutDonor() {
  clearSessionUser();
}
