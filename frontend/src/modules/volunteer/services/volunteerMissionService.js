import volunteerApi, { mapMissionToUi } from "../api/client.js";
import deliveryApi, { DELIVERY_ACTIONS, mapDeliveryToUi } from "../../deliveries/api/client.js";

export async function fetchAvailableMissions() {
  const { data } = await volunteerApi.listAvailableMissions();
  return (data.data.missions || []).map(mapMissionToUi);
}

export async function fetchAssignedMissions() {
  const { data } = await volunteerApi.listAssignedMissions();
  return (data.data.missions || []).map(mapMissionToUi);
}

export async function fetchMissionHistory(params) {
  const { data } = await volunteerApi.listMissionHistory(params);
  return {
    missions: (data.data.missions || []).map(mapMissionToUi),
    pagination: data.data.pagination,
  };
}

export async function fetchMissionDetail(id) {
  const { data } = await volunteerApi.getMission(id);
  return {
    mission: mapMissionToUi(data.data.mission),
    delivery: mapDeliveryToUi(data.data.delivery),
    history: data.data.history || [],
  };
}

export async function acceptMission(id) {
  const { data } = await volunteerApi.acceptMission(id);
  const mission = mapMissionToUi(data.data.mission);

  try {
    const deliveryRes = await deliveryApi.getByDonation(id);
    mission.delivery = mapDeliveryToUi(deliveryRes.data.data.delivery);
    mission.deliveryId = mission.delivery?.id;
  } catch {
    /* delivery may not exist yet */
  }

  return mission;
}

export async function advanceMission(id, action, payload = {}) {
  const { data } = await volunteerApi.advanceMission(id, { action, ...payload });
  return mapMissionToUi(data.data.mission);
}

export async function advanceDelivery(deliveryId, action, payload = {}) {
  const { data } = await deliveryApi.advance(deliveryId, { action, ...payload });
  return mapDeliveryToUi(data.data.delivery);
}

export async function uploadDeliveryProof(deliveryId, proofType, files) {
  const { data } = await deliveryApi.uploadProof(deliveryId, proofType, files);
  return mapDeliveryToUi(data.data.delivery);
}

export async function fetchVolunteerPerformance() {
  const { data } = await volunteerApi.getPerformance();
  return data.data.performance;
}

export const MISSION_ACTIONS = {
  schedulePickup: DELIVERY_ACTIONS.schedulePickup,
  arriveAtPickup: DELIVERY_ACTIONS.arriveAtPickup,
  verifyPickup: DELIVERY_ACTIONS.verifyPickup,
  collectFood: DELIVERY_ACTIONS.collectFood,
  startDelivery: DELIVERY_ACTIONS.startDelivery,
  arriveAtNgo: DELIVERY_ACTIONS.arriveAtNgo,
  verifyDelivery: DELIVERY_ACTIONS.verifyDelivery,
  // Legacy aliases kept for backward compatibility
  markPickedUp: "mark_picked_up",
  markInTransit: "mark_in_transit",
  markDelivered: "mark_delivered",
};

export { DELIVERY_ACTIONS };

export async function rejectMission(id, reason) {
  const { data } = await volunteerApi.rejectMission(id, reason);
  return mapMissionToUi(data.data.mission);
}

export default {
  fetchAvailableMissions,
  fetchAssignedMissions,
  fetchMissionHistory,
  fetchMissionDetail,
  acceptMission,
  rejectMission,
  advanceMission,
  advanceDelivery,
  uploadDeliveryProof,
  fetchVolunteerPerformance,
  MISSION_ACTIONS,
  DELIVERY_ACTIONS,
};
