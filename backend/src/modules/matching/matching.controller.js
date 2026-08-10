import matchingService from "./services/matching.service.js";
import { sendOk } from "../../utils/responseHandler.js";

const ngoMatches = async (req, res) => {
  const result = await matchingService.scoreNgosForDonation(req.params.donationId, {
    limit: Number(req.query.limit) || 10,
  });
  sendOk(res, "NGO matches fetched", result);
};

const volunteerMatches = async (req, res) => {
  const result = await matchingService.scoreVolunteersForDonation(req.params.donationId, {
    limit: Number(req.query.limit) || 10,
  });
  sendOk(res, "Volunteer matches fetched", result);
};

export default { ngoMatches, volunteerMatches };
