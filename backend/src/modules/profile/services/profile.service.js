import User from "../../../models/User.model.js";
import Donor from "../../../models/Donor.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import NGO from "../../../models/NGO.model.js";
import Admin from "../../../models/Admin.model.js";
import Donation from "../../../models/Donation.model.js";
import ApiError from "../../../utils/ApiError.js";
import { USER_ROLES } from "../../../constants/enums.js";
import {
  findUserProfile,
  findRoleProfile,
  ensureRoleProfile,
} from "../utils/profile.repository.js";
import { mapFullProfile } from "../utils/profile.mapper.js";

function applyUserUpdates(user, payload = {}) {
  const { fullName, phone, profileImage, address } = payload;

  if (fullName !== undefined) user.fullName = fullName;
  if (phone !== undefined) user.phone = phone;
  if (profileImage !== undefined) user.profileImage = profileImage;

  if (address) {
    user.address = {
      ...user.address?.toObject?.() || user.address || {},
      ...address,
    };
  }
}

async function applyDonorUpdates(donor, payload = {}) {
  const {
    donorType,
    organizationName,
    contactPerson,
    businessLicense,
    preferredPickupTime,
    isRecurring,
    pickupLocations,
  } = payload;

  if (donorType !== undefined) donor.donorType = donorType;
  if (organizationName !== undefined) donor.organizationName = organizationName;
  if (contactPerson !== undefined) donor.contactPerson = contactPerson;
  if (businessLicense !== undefined) donor.businessLicense = businessLicense;
  if (preferredPickupTime !== undefined) donor.preferredPickupTime = preferredPickupTime;
  if (isRecurring !== undefined) donor.isRecurring = isRecurring;
  if (pickupLocations !== undefined) donor.pickupLocations = pickupLocations;

  await donor.save();
}

async function applyNgoUpdates(ngo, user, payload = {}) {
  const {
    ngoName,
    organizationName,
    registrationNumber,
    registrationId,
    address,
    structuredAddress,
    serviceAreas,
    dailyBeneficiaryCapacity,
    maxDailyCapacityKg,
    maxDailyMeals,
    foodTypesAccepted,
    foodRequirements,
    preferredPickupRadiusKm,
    operatingHours,
    emergencyContactName,
    emergencyContact,
    availabilityStatus,
    storageFacilities,
    mission,
    website,
    contactPerson,
    contactPhone,
    coldStorageCapacityKg,
  } = payload;

  if (ngoName !== undefined || organizationName !== undefined) {
    ngo.ngoName = ngoName || organizationName;
  }
  if (registrationNumber !== undefined || registrationId !== undefined) {
    ngo.registrationNumber = (registrationNumber || registrationId).toUpperCase();
  }
  if (structuredAddress) {
    ngo.address = structuredAddress;
  } else if (address && typeof address === "string") {
    ngo.address = {
      ...(ngo.address?.toObject?.() || ngo.address || user.address?.toObject?.() || user.address || {}),
      line1: address,
    };
  }
  if (serviceAreas !== undefined) ngo.serviceAreas = serviceAreas;
  if (dailyBeneficiaryCapacity !== undefined) ngo.dailyBeneficiaryCapacity = dailyBeneficiaryCapacity;
  if (maxDailyCapacityKg !== undefined) ngo.maxDailyCapacityKg = maxDailyCapacityKg;
  if (maxDailyMeals !== undefined) ngo.maxDailyMeals = maxDailyMeals;
  if (foodTypesAccepted !== undefined) ngo.foodTypesAccepted = foodTypesAccepted;
  if (foodRequirements !== undefined) ngo.foodRequirements = foodRequirements;
  if (preferredPickupRadiusKm !== undefined) ngo.preferredPickupRadiusKm = preferredPickupRadiusKm;
  if (operatingHours !== undefined) ngo.operatingHours = operatingHours;
  if (emergencyContactName !== undefined) ngo.emergencyContactName = emergencyContactName;
  if (emergencyContact !== undefined) ngo.emergencyContact = emergencyContact;
  if (availabilityStatus !== undefined) ngo.availabilityStatus = availabilityStatus;
  if (storageFacilities !== undefined) ngo.storageFacilities = storageFacilities;
  if (mission !== undefined) ngo.mission = mission;
  if (website !== undefined) ngo.website = website;
  if (contactPerson !== undefined) ngo.contactPerson = contactPerson;
  if (contactPhone !== undefined) ngo.contactPhone = contactPhone;
  if (coldStorageCapacityKg !== undefined) ngo.coldStorageCapacityKg = coldStorageCapacityKg;

  await ngo.save();
}

async function applyVolunteerUpdates(volunteer, user, payload = {}) {
  const {
    vehicleType,
    vehicleDetails,
    vehicle,
    availabilitySchedule,
    isAvailable,
    serviceAreas,
    serviceRadiusKm,
    licenseNumber,
    city,
  } = payload;

  if (vehicleType !== undefined) volunteer.vehicleType = vehicleType;
  if (vehicleDetails !== undefined || vehicle !== undefined) {
    volunteer.vehicleDetails = vehicleDetails || vehicle;
  }
  if (availabilitySchedule !== undefined) volunteer.availabilitySchedule = availabilitySchedule;
  if (isAvailable !== undefined) {
    volunteer.isAvailable = isAvailable;
    volunteer.availability = isAvailable ? "available" : "offline";
  }
  if (serviceAreas !== undefined) volunteer.serviceAreas = serviceAreas;
  if (serviceRadiusKm !== undefined) volunteer.serviceRadiusKm = serviceRadiusKm;
  if (licenseNumber !== undefined) volunteer.licenseNumber = licenseNumber;

  if (city !== undefined && user?.address) {
    user.address.city = city;
    await user.save();
  }

  await volunteer.save();
}

