import User from "../../../models/User.model.js";
import Donor from "../../../models/Donor.model.js";
import Volunteer from "../../../models/Volunteer.model.js";
import NGO from "../../../models/NGO.model.js";
import Donation from "../../../models/Donation.model.js";
import Delivery from "../../../models/Delivery.model.js";
import FoodRequest from "../../../models/FoodRequest.model.js";
import Inventory from "../../../models/Inventory.model.js";
import AuditLog from "../../../models/AuditLog.model.js";
import SupportTicket from "../../../models/SupportTicket.model.js";
import ApiError from "../../../utils/ApiError.js";
import notificationService from "../../../services/notification.service.js";

const MAX_PAGE_LIMIT = 100;

function clampLimit(limit, fallback = 20) {
  return Math.min(Math.max(Number(limit) || fallback, 1), MAX_PAGE_LIMIT);
}

function paginate(query, { page = 1, limit = 20 }) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = clampLimit(limit);
  const skip = (safePage - 1) * safeLimit;
  return query.skip(skip).limit(safeLimit);
}

function paginationMeta(page, limit, total) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = clampLimit(limit);
  return { page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) || 1 };
}

function mapUser(u) {
  return {
    id: u._id,
    fullName: u.fullName,
    email: u.email,
    phone: u.phone,
    role: u.role,
    status: u.status,
    isActive: u.isActive,
    isVerified: u.isVerified,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
  };
}

