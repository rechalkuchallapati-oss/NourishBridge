import axiosInstance from "../../../api/axiosInstance.js";

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
    requiredDate: form.requiredDate || form.neededBy,
    location: form.location,
    specialRequirements: form.specialRequirements || form.notes,
    description: form.description,
  };
}

export function apiRequestToUi(request) {
  return {
    ...request,
    id: request.requestCode || request.id,
    mongoId: request.id,
    category: request.foodCategory,
    quantity: `${request.quantityNeeded} ${request.quantityUnit || "meals"}`,
    beneficiaries: request.beneficiaryCount || request.estimatedMeals,
    requiredDate: request.neededBy,
    specialRequirements: request.specialInstructions || request.description,
    statusLabel: request.status?.replace(/_/g, " "),
  };
}

export async function fetchFoodRequests(params) {
  const { data } = await foodRequestApi.list(params);
  return (data.data.requests || []).map(apiRequestToUi);
}

export async function createFoodRequest(form) {
  const { data } = await foodRequestApi.create(formToPayload(form));
  return apiRequestToUi(data.data.request);
}

export async function cancelFoodRequest(id, reason) {
  const { data } = await foodRequestApi.cancel(id, reason);
  return apiRequestToUi(data.data.request);
}

export default {
  foodRequestApi,
  fetchFoodRequests,
  createFoodRequest,
  cancelFoodRequest,
  formToPayload,
  apiRequestToUi,
};
