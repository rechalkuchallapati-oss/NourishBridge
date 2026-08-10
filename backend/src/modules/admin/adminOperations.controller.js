import adminService from "../../services/admin.service.js";
import adminOperations from "./services/adminOperations.service.js";
import analyticsService from "../../services/analytics.service.js";
import { sendOk } from "../../utils/responseHandler.js";

const getDashboard = async (_req, res) => {
  const dashboard = await adminService.getDashboard();
  sendOk(res, "Admin dashboard fetched", dashboard);
};

const getAnalytics = async (_req, res) => {
  const analytics = await analyticsService.getPlatformAnalytics();
  sendOk(res, "Platform analytics fetched", { analytics });
};

const getReports = async (_req, res) => {
  const [analytics, trend, byCategory, activity, topNgos] = await Promise.all([
    analyticsService.getPlatformAnalytics(),
    analyticsService.getDonationTrend(Number(_req.query.days) || 7),
    analyticsService.getDonationsByCategory(),
    analyticsService.getRecentActivity(15),
    analyticsService.getTopNgos(5),
  ]);

  sendOk(res, "Reports fetched", {
    analytics,
    trend,
    byCategory,
    activity,
    topNgos,
  });
};

const listUsers = async (req, res) => {
  const result = await adminOperations.listUsers(req.query);
  sendOk(res, "Users fetched", result);
};

const updateUser = async (req, res) => {
  const user = await adminOperations.updateUserStatus(req.params.id, req.body);
  sendOk(res, "User updated", { user });
};

const listDonors = async (req, res) => {
  const result = await adminOperations.listDonors(req.query);
  sendOk(res, "Donors fetched", result);
};

const listVolunteers = async (req, res) => {
  const result = await adminOperations.listVolunteers(req.query);
  sendOk(res, "Volunteers fetched", result);
};

const listNgos = async (req, res) => {
  const result = await adminOperations.listNgos(req.query);
  sendOk(res, "NGOs fetched", result);
};

const verifyNgo = async (req, res) => {
  const result = await adminOperations.verifyNgo(req.params.id);
  sendOk(res, "NGO verified", result);
};

const listDonations = async (req, res) => {
  const result = await adminOperations.listDonations(req.query);
  sendOk(res, "Donations fetched", result);
};

const listDeliveries = async (req, res) => {
  const result = await adminOperations.listDeliveries(req.query);
  sendOk(res, "Deliveries fetched", result);
};

const listFoodRequests = async (req, res) => {
  const result = await adminOperations.listFoodRequests(req.query);
  sendOk(res, "Food requests fetched", result);
};

const listInventory = async (req, res) => {
  const result = await adminOperations.listInventory(req.query);
  sendOk(res, "Inventory fetched", result);
};

const listAuditLogs = async (req, res) => {
  const result = await adminOperations.listAuditLogs(req.query);
  sendOk(res, "Audit logs fetched", result);
};

const listNotifications = async (req, res) => {
  const result = await adminOperations.listNotificationsAdmin(req.query);
  sendOk(res, "Notifications fetched", result);
};

const listSupportTickets = async (req, res) => {
  const result = await adminOperations.listSupportTickets(req.query);
  sendOk(res, "Support tickets fetched", result);
};

const updateSupportTicket = async (req, res) => {
  const ticket = await adminOperations.updateSupportTicket(req.params.id, req.body);
  sendOk(res, "Support ticket updated", { ticket });
};

export default {
  getDashboard,
  getAnalytics,
  getReports,
  listUsers,
  updateUser,
  listDonors,
  listVolunteers,
  listNgos,
  verifyNgo,
  listDonations,
  listDeliveries,
  listFoodRequests,
  listInventory,
  listAuditLogs,
  listNotifications,
  listSupportTickets,
  updateSupportTicket,
};
