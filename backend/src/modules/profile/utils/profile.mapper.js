import { USER_ROLES } from "../../../constants/enums.js";

function formatAddress(address) {
  if (!address) return null;

  return {
    line1: address.line1,
    line2: address.line2 || "",
    city: address.city,
    state: address.state || "",
    pincode: address.pincode || "",
    country: address.country || "India",
  };
}

function addressToSingleLine(address) {
  if (!address) return "";
  return [address.line1, address.line2, address.city, address.state, address.pincode]
    .filter(Boolean)
    .join(", ");
}

export function mapCommonProfile(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    profileImage: user.profileImage,
    address: formatAddress(user.address),
    city: user.address?.city || "",
    role: user.role,
    status: user.status,
    verificationStatus: user.verificationStatus,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function mapDonorProfile(donor) {
  if (!donor) return null;

  return {
    id: donor._id,
    donorType: donor.donorType,
    organizationName: donor.organizationName || "",
    contactPerson: donor.contactPerson || "",
    businessLicense: donor.businessLicense || "",
    verificationStatus: donor.verificationStatus,
    tier: donor.tier,
    pickupLocations: donor.pickupLocations || [],
    statistics: {
      totalDonations: donor.totalDonations,
      mealsContributed: donor.mealsContributed,
      avgQuantityKg: donor.avgQuantityKg,
      rating: donor.rating,
      lastDonationAt: donor.lastDonationAt,
    },
    isRecurring: donor.isRecurring,
    preferredPickupTime: donor.preferredPickupTime || "",
    isActive: donor.isActive,
    createdAt: donor.createdAt,
    updatedAt: donor.updatedAt,
  };
}

export function mapNgoProfile(ngo, user) {
  if (!ngo) return null;

  return {
    id: ngo._id,
    organizationName: ngo.ngoName,
    ngoName: ngo.ngoName,
    registrationNumber: ngo.registrationNumber,
    registrationId: ngo.registrationNumber,
    address: addressToSingleLine(ngo.address || user?.address),
    structuredAddress: formatAddress(ngo.address || user?.address),
    serviceAreas: ngo.serviceAreas || [],
    dailyBeneficiaryCapacity: ngo.dailyBeneficiaryCapacity,
    maxDailyCapacityKg: ngo.maxDailyCapacityKg,
    maxDailyMeals: ngo.maxDailyMeals,
    foodTypesAccepted: ngo.foodTypesAccepted || [],
    foodRequirements: ngo.foodRequirements || "",
    verificationDocuments: ngo.verificationDocuments || [],
    verificationStatus: ngo.verificationStatus,
    status: ngo.status,
    coldStorageCapacityKg: ngo.coldStorageCapacityKg,
    dryStorageCapacityKg: ngo.dryStorageCapacityKg,
    utilizationPercent: ngo.utilizationPercent,
    preferredPickupRadiusKm: ngo.preferredPickupRadiusKm,
    operatingHours: ngo.operatingHours || "",
    emergencyContactName: ngo.emergencyContactName || "",
    emergencyContact: ngo.emergencyContact || "",
    availabilityStatus: ngo.availabilityStatus,
    storageFacilities: ngo.storageFacilities || [],
    mission: ngo.mission || "",
    website: ngo.website || "",
    logoUrl: ngo.logoUrl || "",
    contactPerson: ngo.contactPerson || user?.fullName || "",
    contactPhone: ngo.contactPhone || user?.phone || "",
    email: user?.email || "",
    phone: user?.phone || "",
    mealsServed: ngo.mealsServed,
    rating: ngo.rating,
    createdAt: ngo.createdAt,
    updatedAt: ngo.updatedAt,
  };
}

export function mapVolunteerProfile(volunteer, user) {
  if (!volunteer) return null;

  return {
    id: volunteer._id,
    vehicleType: volunteer.vehicleType,
    vehicleDetails: volunteer.vehicleDetails || "",
    vehicle: volunteer.vehicleDetails || volunteer.vehicleType,
    availability: volunteer.availability,
    availabilitySchedule: volunteer.availabilitySchedule || [],
    isAvailable: volunteer.isAvailable,
    serviceAreas: volunteer.serviceAreas || [],
    serviceRadiusKm: volunteer.serviceRadiusKm,
    city: user?.address?.city || "",
    verificationDocuments: volunteer.verificationDocuments || [],
    verificationStatus: volunteer.verificationStatus,
    completedMissions: volunteer.completedMissions,
    rating: volunteer.rating,
    successRate: volunteer.successRate,
    maxCapacityKg: volunteer.maxCapacityKg,
    licenseNumber: volunteer.licenseNumber || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    isActive: volunteer.isActive,
    lastActiveAt: volunteer.lastActiveAt,
    createdAt: volunteer.createdAt,
    updatedAt: volunteer.updatedAt,
  };
}

export function mapAdminProfile(admin) {
  if (!admin) return null;

  return {
    id: admin._id,
    adminLevel: admin.adminLevel,
    permissions: admin.permissions || [],
    department: admin.department || "",
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
}

export function mapFullProfile(user, roleProfile) {
  const common = mapCommonProfile(user);

  let role = null;
  switch (user.role) {
    case USER_ROLES.DONOR:
      role = mapDonorProfile(roleProfile);
      break;
    case USER_ROLES.NGO:
      role = mapNgoProfile(roleProfile, user);
      break;
    case USER_ROLES.VOLUNTEER:
      role = mapVolunteerProfile(roleProfile, user);
      break;
    case USER_ROLES.ADMIN:
      role = mapAdminProfile(roleProfile);
      break;
    default:
      role = null;
  }

  return { common, roleProfile: role };
}

export default {
  mapFullProfile,
  mapCommonProfile,
  mapDonorProfile,
  mapNgoProfile,
  mapVolunteerProfile,
  mapAdminProfile,
};
