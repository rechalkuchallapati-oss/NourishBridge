import volunteerMissionService from "./services/volunteerMission.service.js";
import volunteerDashboardService from "../../services/volunteer.service.js";
import { sendOk } from "../../utils/responseHandler.js";
import { DONATION_ACTIONS } from "../donations/constants/transitions.js";

const actorFromReq = (req) => ({
  id: req.user.id,
  role: req.user.role,
  fullName: req.user.fullName,
});

const getDashboard = async (req, res) => {
  const data = await volunteerDashboardService.getDashboard(req.user.id);
  sendOk(res, "Volunteer dashboard fetched", data);
};

const listAvailable = async (req, res) => {
  const result = await volunteerMissionService.listAvailableMissions(req.user.id);
  sendOk(res, "Available missions fetched", result);
};

const listAssigned = async (req, res) => {
  const result = await volunteerMissionService.listAssignedMissions(req.user.id);
  sendOk(res, "Assigned missions fetched", result);
};

const listHistory = async (req, res) => {
  const result = await volunteerMissionService.listMissionHistory(req.user.id, req.query);
  sendOk(res, "Mission history fetched", result);
};

const getMission = async (req, res) => {
  const result = await volunteerMissionService.getMissionDetail(req.user.id, req.params.id);
  sendOk(res, "Mission fetched", result);
};

const acceptMission = async (req, res) => {
  const mission = await volunteerMissionService.acceptMission(
    req.user.id,
    req.params.id,
    actorFromReq(req),
    req,
  );
  sendOk(res, "Mission accepted", { mission });
};

const rejectMission = async (req, res) => {
  const result = await volunteerMissionService.rejectMission(
    req.user.id,
    req.params.id,
    actorFromReq(req),
    req.body.reason,
    req,
  );
  sendOk(res, "Mission declined", result);
};

const advanceMission = async (req, res) => {
  const mission = await volunteerMissionService.advanceMission(
    req.user.id,
    req.params.id,
    req.body.action,
    actorFromReq(req),
    req,
    req.body,
  );
  sendOk(res, "Mission updated", { mission });
};

const getPerformance = async (req, res) => {
  const performance = await volunteerMissionService.getVolunteerPerformance(req.user.id);
  sendOk(res, "Performance metrics fetched", { performance });
};

export default {
  getDashboard,
  listAvailable,
  listAssigned,
  listHistory,
  getMission,
  acceptMission,
  rejectMission,
  advanceMission,
  getPerformance,
  DONATION_ACTIONS,
};
