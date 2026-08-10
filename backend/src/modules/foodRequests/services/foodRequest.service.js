import FoodRequest from "../../../models/FoodRequest.model.js";
import FoodRequestStatusHistory from "../../../models/FoodRequestStatusHistory.model.js";
import ApiError from "../../../utils/ApiError.js";
import { AUDIT_ACTIONS, AUDIT_MODULES, FOOD_REQUEST_STATUS } from "../../../constants/enums.js";
import { logAudit, auditFromRequest } from "../../../services/audit.service.js";
import { getNgoForUser } from "../../shared/repositories/roleProfiles.repository.js";
import {
  FOOD_REQUEST_ACTIONS,
  FOOD_REQUEST_TRANSITIONS,
} from "../constants/transitions.js";
import {
  notifyFoodRequestCreated,
  notifyFoodRequestFulfilled,
} from "../../../services/notificationEvents.service.js";
import NGO from "../../../models/NGO.model.js";

function mapFoodRequest(doc) {
  return {
    id: doc._id,
    requestCode: doc.requestCode,
    title: doc.title,
    description: doc.description,
    foodCategory: doc.foodCategory,
    foodItem: doc.foodItem || doc.title,
    quantityNeeded: doc.quantityNeeded,
    quantityFulfilled: doc.quantityFulfilled,
    quantityUnit: doc.quantityUnit,
    estimatedMeals: doc.estimatedMeals || 0,
    priority: doc.priority,
    status: doc.status,
    neededBy: doc.neededBy,
    deliveryDate: doc.deliveryDate,
    beneficiaryCount: doc.beneficiaryCount,
    location: doc.location,
    dietaryRequirements: doc.dietaryRequirements,
    specialInstructions: doc.specialInstructions,
    matchedDonationIds: doc.matchedDonationIds,
    volunteerId: doc.volunteerId,
    fulfilledAt: doc.fulfilledAt,
    cancelledAt: doc.cancelledAt,
    cancellationReason: doc.cancellationReason,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async function recordHistory(requestId, fromStatus, toStatus, action, actor, reason, reqMeta) {
  return FoodRequestStatusHistory.create({
    foodRequestId: requestId,
    fromStatus,
    toStatus,
    action,
    actorId: actor.id,
    actorRole: actor.role,
    actorName: actor.fullName,
    reason,
    ipAddress: reqMeta?.ipAddress,
    userAgent: reqMeta?.userAgent,
  });
}

export async function executeFoodRequestTransition(requestId, action, actor, { reason, req, donationId } = {}) {
  const rule = FOOD_REQUEST_TRANSITIONS[action];
  if (!rule) throw ApiError.badRequest(`Unknown action: ${action}`);
  if (!rule.roles.includes(actor.role)) {
    throw ApiError.forbidden(`Role '${actor.role}' cannot perform '${action}'`);
  }

  const foodRequest = await FoodRequest.findById(requestId);
  if (!foodRequest) throw ApiError.notFound("Food request not found");

  const fromStatus = foodRequest.status;
  if (!rule.from.includes(fromStatus)) {
    throw ApiError.badRequest(`Cannot '${action}' from status '${fromStatus}'`);
  }

  if (action === FOOD_REQUEST_ACTIONS.MATCH_DONATION && donationId) {
    if (!foodRequest.matchedDonationIds.includes(donationId)) {
      foodRequest.matchedDonationIds.push(donationId);
    }
  }

  if (action === FOOD_REQUEST_ACTIONS.CANCEL) {
    foodRequest.cancelledAt = new Date();
    foodRequest.cancellationReason = reason;
  }

  if (action === FOOD_REQUEST_ACTIONS.FULFILL) {
    foodRequest.fulfilledAt = new Date();
    foodRequest.quantityFulfilled = foodRequest.quantityNeeded;
  }

  foodRequest.status = rule.to;
  await foodRequest.save();

  const reqMeta = req ? auditFromRequest(req) : {};
  await recordHistory(foodRequest._id, fromStatus, rule.to, action, actor, reason, reqMeta);

  await logAudit({
    actorId: actor.id,
    actorRole: actor.role,
    actorName: actor.fullName,
    action: AUDIT_ACTIONS.STATUS_CHANGE,
    module: AUDIT_MODULES.FOOD_REQUESTS,
    entity: { entityType: "FoodRequest", entityId: foodRequest._id },
    description: `Food request ${foodRequest.requestCode}: ${fromStatus} → ${rule.to}`,
    details: { action, fromStatus, toStatus: rule.to, reason },
    ...reqMeta,
  });

  if (action === FOOD_REQUEST_ACTIONS.FULFILL) {
    notifyFoodRequestFulfilled(foodRequest.toObject(), foodRequest.requestedBy).catch(() => {});
  }

  return mapFoodRequest(foodRequest.toObject());
}

export async function createFoodRequest(userId, payload) {
  const ngo = await getNgoForUser(userId);

  const foodRequest = await FoodRequest.create({
    ngoId: ngo._id,
    requestedBy: userId,
    title: payload.title || payload.foodItem,
    foodItem: payload.foodItem || payload.title,
    description: payload.description || payload.specialRequirements,
    foodCategory: payload.foodCategory || payload.category,
    quantityNeeded: payload.quantity || payload.quantityNeeded,
    quantityUnit: payload.quantityUnit || "meals",
    estimatedMeals: payload.estimatedMeals || payload.beneficiaries || 0,
    beneficiaryCount: payload.beneficiaries || payload.beneficiaryCount || 0,
    priority: payload.priority || "medium",
    neededBy: payload.requiredDate || payload.neededBy,
    deliveryDate: payload.deliveryDate,
    location: payload.location,
    specialInstructions: payload.specialRequirements || payload.specialInstructions,
    dietaryRequirements: payload.dietaryRequirements || [],
    status: FOOD_REQUEST_STATUS.REQUESTED,
  });

  const ngoDoc = await NGO.findById(ngo._id).select("ngoName").lean();
  notifyFoodRequestCreated(foodRequest.toObject(), ngoDoc?.ngoName).catch(() => {});

  return mapFoodRequest(foodRequest.toObject());
}

export async function listFoodRequests(userId, query = {}) {
  const ngo = await getNgoForUser(userId);
  const filter = { ngoId: ngo._id };

  if (query.status && query.status !== "all") filter.status = query.status;
  if (query.category && query.category !== "all") filter.foodCategory = query.category;
  if (query.priority && query.priority !== "all") filter.priority = query.priority;

  const requests = await FoodRequest.find(filter).sort({ neededBy: 1, priority: -1 }).lean();
  return { requests: requests.map(mapFoodRequest) };
}

export async function getFoodRequest(userId, requestId) {
  const ngo = await getNgoForUser(userId);
  const request = await FoodRequest.findOne({ _id: requestId, ngoId: ngo._id }).lean();
  if (!request) throw ApiError.notFound("Food request not found");
  return mapFoodRequest(request);
}

export async function updateFoodRequest(userId, requestId, payload) {
  const ngo = await getNgoForUser(userId);
  const request = await FoodRequest.findOne({ _id: requestId, ngoId: ngo._id });
  if (!request) throw ApiError.notFound("Food request not found");

  if (![FOOD_REQUEST_STATUS.REQUESTED, FOOD_REQUEST_STATUS.UNDER_REVIEW].includes(request.status)) {
    throw ApiError.badRequest("Only pending requests can be edited");
  }

  const fields = [
    "title", "foodItem", "description", "foodCategory", "quantityNeeded",
    "quantityUnit", "estimatedMeals", "beneficiaryCount", "priority",
    "neededBy", "deliveryDate", "location", "specialInstructions", "dietaryRequirements",
  ];

  fields.forEach((field) => {
    if (payload[field] !== undefined) request[field] = payload[field];
  });

  await request.save();
  return mapFoodRequest(request.toObject());
}

export async function cancelFoodRequest(userId, requestId, actor, reason, req) {
  const ngo = await getNgoForUser(userId);
  const request = await FoodRequest.findOne({ _id: requestId, ngoId: ngo._id });
  if (!request) throw ApiError.notFound("Food request not found");

  return executeFoodRequestTransition(request._id, FOOD_REQUEST_ACTIONS.CANCEL, actor, { reason, req });
}

export async function getFoodRequestHistory(requestId) {
  return FoodRequestStatusHistory.find({ foodRequestId: requestId }).sort({ createdAt: 1 }).lean();
}

export default {
  createFoodRequest,
  listFoodRequests,
  getFoodRequest,
  updateFoodRequest,
  cancelFoodRequest,
  executeFoodRequestTransition,
  getFoodRequestHistory,
  mapFoodRequest,
};
