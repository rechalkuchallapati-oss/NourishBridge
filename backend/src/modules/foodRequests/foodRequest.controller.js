import foodRequestService from "./services/foodRequest.service.js";
import { sendOk, sendCreated } from "../../utils/responseHandler.js";

const actorFromReq = (req) => ({
  id: req.user.id,
  role: req.user.role,
  fullName: req.user.fullName,
});

const list = async (req, res) => {
  const result = await foodRequestService.listFoodRequests(req.user.id, req.query);
  sendOk(res, "Food requests fetched", result);
};

const create = async (req, res) => {
  const request = await foodRequestService.createFoodRequest(req.user.id, req.body);
  sendCreated(res, "Food request created", { request });
};

const getOne = async (req, res) => {
  const request = await foodRequestService.getFoodRequest(req.user.id, req.params.id);
  sendOk(res, "Food request fetched", { request });
};

const update = async (req, res) => {
  const request = await foodRequestService.updateFoodRequest(req.user.id, req.params.id, req.body);
  sendOk(res, "Food request updated", { request });
};

const cancel = async (req, res) => {
  const request = await foodRequestService.cancelFoodRequest(
    req.user.id,
    req.params.id,
    actorFromReq(req),
    req.body.reason,
    req,
  );
  sendOk(res, "Food request cancelled", { request });
};

const history = async (req, res) => {
  const entries = await foodRequestService.getFoodRequestHistory(req.params.id);
  sendOk(res, "Food request history fetched", { history: entries });
};

export default { list, create, getOne, update, cancel, history };
