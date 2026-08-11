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
  return {
    users: (data.data.users || []).map((u) => ({
      id: u.id,
      name: u.fullName,
      email: u.email,
      role: u.role,
      status: u.isActive ? "active" : "suspended",
      verification: u.isVerified ? "verified" : "pending",
      joinedAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN") : "—",
      lastActive: u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString("en-IN") : "—",
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminDonors(params) {
  const { data } = await adminApi.listDonors(params);
  return {
    donors: (data.data.donors || []).map((d, i) => ({
      id: `DNR-${String(d.id || i).slice(-6).toUpperCase()}`,
      mongoId: d.id,
      name: d.fullName || "Donor",
      type: d.donorType || "individual",
      city: "hyderabad",
      donations: 0,
      mealsContributed: d.mealsContributed || 0,
      status: d.isActive !== false ? "active" : "inactive",
      recurring: false,
      lastDonation: "—",
      joined: d.createdAt ? new Date(d.createdAt).toLocaleDateString("en-IN") : "—",
      avatar: null,
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminVolunteers(params) {
  const { data } = await adminApi.listVolunteers(params);
  return {
    volunteers: (data.data.volunteers || []).map((v, i) => ({
      id: `VOL-${String(v.id || i).slice(-6).toUpperCase()}`,
      mongoId: v.id,
      name: v.fullName || "Volunteer",
      email: v.email || "—",
      phone: "—",
      city: "hyderabad",
      vehicle: v.vehicleType || "bike",
      availability: v.isAvailable ? "available" : "offline",
      verification: "verified",
      completedMissions: v.completedMissions || 0,
      rating: v.rating || 0,
      successRate: 95,
      status: v.isActive !== false ? "active" : "suspended",
      lastActive: v.createdAt ? new Date(v.createdAt).toLocaleDateString("en-IN") : "—",
      avatar: null,
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminNgos(params) {
  const { data } = await adminApi.listNgos(params);
  return {
    ngos: (data.data.ngos || []).map((n, i) => ({
      id: n.registrationNumber || `NGO-${String(n.id || i).slice(-6).toUpperCase()}`,
      mongoId: n.id,
      name: n.ngoName || "NGO",
      contactPerson: "—",
      email: n.email || "—",
      city: "Hyderabad",
      verification: n.isVerified ? "verified" : "pending",
      capacity: "—",
      status: n.isVerified ? "active" : "pending",
      joinedDate: n.createdAt ? new Date(n.createdAt).toLocaleDateString("en-IN") : "—",
      rating: null,
      mealsServed: String(n.mealsServed || 0),
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminDonations(params) {
  const { data } = await adminApi.listDonations(params);
  return {
    donations: (data.data.donations || []).map((d) => ({
      id: d.donationCode || d.id,
      mongoId: d.id,
      donorName: d.donorName || "Donor",
      donorType: "individual",
      foodItem: d.foodName || "Food",
      category: d.category || "cooked_meals",
      quantity: `${d.quantity || 0} ${d.quantityUnit || "kg"}`,
      meals: d.estimatedMeals || 0,
      ngo: d.ngoName || "—",
      volunteer: "—",
      status: d.status || "pending",
      priority: "medium",
      city: "hyderabad",
      pickupTime: "—",
      expiryTime: "—",
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminDeliveries(params) {
  const { data } = await adminApi.listDeliveries(params);
  return {
    deliveries: (data.data.deliveries || []).map((d) => ({
      id: d.deliveryCode || d.id,
      mongoId: d.id,
      status: d.status,
      donationId: d.donationCode,
      foodName: d.foodName || "—",
      ngo: d.ngoName || "—",
      volunteer: "—",
      donor: "—",
      city: "Hyderabad",
      priority: "medium",
      pickupTime: d.pickedUpAt ? new Date(d.pickedUpAt).toLocaleString("en-IN") : "—",
      deliveryTime: d.deliveredAt ? new Date(d.deliveredAt).toLocaleString("en-IN") : "—",
      createdAt: d.createdAt ? new Date(d.createdAt).toLocaleString("en-IN") : "—",
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminInventory(params) {
  const { data } = await adminApi.listInventory(params);
  return {
    items: (data.data.items || []).map((i) => ({
      id: i.batchCode || i.id,
      mongoId: i.id,
      batchId: i.batchCode,
      foodItem: i.itemName,
      category: i.category,
      quantity: i.quantity,
      distributedQuantity: i.distributedQuantity || 0,
      status: i.status,
      ngo: i.ngoName || "—",
      expiryDate: i.expiryDate ? new Date(i.expiryDate).toLocaleDateString("en-IN") : "—",
      receivedDate: i.receivedAt ? new Date(i.receivedAt).toLocaleDateString("en-IN") : "—",
      storageType: "ambient",
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminFoodRequests(params) {
  const { data } = await adminApi.listFoodRequests(params);
  return {
    requests: (data.data.foodRequests || []).map((r) => ({
      id: r.requestCode || r.id,
      mongoId: r.id,
      ngo: r.ngoName || "NGO",
      ngoKey: "all",
      foodNeeded: r.title || "Food request",
      category: "cooked_meals",
      quantity: `${r.quantityNeeded || 0} ${r.quantityUnit || "kg"}`,
      meals: r.quantityNeeded || 0,
      priority: r.priority || "medium",
      city: "hyderabad",
      requestedDate: r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "—",
      requiredBy: r.neededBy ? new Date(r.neededBy).toLocaleString("en-IN") : "—",
      status: r.status || "pending_review",
      assignedDonation: "—",
      assignedVolunteer: "—",
    })),
    pagination: data.data.pagination,
  };
}

export async function exportAdminReport(type, format = "csv") {
  const { data, headers } = await adminApi.exportReport(type, format);
  const disposition = headers["content-disposition"] || "";
  const match = disposition.match(/filename="(.+)"/);
  const filename = match?.[1] || `nourishbridge-${type}.${format === "pdf" ? "txt" : "csv"}`;
  return { blob: data, filename };
}

export async function fetchAdminAuditLogs(params) {
  const { data } = await adminApi.listAuditLogs(params);
  return {
    logs: (data.data.logs || []).map((l) => ({
      id: l.id,
      actor: l.actorName || "System",
      role: l.actorRole,
      action: l.action,
      module: l.module,
      description: l.description,
      severity: l.severity,
      timestamp: l.createdAt ? new Date(l.createdAt).toLocaleString("en-IN") : "—",
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminSupportTickets(params) {
  const { data } = await adminApi.listSupportTickets(params);
  return {
    tickets: (data.data.tickets || []).map((t) => ({
      id: t.ticketCode || t.id,
      mongoId: t.id,
      subject: t.subject,
      description: t.description || "—",
      user: t.submitter?.fullName || "User",
      userRole: t.submitter?.role || "donor",
      category: t.category || "others",
      priority: t.priority || "medium",
      status: (t.status || "open").toLowerCase(),
      lastUpdated: t.createdAt ? new Date(t.createdAt).toLocaleString("en-IN") : "—",
      dateGroup: "today",
      assignedTo: t.assignedTo || "Unassigned",
    })),
    pagination: data.data.pagination,
  };
}

export async function fetchAdminNotifications(params) {
  const { data } = await adminApi.listNotifications(params);
  return data.data;
}

export default {
  fetchAdminDashboard,
  fetchPlatformAnalytics,
  fetchAdminReports,
  exportAdminReport,
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
