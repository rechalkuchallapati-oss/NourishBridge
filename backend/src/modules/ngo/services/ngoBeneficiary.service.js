import Beneficiary from "../../../models/Beneficiary.model.js";
import ApiError from "../../../utils/ApiError.js";
import { getNgoForUser } from "../../shared/repositories/roleProfiles.repository.js";

function mapBeneficiary(b) {
  return {
    id: b._id,
    name: b.name,
    category: b.category,
    contactPhone: b.contactPhone,
    address: b.address,
    householdSize: b.householdSize,
    mealsServed: b.mealsServed,
    isActive: b.isActive,
    notes: b.notes,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}

export async function listBeneficiaries(userId, query = {}) {
  const ngo = await getNgoForUser(userId);
  const filter = { ngoId: ngo._id };

  if (query.active === "true") filter.isActive = true;
  if (query.category && query.category !== "all") filter.category = query.category;

  const beneficiaries = await Beneficiary.find(filter).sort({ name: 1 }).lean();
  return { beneficiaries: beneficiaries.map(mapBeneficiary) };
}

export async function createBeneficiary(userId, payload) {
  const ngo = await getNgoForUser(userId);

  const beneficiary = await Beneficiary.create({
    ngoId: ngo._id,
    name: payload.name,
    category: payload.category || "general",
    contactPhone: payload.contactPhone,
    address: payload.address,
    householdSize: payload.householdSize || 1,
    notes: payload.notes,
  });

  return mapBeneficiary(beneficiary.toObject());
}

export async function updateBeneficiary(userId, beneficiaryId, payload) {
  const ngo = await getNgoForUser(userId);
  const beneficiary = await Beneficiary.findOne({ _id: beneficiaryId, ngoId: ngo._id });

  if (!beneficiary) throw ApiError.notFound("Beneficiary not found");

  ["name", "category", "contactPhone", "address", "householdSize", "mealsServed", "isActive", "notes"].forEach(
    (field) => {
      if (payload[field] !== undefined) beneficiary[field] = payload[field];
    },
  );

  await beneficiary.save();
  return mapBeneficiary(beneficiary.toObject());
}

export default { listBeneficiaries, createBeneficiary, updateBeneficiary };
