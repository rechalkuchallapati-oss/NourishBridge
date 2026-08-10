import profileApi from "../api/client.js";
import API_CONFIG from "../../../config/api.js";
import { DONOR_TYPES } from "../../../constants/roles.js";

/** Resolve a backend-relative profile image path to a full URL. */
export function resolveProfileImageUrl(imagePath) {
  if (!imagePath) return null;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  const apiOrigin = API_CONFIG.baseURL.replace(/\/api\/v1\/?$/, "");
  const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${apiOrigin}${normalizedPath}`;
}

const DONOR_LABEL_TO_ID = Object.fromEntries(
  DONOR_TYPES.map(({ id, label }) => [label, id]),
);

const DONOR_ID_TO_LABEL = Object.fromEntries(
  DONOR_TYPES.map(({ id, label }) => [id, label]),
);

/** Map backend donor type id to UI label */
export function donorTypeToLabel(typeId) {
  return DONOR_ID_TO_LABEL[typeId] || typeId || "Individual";
}

/** Map UI label to backend donor type id */
export function donorTypeToId(labelOrId) {
  if (DONOR_ID_TO_LABEL[labelOrId]) return labelOrId;
  return DONOR_LABEL_TO_ID[labelOrId] || "individual";
}

export function profileToDonorForm(profile) {
  const { common, roleProfile } = profile;

  return {
    fullName: common.fullName || "",
    email: common.email || "",
    phone: common.phone || "",
    organization: roleProfile?.organizationName || "",
    donorType: donorTypeToLabel(roleProfile?.donorType),
    contactPerson: roleProfile?.contactPerson || "",
    profileImage: common.profileImage || "",
  };
}

export function donorFormToPayload(form, addresses = []) {
  return {
    common: {
      fullName: form.fullName,
      phone: form.phone,
    },
    roleProfile: {
      organizationName: form.organization,
      donorType: donorTypeToId(form.donorType),
      contactPerson: form.contactPerson,
      pickupLocations: addresses.map((line, index) => ({
        label: index === 0 ? "Primary" : `Location ${index + 1}`,
        addressLine: line,
        isDefault: index === 0,
      })),
    },
  };
}

export function pickupLocationsToAddresses(pickupLocations = []) {
  return pickupLocations.map((loc) => loc.addressLine || loc.label || "").filter(Boolean);
}

export function profileToNgoForm(profile) {
  const { common, roleProfile } = profile;

  return {
    organizationName: roleProfile?.organizationName || roleProfile?.ngoName || "",
    registrationId: roleProfile?.registrationId || roleProfile?.registrationNumber || "",
    email: common.email || roleProfile?.email || "",
    phone: common.phone || roleProfile?.contactPhone || "",
    address: roleProfile?.address || "",
    serviceAreas: roleProfile?.serviceAreas || [],
    foodTypesAccepted: roleProfile?.foodTypesAccepted || [],
    maxDailyCapacityKg: roleProfile?.maxDailyCapacityKg ?? 0,
    maxDailyMeals: roleProfile?.maxDailyMeals ?? 0,
    storageFacilities: roleProfile?.storageFacilities || [],
    hasRefrigerator: (roleProfile?.coldStorageCapacityKg ?? 0) > 0,
    refrigeratorCapacityKg: roleProfile?.coldStorageCapacityKg ?? 0,
    operatingHours: roleProfile?.operatingHours || "",
    emergencyContact: roleProfile?.emergencyContact || "",
    emergencyContactName: roleProfile?.emergencyContactName || "",
    preferredPickupRadiusKm: roleProfile?.preferredPickupRadiusKm ?? 0,
    availabilityStatus: roleProfile?.availabilityStatus || "available",
  };
}

export function ngoFormToPayload(form) {
  return {
    common: {
      fullName: form.organizationName,
      phone: form.phone,
    },
    roleProfile: {
      organizationName: form.organizationName,
      registrationId: form.registrationId,
      address: form.address,
      serviceAreas: form.serviceAreas,
      foodTypesAccepted: form.foodTypesAccepted,
      maxDailyCapacityKg: Number(form.maxDailyCapacityKg) || 0,
      maxDailyMeals: Number(form.maxDailyMeals) || 0,
      storageFacilities: form.storageFacilities,
      preferredPickupRadiusKm: Number(form.preferredPickupRadiusKm) || 0,
      operatingHours: form.operatingHours,
      emergencyContact: form.emergencyContact,
      emergencyContactName: form.emergencyContactName,
      availabilityStatus: form.availabilityStatus,
      coldStorageCapacityKg: form.hasRefrigerator
        ? Number(form.refrigeratorCapacityKg) || 0
        : 0,
    },
  };
}

export function profileToVolunteerForm(profile) {
  const { common, roleProfile } = profile;

  return {
    fullName: common.fullName || "",
    email: common.email || "",
    phone: common.phone || "",
    city: roleProfile?.city || common.address?.city || "",
    vehicle: roleProfile?.vehicleDetails || roleProfile?.vehicle || "",
    serviceRadiusKm: roleProfile?.serviceRadiusKm ?? 10,
    availability: roleProfile?.availabilitySchedule || [],
    isAvailable: roleProfile?.isAvailable ?? true,
    profileImage: common.profileImage || "",
  };
}

export function volunteerFormToPayload(form) {
  return {
    common: {
      fullName: form.fullName,
      phone: form.phone,
    },
    roleProfile: {
      vehicleDetails: form.vehicle,
      availabilitySchedule: form.availability,
      isAvailable: form.isAvailable,
      serviceRadiusKm: Number(form.serviceRadiusKm) || 10,
      city: form.city,
    },
  };
}

export function profileToAdminForm(profile) {
  const { common, roleProfile } = profile;

  return {
    fullName: common.fullName || "",
    email: common.email || "",
    phone: common.phone || "",
    role: common.role || "admin",
    adminLevel: roleProfile?.adminLevel || "admin",
    permissions: roleProfile?.permissions || [],
    department: roleProfile?.department || "",
    lastLoginAt: common.updatedAt || "",
    status: common.status || "active",
  };
}

export function adminFormToPayload(form) {
  return {
    common: {
      fullName: form.fullName,
      phone: form.phone,
    },
    roleProfile: {
      department: form.department,
    },
  };
}

export async function fetchProfile() {
  const { data } = await profileApi.getProfile();
  return data.data.profile;
}

export async function saveProfile(payload) {
  const { data } = await profileApi.updateProfile(payload);
  return data.data.profile;
}

export async function fetchProfileImpact() {
  const { data } = await profileApi.getImpact();
  return data.data;
}

export async function uploadProfileImage(file) {
  const { data } = await profileApi.uploadImage(file);
  return data.data;
}

export default {
  fetchProfile,
  saveProfile,
  fetchProfileImpact,
  uploadProfileImage,
  resolveProfileImageUrl,
  profileToDonorForm,
  donorFormToPayload,
  pickupLocationsToAddresses,
  profileToNgoForm,
  ngoFormToPayload,
  profileToVolunteerForm,
  volunteerFormToPayload,
  profileToAdminForm,
  adminFormToPayload,
};
