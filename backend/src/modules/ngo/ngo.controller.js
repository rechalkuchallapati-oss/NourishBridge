import ngoDonationService from "./services/ngoDonation.service.js";
import ngoInventoryService from "./services/ngoInventory.service.js";
import ngoBeneficiaryService from "./services/ngoBeneficiary.service.js";
import ngoDashboardService from "../../services/ngo.service.js";
import { sendOk, sendCreated } from "../../utils/responseHandler.js";

const actorFromReq = (req) => ({
  id: req.user.id,
  role: req.user.role,
  fullName: req.user.fullName,
});

const getDashboard = async (req, res) => {
  const data = await ngoDashboardService.getDashboard(req.user.id);
  sendOk(res, "NGO dashboard fetched", data);
};

const browseDonations = async (req, res) => {
  const result = await ngoDonationService.browseAvailableDonations(req.user.id, req.query);
  sendOk(res, "Available donations fetched", result);
};

const listIncoming = async (req, res) => {
  const result = await ngoDonationService.listIncomingDonations(req.user.id, req.query);
  sendOk(res, "Incoming donations fetched", result);
};

const listAccepted = async (req, res) => {
  const result = await ngoDonationService.listAcceptedDonations(req.user.id, req.query);
  sendOk(res, "Accepted donations fetched", result);
};

const getDonation = async (req, res) => {
  const donation = await ngoDonationService.getDonationDetail(req.user.id, req.params.id);
  sendOk(res, "Donation fetched", { donation });
};

const acceptDonation = async (req, res) => {
  const donation = await ngoDonationService.acceptDonation(
    req.user.id,
    req.params.id,
    actorFromReq(req),
    req,
  );
  sendOk(res, "Donation accepted", { donation });
};

const rejectDonation = async (req, res) => {
  const donation = await ngoDonationService.rejectDonation(
    req.user.id,
    req.params.id,
    actorFromReq(req),
    req.body.reason,
    req,
  );
  sendOk(res, "Donation rejected", { donation });
};

const completeDonation = async (req, res) => {
  const donation = await ngoDonationService.completeDonation(
    req.user.id,
    req.params.id,
    actorFromReq(req),
    req,
  );
  sendOk(res, "Donation marked complete", { donation });
};

const donationStats = async (req, res) => {
  const statistics = await ngoDonationService.getNgoDonationStatistics(req.user.id);
  sendOk(res, "Donation statistics fetched", { statistics });
};

const listInventory = async (req, res) => {
  const result = await ngoInventoryService.listInventory(req.user.id, req.query);
  sendOk(res, "Inventory fetched", result);
};

const inventoryAlerts = async (req, res) => {
  const days = req.query.days || 3;
  const result = await ngoInventoryService.getExpiryAlerts(req.user.id, days);
  sendOk(res, "Inventory alerts fetched", result);
};

const inventoryStats = async (req, res) => {
  const statistics = await ngoInventoryService.getInventoryStatistics(req.user.id);
  sendOk(res, "Inventory statistics fetched", { statistics });
};

const listIncomingDeliveries = async (req, res) => {
  const { listNgoIncomingDeliveries } = await import(
    "../deliveries/services/delivery.service.js"
  );
  const result = await listNgoIncomingDeliveries(req.user.id);
  sendOk(res, "Incoming deliveries fetched", result);
};

const distributeInventory = async (req, res) => {
  const result = await ngoInventoryService.distributeInventory(req.user.id, req.params.id, req.body);
  sendOk(res, "Inventory distributed", result);
};

const listDistributionRecords = async (req, res) => {
  const result = await ngoInventoryService.listDistributionRecords(req.user.id, req.query);
  sendOk(res, "Distribution records fetched", result);
};

const listBeneficiaries = async (req, res) => {
  const result = await ngoBeneficiaryService.listBeneficiaries(req.user.id, req.query);
  sendOk(res, "Beneficiaries fetched", result);
};

const createBeneficiary = async (req, res) => {
  const beneficiary = await ngoBeneficiaryService.createBeneficiary(req.user.id, req.body);
  sendCreated(res, "Beneficiary created", { beneficiary });
};

const updateBeneficiary = async (req, res) => {
  const beneficiary = await ngoBeneficiaryService.updateBeneficiary(
    req.user.id,
    req.params.id,
    req.body,
  );
  sendOk(res, "Beneficiary updated", { beneficiary });
};

export default {
  getDashboard,
  browseDonations,
  listIncoming,
  listAccepted,
  getDonation,
  acceptDonation,
  rejectDonation,
  completeDonation,
  donationStats,
  listInventory,
  inventoryAlerts,
  inventoryStats,
  listIncomingDeliveries,
  distributeInventory,
  listDistributionRecords,
  listBeneficiaries,
  createBeneficiary,
  updateBeneficiary,
};
