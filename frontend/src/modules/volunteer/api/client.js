import axiosInstance from "../../../api/axiosInstance.js";
import { resolveImageUrl } from "../../donations/api/client.js";

export const volunteerApi = {
  getDashboard() {
    return axiosInstance.get("/volunteer/dashboard");
  },
  listAvailableMissions() {
    return axiosInstance.get("/volunteer/missions/available");
  },
  listAssignedMissions() {
    return axiosInstance.get("/volunteer/missions/assigned");
  },
  listMissionHistory(params) {
    return axiosInstance.get("/volunteer/missions/history", { params });
  },
  getMission(id) {
    return axiosInstance.get(`/volunteer/missions/${id}`);
  },
  acceptMission(id) {
    return axiosInstance.post(`/volunteer/missions/${id}/accept`);
  },
  rejectMission(id, reason) {
    return axiosInstance.post(`/volunteer/missions/${id}/reject`, { reason });
  },
  advanceMission(id, body) {
    return axiosInstance.post(`/volunteer/missions/${id}/advance`, body);
  },
  getPerformance() {
    return axiosInstance.get("/volunteer/missions/performance");
  },
};

export function mapMissionToUi(mission) {
  return {
    ...mission,
    id: mission.donationCode || mission.id,
    mongoId: mission.id,
    food: mission.foodName || mission.food,
    foodName: mission.foodName || mission.food,
    matchedNgo: mission.ngo || mission.matchedNgo,
    pickupAddress: mission.pickupAddress,
    pickupTime: mission.pickupTime || mission.dateLabel,
    postedAt: mission.postedAt || mission.dateLabel,
    image: mission.image ? resolveImageUrl(mission.image) : mission.image,
    quantity: mission.quantityLabel || `${mission.quantity} ${mission.quantityUnit || "kg"}`,
    estimatedMeals: mission.estimatedMeals || 0,
    statusLabel: mission.statusLabel || mission.status,
  };
}

export default volunteerApi;
