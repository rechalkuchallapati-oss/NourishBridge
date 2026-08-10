import Delivery from "../../../models/Delivery.model.js";
import NGO from "../../../models/NGO.model.js";
import ApiError from "../../../utils/ApiError.js";
import { USER_ROLES, DELIVERY_STATUS } from "../../../constants/enums.js";
import { parseQrPayload } from "../../../services/qr.service.js";
import deliveryWorkflow from "./deliveryWorkflow.service.js";
import { DELIVERY_ACTIONS, DELIVERY_TRANSITIONS } from "../constants/transitions.js";

export async function scanDeliveryQr(deliveryId, qrPayload, actor, req) {
  const parsed = parseQrPayload(qrPayload);
  if (!parsed) throw ApiError.badRequest("Invalid QR code format");

  if (String(parsed.deliveryId) !== String(deliveryId)) {
    throw ApiError.badRequest("QR code does not match this delivery");
  }

  const delivery = await Delivery.findById(deliveryId);
  if (!delivery) throw ApiError.notFound("Delivery not found");

  if (parsed.phase === "pickup") {
    if (actor.role !== USER_ROLES.VOLUNTEER) {
      throw ApiError.forbidden("Only volunteers can verify pickup QR");
    }
    if (delivery.pickupQrVerifiedAt) {
      throw ApiError.conflict("Pickup already verified via QR");
    }
    if (parsed.code !== delivery.pickupVerificationCode) {
      throw ApiError.badRequest("Invalid pickup verification code");
    }

    delivery.pickupQrVerifiedAt = new Date();
    await delivery.save();

    const pickupChain = [DELIVERY_ACTIONS.SCHEDULE_PICKUP, DELIVERY_ACTIONS.ARRIVE_AT_PICKUP, DELIVERY_ACTIONS.VERIFY_PICKUP];
    for (const step of pickupChain) {
      const fresh = await Delivery.findById(deliveryId);
      if ([DELIVERY_STATUS.PICKED_UP, DELIVERY_STATUS.PICKUP_VERIFIED, DELIVERY_STATUS.IN_TRANSIT, DELIVERY_STATUS.DELIVERED, DELIVERY_STATUS.DELIVERY_VERIFIED, DELIVERY_STATUS.COMPLETED].includes(fresh.status)) {
        break;
      }
      const rule = DELIVERY_TRANSITIONS[step];
      if (rule?.from.includes(fresh.status)) {
        await deliveryWorkflow.executeDeliveryTransition(delivery._id, step, actor, {
          req,
          verificationCode: parsed.code,
          notes: "Verified via QR scan",
        });
      }
    }

    return { verified: true, phase: "pickup", deliveryId };
  }

  if (parsed.phase === "delivery") {
    if (actor.role !== USER_ROLES.NGO && actor.role !== USER_ROLES.ADMIN) {
      throw ApiError.forbidden("Only NGO staff can verify delivery QR");
    }
    if (delivery.deliveryQrVerifiedAt) {
      throw ApiError.conflict("Delivery already verified via QR");
    }
    if (parsed.code !== delivery.deliveryVerificationCode) {
      throw ApiError.badRequest("Invalid delivery verification code");
    }

    if (actor.role === USER_ROLES.NGO) {
      const ngo = await NGO.findOne({ userId: actor.id });
      if (!ngo || String(delivery.ngoId) !== String(ngo._id)) {
        throw ApiError.forbidden("This delivery is not for your NGO");
      }
    }

    delivery.deliveryQrVerifiedAt = new Date();
    await delivery.save();

    const chain = [DELIVERY_ACTIONS.START_DELIVERY, DELIVERY_ACTIONS.ARRIVE_AT_NGO, DELIVERY_ACTIONS.VERIFY_DELIVERY];
    for (const step of chain) {
      const fresh = await Delivery.findById(deliveryId);
      if ([DELIVERY_STATUS.DELIVERED, DELIVERY_STATUS.DELIVERY_VERIFIED, DELIVERY_STATUS.COMPLETED].includes(fresh.status)) {
        break;
      }
      const rule = DELIVERY_TRANSITIONS[step];
      if (rule?.from.includes(fresh.status)) {
        await deliveryWorkflow.executeDeliveryTransition(delivery._id, step, actor, {
          req,
          verificationCode: parsed.code,
          notes: "Verified via QR scan",
        });
      }
    }

    return { verified: true, phase: "delivery", deliveryId };
  }

  throw ApiError.badRequest("Unknown QR phase");
}

export async function getDeliveryQrCodes(deliveryId, userId, role) {
  const delivery = await Delivery.findById(deliveryId);
  if (!delivery) throw ApiError.notFound("Delivery not found");

  const { buildQrPayload, generateQrDataUrl } = await import("../../../services/qr.service.js");

  const pickupPayload = buildQrPayload("pickup", delivery._id, delivery.pickupVerificationCode);
  const deliveryPayload = buildQrPayload("delivery", delivery._id, delivery.deliveryVerificationCode);

  const [pickupQr, deliveryQr] = await Promise.all([
    generateQrDataUrl(pickupPayload),
    generateQrDataUrl(deliveryPayload),
  ]);

  return {
    deliveryId: delivery._id,
    pickup: {
      code: delivery.pickupVerificationCode,
      payload: pickupPayload,
      qrDataUrl: pickupQr,
      verified: Boolean(delivery.pickupQrVerifiedAt),
      verifiedAt: delivery.pickupQrVerifiedAt,
    },
    delivery: {
      code: delivery.deliveryVerificationCode,
      payload: deliveryPayload,
      qrDataUrl: deliveryQr,
      verified: Boolean(delivery.deliveryQrVerifiedAt),
      verifiedAt: delivery.deliveryQrVerifiedAt,
    },
  };
}

export default { scanDeliveryQr, getDeliveryQrCodes };
