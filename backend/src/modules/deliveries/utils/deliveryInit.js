import { generateVerificationCode } from "../../../services/qr.service.js";
import NGO from "../../../models/NGO.model.js";

export async function initializeDeliveryVerification(delivery, ngoId) {
  if (!delivery.pickupVerificationCode) {
    delivery.pickupVerificationCode = generateVerificationCode(8);
  }
  if (!delivery.deliveryVerificationCode) {
    delivery.deliveryVerificationCode = generateVerificationCode(8);
  }

  if (ngoId && !delivery.deliveryLocation) {
    const ngo = await NGO.findById(ngoId).select("location").lean();
    if (ngo?.location) {
      delivery.deliveryLocation = ngo.location;
    }
  }

  return delivery;
}

export default { initializeDeliveryVerification };
