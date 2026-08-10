import adminApi from "../api/client.js";

export async function fetchAdminDashboard() {
  const { data } = await adminApi.getDashboard();
  return data.data;
}

export async function fetchPlatformAnalytics() {
  const { data } = await adminApi.getAnalytics();
  return data.data.analytics;
}

export async function fetchAdminReports(days = 7) {
  const { data } = await adminApi.getReports({ days });
  return data.data;
}

export async function fetchAdminUsers(params) {
  const { data } = await adminApi.listUsers(params);
  return data.data;
}

export async function fetchAdminDonors(params) {
  const { data } = await adminApi.listDonors(params);
  return data.data;
}

export async function fetchAdminVolunteers(params) {
  const { data } = await adminApi.listVolunteers(params);
  return data.data;
}

export async function fetchAdminNgos(params) {
  const { data } = await adminApi.listNgos(params);
  return data.data;
}

export async function fetchAdminDonations(params) {
  const { data } = await adminApi.listDonations(params);
  return data.data;
}

export async function fetchAdminDeliveries(params) {
  const { data } = await adminApi.listDeliveries(params);
  return data.data;
}

export async function fetchAdminFoodRequests(params) {
  const { data } = await adminApi.listFoodRequests(params);
  return data.data;
}

export async function fetchAdminInventory(params) {
  const { data } = await adminApi.listInventory(params);
  return data.data;
}

export async function fetchAdminAuditLogs(params) {
  const { data } = await adminApi.listAuditLogs(params);
  return data.data;
}

export async function fetchAdminNotifications(params) {
  const { data } = await adminApi.listNotifications(params);
  return data.data;
}

export async function fetchAdminSupportTickets(params) {
  const { data } = await adminApi.listSupportTickets(params);
  return data.data;
}

export default {
  fetchAdminDashboard,
  fetchPlatformAnalytics,
  fetchAdminReports,
  fetchAdminUsers,
  fetchAdminDonors,
  fetchAdminVolunteers,
  fetchAdminNgos,
  fetchAdminDonations,
  fetchAdminDeliveries,
  fetchAdminFoodRequests,
  fetchAdminInventory,
  fetchAdminAuditLogs,
  fetchAdminNotifications,
  fetchAdminSupportTickets,
};
