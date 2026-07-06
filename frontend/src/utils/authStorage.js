import { ROLE_DASHBOARD_ROUTES } from "../constants/routes";
import { VOLUNTEER_IDENTITY } from "../data/volunteerAssets";

const USER_KEY = "nb_user";
const PROFILE_KEY = "nb_donor_profile";
const NGO_PROFILE_KEY = "nb_ngo_profile";
const VOLUNTEER_PROFILE_KEY = "nb_volunteer_profile";
const REGISTERED_USERS_KEY = "nb_registered_users";
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

export function getNgoDisplayName(user) {
  const profile = getNgoProfile();
  const source = user ?? getSessionUser();

  if (profile.organizationName?.trim()) return profile.organizationName.trim();
  if (source?.organization?.trim()) return source.organization.trim();
  if (source?.fullName?.trim()) return source.fullName.trim();
  if (source?.email) return source.email.split("@")[0];
  return "Helping Hands Foundation";
}

export function getVolunteerDisplayName(user) {
  const profile = getVolunteerProfile();
  const source = user ?? getSessionUser();

  if (profile.fullName?.trim()) return profile.fullName.trim().split(" ")[0];
  if (source?.fullName?.trim()) return source.fullName.trim().split(" ")[0];
  if (source?.email) return source.email.split("@")[0];
  return "Ravi";
}

export function getVolunteerProfile() {
  const session = getSessionUser() ?? {};

  try {
    const stored = localStorage.getItem(VOLUNTEER_PROFILE_KEY);
    const saved = stored ? JSON.parse(stored) : {};
    return {
      fullName: saved.fullName ?? session.fullName ?? "Ravi Kumar",
      email: saved.email ?? session.email ?? "",
      phone: saved.phone ?? session.phone ?? "",
      city: saved.city ?? "Hyderabad",
      serviceRadiusKm: saved.serviceRadiusKm ?? 10,
      vehicle: saved.vehicle ?? "Bike — KA 05 VL 4521",
      availability: saved.availability ?? ["Weekday Afternoons", "Weekend Mornings"],
      isAvailable: saved.isAvailable ?? true,
      volunteerId: saved.volunteerId ?? VOLUNTEER_IDENTITY.volunteerId,
      avatarId: saved.avatarId ?? "primary",
      customAvatarDataUrl: saved.customAvatarDataUrl ?? null,
    };
  } catch {
    return {
      fullName: session.fullName ?? "Ravi Kumar",
      email: session.email ?? "",
      phone: session.phone ?? "",
      city: "Hyderabad",
      serviceRadiusKm: 10,
      vehicle: "Bike — KA 05 VL 4521",
      availability: ["Weekday Afternoons"],
      isAvailable: true,
      volunteerId: VOLUNTEER_IDENTITY.volunteerId,
      avatarId: "primary",
      customAvatarDataUrl: null,
    };
  }
}

export function saveVolunteerProfile(profile) {
  localStorage.setItem(VOLUNTEER_PROFILE_KEY, JSON.stringify(profile));
  const session = getSessionUser() ?? {};
  setSessionUser({
    ...session,
    fullName: profile.fullName ?? session.fullName,
    role: session.role ?? "volunteer",
  });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nb-volunteer-profile-updated"));
  }
}

export function getNgoProfile() {
  try {
    const stored = localStorage.getItem(NGO_PROFILE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveNgoProfile(profile) {
  localStorage.setItem(NGO_PROFILE_KEY, JSON.stringify(profile));
  const session = getSessionUser() ?? {};
  setSessionUser({ ...session, organization: profile.organizationName ?? session.organization });
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

function normalizeEmail(email) {
  return email?.trim().toLowerCase() ?? "";
}

export function getRegisteredUser(email) {
  const key = normalizeEmail(email);
  if (!key) return null;

  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    const users = stored ? JSON.parse(stored) : {};
    return users[key] ?? null;
  } catch {
    return null;
  }
}

export function saveRegisteredUser(user) {
  const key = normalizeEmail(user?.email);
  if (!key) return;

  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    const users = stored ? JSON.parse(stored) : {};
    users[key] = { ...users[key], ...user, email: user.email.trim() };
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch {
    /* ignore storage errors in demo mode */
  }
}

export function getSessionRole() {
  return getSessionUser()?.role ?? null;
}

export function getDashboardRouteForRole(role) {
  return ROLE_DASHBOARD_ROUTES[role] ?? ROLE_DASHBOARD_ROUTES.donor;
}

export function completeAuthSession(contact) {
  const registered = contact.email ? getRegisteredUser(contact.email) : null;
  const role =
    contact.role ||
    registered?.role ||
    (typeof window !== "undefined"
      ? sessionStorage.getItem("nb_pending_signup_role")
      : null) ||
    "donor";

  const sessionUser = {
    email: contact.email ?? registered?.email ?? "",
    phone: contact.phone ?? registered?.phone ?? "",
    fullName: contact.fullName ?? registered?.fullName ?? "",
    role,
    organization: contact.organization ?? contact.organizationName ?? registered?.organization ?? "",
  };

  setSessionUser(sessionUser);
  saveRegisteredUser(sessionUser);

  if (role === "ngo") {
    saveNgoProfile({
      organizationName: contact.organizationName ?? contact.organization ?? "",
      registrationId: contact.registrationId ?? "",
      address: contact.address ?? "",
      serviceAreas: contact.serviceAreas ?? [],
      email: contact.email ?? "",
      phone: contact.phone ?? "",
    });
  }

  if (role === "donor") {
    saveDonorProfile({
      fullName: contact.fullName ?? "",
      email: contact.email ?? "",
      phone: contact.phone ?? "",
      donorType: contact.donorType ?? "Individual",
    });
  }

  if (role === "volunteer") {
    saveVolunteerProfile({
      fullName: contact.fullName ?? "Ravi Kumar",
      email: contact.email ?? "",
      phone: contact.phone ?? "",
      city: contact.city ?? "Hyderabad",
      serviceRadiusKm: Number(contact.serviceRadiusKm) || 10,
      vehicle: "Bike",
      availability: contact.availability?.length ? contact.availability : ["Weekday Afternoons"],
      isAvailable: true,
      volunteerId: VOLUNTEER_IDENTITY.volunteerId,
      avatarId: "primary",
    });
  }

  return getDashboardRouteForRole(role);
}
