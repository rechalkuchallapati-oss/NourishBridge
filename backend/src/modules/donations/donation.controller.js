import donationService from "./services/donation.service.js";
import donationWorkflow from "./services/donationWorkflow.service.js";
import { DONATION_ACTIONS } from "./constants/transitions.js";
import { sendOk, sendCreated } from "../../utils/responseHandler.js";import { getDonationImagePublicPath } from "./middleware/upload.middleware.js";
import ApiError from "../../utils/ApiError.js";

const createDonation = async (req, res) => {
  const donation = await donationService.createDonation(req.user.id, req.body, req);
  sendCreated(res, "Donation created successfully", { donation });
};

const listMyDonations = async (req, res) => {
  const result = await donationService.listMyDonations(req.user.id, req.query);
  sendOk(res, "Donations fetched successfully", result);
};

const getDonation = async (req, res) => {
  const donation = await donationService.getDonationById(req.user.id, req.params.id);
  sendOk(res, "Donation fetched successfully", { donation });
};

const updateDonation = async (req, res) => {
  const donation = await donationService.updateDonation(req.user.id, req.params.id, req.body);
  sendOk(res, "Donation updated successfully", { donation });
};

const deleteDonation = async (req, res) => {
  const donation = await donationService.cancelDonation(req.user.id, req.params.id, req.user, req);
  sendOk(res, "Donation cancelled successfully", { donation });
};

const getDonationHistory = async (req, res) => {
  await donationService.getDonationById(req.user.id, req.params.id);
  const history = await donationWorkflow.getDonationStatusHistory(req.params.id);
  sendOk(res, "Donation history fetched", { history });
};

const uploadImages = async (req, res) => {
  if (!req.files?.length) {
    throw ApiError.badRequest("At least one image file is required");
  }

  const imageUrls = req.files.map((file) => getDonationImagePublicPath(file.filename));
  const donation = await donationService.addDonationImages(
    req.user.id,
    req.params.id,
    imageUrls,
  );

  sendOk(res, "Donation images uploaded successfully", { donation, images: imageUrls });
};

export default {
  createDonation,
  listMyDonations,
  getDonation,
  updateDonation,
  deleteDonation,
  uploadImages,
  getDonationHistory,
};
