import foodRequestService from "../foodRequests/services/foodRequest.service.js";
import { FOOD_REQUEST_ACTIONS } from "../foodRequests/constants/transitions.js";
import { sendOk } from "../../utils/responseHandler.js";

const actorFromReq = (req) => ({
  id: req.user.id,
  role: req.user.role,
  fullName: req.user.fullName,
});

export async function reviewFoodRequest(req, res) {
  const request = await foodRequestService.executeFoodRequestTransition(
    req.params.id,
    FOOD_REQUEST_ACTIONS.REVIEW,
    actorFromReq(req),
    { req },
  );
  sendOk(res, "Food request moved to review", { request });
}

export async function approveFoodRequest(req, res) {
  const request = await foodRequestService.executeFoodRequestTransition(
    req.params.id,
    FOOD_REQUEST_ACTIONS.APPROVE,
    actorFromReq(req),
    { req },
  );
  sendOk(res, "Food request approved", { request });
}

export async function rejectFoodRequest(req, res) {
  const request = await foodRequestService.executeFoodRequestTransition(
    req.params.id,
    FOOD_REQUEST_ACTIONS.CANCEL,
    actorFromReq(req),
    { reason: req.body.reason || "Rejected by admin", req },
  );
  sendOk(res, "Food request rejected", { request });
}

export async function matchFoodRequest(req, res) {
  const request = await foodRequestService.executeFoodRequestTransition(
    req.params.id,
    FOOD_REQUEST_ACTIONS.MATCH_DONATION,
    actorFromReq(req),
    { donationId: req.body.donationId, req },
  );
  sendOk(res, "Donation matched to food request", { request });
}

export default {
  reviewFoodRequest,
  approveFoodRequest,
  rejectFoodRequest,
  matchFoodRequest,
};
