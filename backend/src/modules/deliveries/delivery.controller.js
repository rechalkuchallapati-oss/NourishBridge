import deliveryWorkflow from "./services/deliveryWorkflow.service.js";
import { DELIVERY_ACTIONS } from "./constants/transitions.js";
import deliveryService from "./services/delivery.service.js";
import qrVerification from "./services/qrVerification.service.js";
import { getDeliveryProofPublicPath } from "./middleware/upload.middleware.js";
import { sendOk } from "../../utils/responseHandler.js";
import ApiError from "../../utils/ApiError.js";

const actor = (req) => ({
  id: req.user.id,
  role: req.user.role,
  fullName: req.user.fullName,
});

const getDelivery = async (req, res) => {
  const delivery = await deliveryService.getDelivery(req.user.id, req.user.role, req.params.id);
  sendOk(res, "Delivery fetched", { delivery });
};

const getByDonation = async (req, res) => {
  const delivery = await deliveryService.getDeliveryByDonation(
    req.user.id,
    req.user.role,
    req.params.donationId,
  );
  sendOk(res, "Delivery fetched", { delivery });
};

const listMyActive = async (req, res) => {
  const result = await deliveryService.listVolunteerActiveDeliveries(req.user.id);
  sendOk(res, "Active deliveries fetched", result);
};

const listNgoIncoming = async (req, res) => {
  const result = await deliveryService.listNgoIncomingDeliveries(req.user.id);
  sendOk(res, "Incoming deliveries fetched", result);
};

const advance = async (req, res) => {
  const delivery = await deliveryWorkflow.executeDeliveryTransition(
    req.params.id,
    req.body.action,
    actor(req),
    {
      req,
      quantity: req.body.quantity,
      location: req.body.location,
      notes: req.body.notes,
      verificationCode: req.body.verificationCode,
      scheduledAt: req.body.scheduledAt,
    },
  );
  sendOk(res, "Delivery updated", { delivery });
};

const uploadProof = async (req, res) => {
  if (!req.files?.length) throw ApiError.badRequest("At least one image is required");

  const proofType = req.params.proofType;
  if (!["pickup", "delivery"].includes(proofType)) {
    throw ApiError.badRequest("proofType must be pickup or delivery");
  }

  const urls = req.files.map((f) => getDeliveryProofPublicPath(f.filename));
  const delivery = await deliveryService.addProofImages(req.params.id, proofType, urls, actor(req));
  sendOk(res, "Proof images uploaded", { delivery, images: urls });
};

const getQrCodes = async (req, res) => {
  const qr = await qrVerification.getDeliveryQrCodes(
    req.params.id,
    req.user.id,
    req.user.role,
  );
  sendOk(res, "QR codes fetched", { qr });
};

const scanQr = async (req, res) => {
  const result = await qrVerification.scanDeliveryQr(
    req.params.id,
    req.body.qrPayload,
    actor(req),
    req,
  );
  sendOk(res, "QR verification successful", result);
};

export default {
  getDelivery,
  getByDonation,
  listMyActive,
  listNgoIncoming,
  advance,
  uploadProof,
  getQrCodes,
  scanQr,
};
