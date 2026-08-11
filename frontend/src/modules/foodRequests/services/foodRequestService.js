import axiosInstance from "../../../api/axiosInstance.js";

const UI_STATUS_MAP = {
  requested: "open",
  under_review: "open",
  approved: "open",
  donation_matched: "matched",
  volunteer_assigned: "on_the_way",
  delivery_scheduled: "on_the_way",
  fulfilled: "completed",
  cancelled: "completed",
  expired: "completed",
};

const UI_STATUS_LABELS = {
  open: "Open",
  matched: "Matched",
  on_the_way: "On the way",
  received: "Received",
  completed: "Completed",
};

export const foodRequestApi = {
  list(params) {
    return axiosInstance.get("/food-requests", { params });
  },
  create(payload) {
    return axiosInstance.post("/food-requests", payload);
  },
  getById(id) {
    return axiosInstance.get(`/food-requests/${id}`);
  },
  update(id, payload) {
    return axiosInstance.patch(`/food-requests/${id}`, payload);
  },
  cancel(id, reason) {
    return axiosInstance.delete(`/food-requests/${id}`, { data: { reason } });
  },
  getHistory(id) {
    return axiosInstance.get(`/food-requests/${id}/history`);
  },
};

function toIsoDate(value) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value;
  const parts = String(value).trim().split(/\s+/);
  if (parts.length < 3) return null;
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T12:00:00.000Z`;
}

export function formToPayload(form) {
  return {
    foodItem: form.foodItem || form.title,
    title: form.title || form.foodItem,
    foodCategory: form.category || form.foodCategory,
    quantityNeeded: Number(form.quantity) || Number(form.quantityNeeded),
    quantityUnit: form.quantityUnit || "meals",
    estimatedMeals: Number(form.estimatedMeals || form.beneficiaries) || 0,
    beneficiaries: Number(form.beneficiaries || form.beneficiaryCount) || 0,
    priority: form.priority === "emergency" ? "critical" : form.priority || "medium",
    requiredDate: toIsoDate(form.requiredDate) || form.neededBy,
    location: form.location,
    specialRequirements: form.specialRequirements || form.notes,
    description: form.description,
  };
}

export function apiRequestToUi(request) {
  const uiStatus = UI_STATUS_MAP[request.status] || request.status;
  return {
    ...request,
    id: request.requestCode || request.id,
    mongoId: request.id,
    title: request.title || request.foodItem,
    foodNeeded: request.foodItem || request.title,
    category: request.foodCategory,
    quantity: `${request.quantityNeeded} ${request.quantityUnit || "meals"}`,
    beneficiaries: request.beneficiaryCount || request.estimatedMeals,
    requiredDate: request.neededBy,
    neededBy: request.neededBy
      ? new Date(request.neededBy).toLocaleString("en-IN")
      : "",
    specialRequirements: request.specialInstructions || request.description,
    notes: request.specialInstructions || request.description || "",
    locationKey: (request.location || "hyderabad").toLowerCase().replace(/\s+/g, "_"),
    uiStatus,
    status: uiStatus,
    statusLabel: UI_STATUS_LABELS[uiStatus] || request.status?.replace(/_/g, " "),
    backendStatus: request.status,
    createdAt: request.createdAt
      ? new Date(request.createdAt).toLocaleString("en-IN")
      : "",
  };
}

const ACTIVE_UI_STATUSES = ["open", "matched", "volunteer_assigned", "on_the_way", "received"];
const APPROVED_UI_STATUSES = ["matched", "volunteer_assigned", "on_the_way"];
const FULFILLED_UI_STATUSES = ["received", "completed"];

export function computeFoodRequestStats(requests) {
  return {
    active: requests.filter((r) => ACTIVE_UI_STATUSES.includes(r.uiStatus || r.status)).length,
    pending: requests.filter((r) => (r.uiStatus || r.status) === "open").length,
    approved: requests.filter((r) => APPROVED_UI_STATUSES.includes(r.uiStatus || r.status)).length,
    fulfilled: requests.filter((r) => FULFILLED_UI_STATUSES.includes(r.uiStatus || r.status)).length,
    expired: requests.filter((r) => (r.uiStatus || r.status) === "expired").length,
  };
}

export function filterFoodRequests(requests, filters) {
  return requests.filter((request) => {
    const status = request.uiStatus || request.status;
    if (filters.category !== "all" && request.category !== filters.category) return false;
    if (filters.priority !== "all" && request.priority !== filters.priority) return false;
    if (filters.status !== "all" && status !== filters.status) return false;
    if (filters.location !== "all" && request.locationKey !== filters.location) return false;
    return true;
  });
}

export function apiHistoryToUi(entry) {
  return {
    id: entry._id,
    fromStatus: entry.fromStatus,
    toStatus: entry.toStatus,
    action: entry.action,
    notes: entry.reason || "",
    dateLabel: entry.createdAt
      ? new Date(entry.createdAt).toLocaleString("en-IN")
      : "",
  };
}

export async function fetchFoodRequests(params) {
  const { data } = await foodRequestApi.list(params);
  return (data.data.requests || []).map(apiRequestToUi);
}

export async function fetchFoodRequestById(id) {
  const { data } = await foodRequestApi.getById(id);
  return apiRequestToUi(data.data.request);
}

export async function fetchFoodRequestHistory(id) {
  const { data } = await foodRequestApi.getHistory(id);
  return (data.data.history || []).map(apiHistoryToUi);
}

export async function createFoodRequest(form) {
  const { data } = await foodRequestApi.create(formToPayload(form));
  return apiRequestToUi(data.data.request);
}

export async function updateFoodRequest(id, form) {
  const { data } = await foodRequestApi.update(id, formToPayload(form));
  return apiRequestToUi(data.data.request);
}

export async function cancelFoodRequest(id, reason) {
  const { data } = await foodRequestApi.cancel(id, reason);
  return apiRequestToUi(data.data.request);
}

export default {
  foodRequestApi,
  fetchFoodRequests,
  fetchFoodRequestById,
  fetchFoodRequestHistory,
  createFoodRequest,
  updateFoodRequest,
  cancelFoodRequest,
  formToPayload,
  apiRequestToUi,
  computeFoodRequestStats,
  filterFoodRequests,
};