export async function listUsers({ page = 1, limit = 20, role = null, search = null } = {}) {
  const filter = { isDeleted: false };
  if (role) filter.role = role;
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const [users, total] = await Promise.all([
    paginate(User.find(filter).sort({ createdAt: -1 }), { page, limit }).lean(),
    User.countDocuments(filter),
  ]);

  return {
    users: users.map(mapUser),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function updateUserStatus(userId, { isActive, status }) {
  const user = await User.findById(userId);
  if (!user || user.isDeleted) throw ApiError.notFound("User not found");

  if (typeof isActive === "boolean") user.isActive = isActive;
  if (status) user.status = status;
  await user.save();

  return mapUser(user.toObject());
}

export async function listDonors({ page = 1, limit = 20 } = {}) {
  const [items, total] = await Promise.all([
    paginate(
      Donor.find()
        .populate("userId", "fullName email phone isActive")
        .sort({ createdAt: -1 }),
      { page, limit },
    ).lean(),
    Donor.countDocuments(),
  ]);

  return {
    donors: items.map((d) => ({
      id: d._id,
      userId: d.userId?._id,
      fullName: d.userId?.fullName,
      email: d.userId?.email,
      donorType: d.donorType,
      mealsContributed: d.mealsContributed || 0,
      isActive: d.isActive,
      createdAt: d.createdAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function listVolunteers({ page = 1, limit = 20 } = {}) {
  const [items, total] = await Promise.all([
    paginate(
      Volunteer.find()
        .populate("userId", "fullName email phone isActive")
        .sort({ createdAt: -1 }),
      { page, limit },
    ).lean(),
    Volunteer.countDocuments(),
  ]);

  return {
    volunteers: items.map((v) => ({
      id: v._id,
      userId: v.userId?._id,
      fullName: v.userId?.fullName,
      email: v.userId?.email,
      vehicleType: v.vehicleType,
      rating: v.rating,
      completedMissions: v.completedMissions || 0,
      isAvailable: v.isAvailable,
      isActive: v.isActive,
      createdAt: v.createdAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function listNgos({ page = 1, limit = 20 } = {}) {
  const [items, total] = await Promise.all([
    paginate(
      NGO.find()
        .populate("userId", "fullName email phone isVerified")
        .sort({ createdAt: -1 }),
      { page, limit },
    ).lean(),
    NGO.countDocuments(),
  ]);

  return {
    ngos: items.map((n) => ({
      id: n._id,
      userId: n.userId?._id,
      ngoName: n.ngoName,
      email: n.userId?.email,
      registrationNumber: n.registrationNumber,
      mealsServed: n.mealsServed || 0,
      isVerified: n.verificationStatus === "verified" || n.userId?.isVerified,
      createdAt: n.createdAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function verifyNgo(ngoId) {
  const ngo = await NGO.findById(ngoId);
  if (!ngo) throw ApiError.notFound("NGO not found");

  ngo.verificationStatus = "verified";
  await ngo.save();

  await User.updateOne({ _id: ngo.userId }, { isVerified: true });

  return { id: ngo._id, verificationStatus: "verified" };
}

export async function listDonations({ page = 1, limit = 20, status = null } = {}) {
  const filter = {};
  if (status) filter.status = status;

  const [items, total] = await Promise.all([
    paginate(
      Donation.find(filter)
        .populate("ngoId", "ngoName")
        .populate({ path: "donorId", populate: { path: "userId", select: "fullName" } })
        .sort({ createdAt: -1 }),
      { page, limit },
    ).lean(),
    Donation.countDocuments(filter),
  ]);

  return {
    donations: items.map((d) => ({
      id: d._id,
      donationCode: d.donationCode,
      foodName: d.foodType,
      category: d.category,
      quantity: d.quantity,
      quantityUnit: d.quantityUnit,
      status: d.status,
      donorName: d.donorId?.userId?.fullName || "Donor",
      ngoName: d.ngoId?.ngoName,
      estimatedMeals: d.estimatedMeals,
      createdAt: d.createdAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function listDeliveries({ page = 1, limit = 20, status = null } = {}) {
  const filter = {};
  if (status) filter.status = status;

  const [items, total] = await Promise.all([
    paginate(
      Delivery.find(filter)
        .populate("ngoId", "ngoName")
        .populate("volunteerId", "vehicleType")
        .populate({ path: "donationId", select: "donationCode foodType" })
        .sort({ createdAt: -1 }),
      { page, limit },
    ).lean(),
    Delivery.countDocuments(filter),
  ]);

  return {
    deliveries: items.map((d) => ({
      id: d._id,
      deliveryCode: d.deliveryCode,
      status: d.status,
      donationCode: d.donationId?.donationCode,
      foodName: d.donationId?.foodType,
      ngoName: d.ngoId?.ngoName,
      pickedUpAt: d.pickedUpAt,
      deliveredAt: d.deliveredAt,
      completedAt: d.completedAt,
      createdAt: d.createdAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function listFoodRequests({ page = 1, limit = 20, status = null } = {}) {
  const filter = {};
  if (status) filter.status = status;

  const [items, total] = await Promise.all([
    paginate(
      FoodRequest.find(filter).populate("ngoId", "ngoName").sort({ createdAt: -1 }),
      { page, limit },
    ).lean(),
    FoodRequest.countDocuments(filter),
  ]);

  return {
    foodRequests: items.map((r) => ({
      id: r._id,
      requestCode: r.requestCode,
      title: r.title || r.foodItem,
      status: r.status,
      priority: r.priority,
      quantityNeeded: r.quantityNeeded,
      quantityUnit: r.quantityUnit,
      ngoName: r.ngoId?.ngoName,
      neededBy: r.neededBy,
      createdAt: r.createdAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function listInventory({ page = 1, limit = 20 } = {}) {
  const [items, total] = await Promise.all([
    paginate(
      Inventory.find()
        .populate("ngoId", "ngoName")
        .sort({ createdAt: -1 }),
      { page, limit },
    ).lean(),
    Inventory.countDocuments(),
  ]);

  return {
    items: items.map((i) => ({
      id: i._id,
      batchCode: i.batchCode,
      itemName: i.itemName,
      category: i.category,
      quantity: i.quantity,
      distributedQuantity: i.distributedQuantity || 0,
      status: i.status,
      ngoName: i.ngoId?.ngoName,
      expiryDate: i.expiryDate,
      receivedAt: i.receivedAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function listAuditLogs({ page = 1, limit = 50, module = null } = {}) {
  const filter = {};
  if (module) filter.module = module;

  const [items, total] = await Promise.all([
    paginate(AuditLog.find(filter).sort({ createdAt: -1 }), { page, limit }).lean(),
    AuditLog.countDocuments(filter),
  ]);

  return {
    logs: items.map((l) => ({
      id: l._id,
      actorId: l.actorId,
      actorRole: l.actorRole,
      actorName: l.actorName,
      action: l.action,
      module: l.module,
      description: l.description,
      severity: l.severity,
      success: l.success,
      createdAt: l.createdAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function listSupportTickets({ page = 1, limit = 20, status = null } = {}) {
  const filter = {};
  if (status) filter.status = status;

  const [items, total] = await Promise.all([
    paginate(
      SupportTicket.find(filter)
        .populate("submittedBy", "fullName email role")
        .sort({ createdAt: -1 }),
      { page, limit },
    ).lean(),
    SupportTicket.countDocuments(filter),
  ]);

  return {
    tickets: items.map((t) => ({
      id: t._id,
      ticketCode: t.ticketCode,
      subject: t.subject,
      status: t.status,
      priority: t.priority,
      category: t.category,
      submitter: t.submittedBy
        ? { fullName: t.submittedBy.fullName, email: t.submittedBy.email, role: t.submittedBy.role }
        : null,
      createdAt: t.createdAt,
    })),
    pagination: paginationMeta(page, limit, total),
  };
}

export async function updateSupportTicket(ticketId, payload) {
  const ticket = await SupportTicket.findById(ticketId);
  if (!ticket) throw ApiError.notFound("Ticket not found");

  if (payload.status) ticket.status = payload.status;
  if (payload.priority) ticket.priority = payload.priority;
  if (payload.assignedTo) ticket.assignedTo = payload.assignedTo;
  if (payload.resolution) ticket.resolution = payload.resolution;
  if (payload.status === "resolved" || payload.status === "closed") {
    ticket.resolvedAt = new Date();
  }

  await ticket.save();
  return ticket.toObject();
}

export async function listNotificationsAdmin(params) {
  return notificationService.listAllNotifications(params);
}

export default {
  listUsers,
  updateUserStatus,
  listDonors,
  listVolunteers,
  listNgos,
  verifyNgo,
  listDonations,
  listDeliveries,
  listFoodRequests,
  listInventory,
  listAuditLogs,
  listSupportTickets,
  updateSupportTicket,
  listNotificationsAdmin,
};
