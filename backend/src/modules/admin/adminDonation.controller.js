import donationWorkflow from "../donations/services/donationWorkflow.service.js";
import { DONATION_ACTIONS } from "../donations/constants/transitions.js";
import { sendOk } from "../../utils/responseHandler.js";

const actorFromReq = (req) => ({
  id: req.user.id,
  role: req.user.role,
  fullName: req.user.fullName,
});

const verifyDonation = async (req, res) => {
  const donation = await donationWorkflow.executeDonationTransition(
    req.params.id,
    DONATION_ACTIONS.VERIFY,
    actorFromReq(req),
    { req },
  );
  sendOk(res, "Donation verified", { donation });
};

const rejectDonation = async (req, res) => {
  const donation = await donationWorkflow.executeDonationTransition(
    req.params.id,
    DONATION_ACTIONS.REJECT,
    actorFromReq(req),
    { reason: req.body.reason, req },
  );
  sendOk(res, "Donation rejected", { donation });
};

const expireDonation = async (req, res) => {
  const donation = await donationWorkflow.executeDonationTransition(
    req.params.id,
    DONATION_ACTIONS.EXPIRE,
    actorFromReq(req),
    { req },
  );
  sendOk(res, "Donation expired", { donation });
};

export default { verifyDonation, rejectDonation, expireDonation };
