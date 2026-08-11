import deliveryApi, { DELIVERY_ACTIONS, mapDeliveryToUi } from "../api/client.js";
import { advanceMission, uploadDeliveryProof } from "../../volunteer/services/volunteerMissionService.js";

export async function loadDeliveryForMission(mission) {
  const donationId = mission?.mongoId || mission?.id;
  if (!donationId) return null;
  try {
    const { data } = await deliveryApi.getByDonation(donationId);
    return mapDeliveryToUi(data.data.delivery);
  } catch {
    return null;
  }
}

export async function advanceDeliveryStep(mission, action, payload = {}) {
  const deliveryId = mission?.deliveryId || mission?.delivery?.id;
  if (deliveryId) {
    const { data } = await deliveryApi.advance(deliveryId, { action, ...payload });
    return mapDeliveryToUi(data.data.delivery);
  }
  const donationId = mission?.mongoId || mission?.id;
  if (donationId) {
    return advanceMission(donationId, action, payload);
  }
  return null;
}

export async function uploadProofForMission(mission, proofType, files) {
  const deliveryId = mission?.deliveryId || mission?.delivery?.id;
  if (!deliveryId || !files?.length) return null;
  return uploadDeliveryProof(deliveryId, proofType, files);
}

export { DELIVERY_ACTIONS };

export default {
  loadDeliveryForMission,
  advanceDeliveryStep,
  uploadProofForMission,
  DELIVERY_ACTIONS,
};