async function applyAdminUpdates(admin, payload = {}) {
  const { adminLevel, permissions, department } = payload;

  if (adminLevel !== undefined) admin.adminLevel = adminLevel;
  if (permissions !== undefined) admin.permissions = permissions;
  if (department !== undefined) admin.department = department;

  await admin.save();
}

export async function getProfile(userId) {
  const user = await findUserProfile(userId);
  let roleProfile = await findRoleProfile(user);

  if (user.role === USER_ROLES.ADMIN && !roleProfile) {
    roleProfile = await ensureRoleProfile(user);
  }

  if (!roleProfile && user.role !== USER_ROLES.ADMIN) {
    throw ApiError.notFound(`Profile not found for role: ${user.role}`);
  }

  return mapFullProfile(user, roleProfile);
}

export async function updateProfile(userId, payload = {}) {
  const user = await findUserProfile(userId);
  let roleProfile = await findRoleProfile(user);

  if (!roleProfile) {
    if (user.role === USER_ROLES.ADMIN) {
      roleProfile = await ensureRoleProfile(user);
    } else {
      throw ApiError.notFound(`Profile not found for role: ${user.role}`);
    }
  }

  applyUserUpdates(user, payload.common || payload);
  await user.save();

  const rolePayload = payload.roleProfile || payload;

  switch (user.role) {
    case USER_ROLES.DONOR:
      await applyDonorUpdates(roleProfile, rolePayload);
      break;
    case USER_ROLES.NGO:
      await applyNgoUpdates(roleProfile, user, rolePayload);
      break;
    case USER_ROLES.VOLUNTEER:
      await applyVolunteerUpdates(roleProfile, user, rolePayload);
      break;
    case USER_ROLES.ADMIN:
      await applyAdminUpdates(roleProfile, rolePayload);
      break;
    default:
      break;
  }

  const refreshedUser = await findUserProfile(userId);
  const refreshedRole = await findRoleProfile(refreshedUser);

  return mapFullProfile(refreshedUser, refreshedRole);
}

export async function updateProfileImage(userId, imageUrl) {
  const user = await findUserProfile(userId);
  user.profileImage = imageUrl;
  await user.save();

  const roleProfile = await findRoleProfile(user);
  return mapFullProfile(user, roleProfile);
}

export async function getProfileImpact(userId) {
  const user = await findUserProfile(userId);
  const roleProfile = await findRoleProfile(user);

  if (!roleProfile && user.role !== USER_ROLES.ADMIN) {
    throw ApiError.notFound(`Profile not found for role: ${user.role}`);
  }

  switch (user.role) {
    case USER_ROLES.DONOR: {
      const [activeDonations, completedDonations] = await Promise.all([
        Donation.countDocuments({
          donorId: roleProfile._id,
          status: { $nin: ["completed", "cancelled", "rejected", "expired"] },
        }),
        Donation.countDocuments({ donorId: roleProfile._id, status: "completed" }),
      ]);

      return {
        role: user.role,
        statistics: {
          totalDonations: roleProfile.totalDonations,
          mealsContributed: roleProfile.mealsContributed,
          avgQuantityKg: roleProfile.avgQuantityKg,
          tier: roleProfile.tier,
          rating: roleProfile.rating,
          lastDonationAt: roleProfile.lastDonationAt,
          activeDonations,
          completedDonations,
        },
      };
    }

    case USER_ROLES.NGO:
      return {
        role: user.role,
        statistics: {
          mealsServed: roleProfile.mealsServed,
          dailyBeneficiaryCapacity: roleProfile.dailyBeneficiaryCapacity,
          utilizationPercent: roleProfile.utilizationPercent,
          coldStorageCapacityKg: roleProfile.coldStorageCapacityKg,
          dryStorageCapacityKg: roleProfile.dryStorageCapacityKg,
          rating: roleProfile.rating,
          verificationStatus: roleProfile.verificationStatus,
        },
      };

    case USER_ROLES.VOLUNTEER:
      return {
        role: user.role,
        statistics: {
          completedMissions: roleProfile.completedMissions,
          rating: roleProfile.rating,
          successRate: roleProfile.successRate,
          maxCapacityKg: roleProfile.maxCapacityKg,
          isAvailable: roleProfile.isAvailable,
          lastActiveAt: roleProfile.lastActiveAt,
        },
      };

    case USER_ROLES.ADMIN: {
      const [users, donors, ngos, volunteers] = await Promise.all([
        User.countDocuments({ isDeleted: false }),
        Donor.countDocuments({}),
        NGO.countDocuments({}),
        Volunteer.countDocuments({}),
      ]);

      return {
        role: user.role,
        statistics: {
          totalUsers: users,
          totalDonors: donors,
          totalNgos: ngos,
          totalVolunteers: volunteers,
          adminLevel: roleProfile?.adminLevel,
          permissions: roleProfile?.permissions || [],
        },
      };
    }

    default:
      throw ApiError.notFound("Impact data not available for this role");
  }
}

export default {
  getProfile,
  updateProfile,
  updateProfileImage,
  getProfileImpact,
};
