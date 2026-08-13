import Notification from "../models/Notification.model.js";
import User from "../models/User.model.js";
import Donor from "../models/Donor.model.js";
import NGO from "../models/NGO.model.js";
import Volunteer from "../models/Volunteer.model.js";
import ApiError from "../utils/ApiError.js";
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  USER_ROLES,
} from "../constants/enums.js";

function mapNotification(doc) {
  return {
    id: doc._id,
    userId: doc.userId,
    type: doc.type,
    title: doc.title,
    message: doc.message,
    priority: doc.priority,
    isRead: doc.isRead,
    readAt: doc.readAt,
    relatedEntity: doc.relatedEntity,
    actionUrl: doc.actionUrl,
    metadata: doc.metadata || {},
    createdAt: doc.createdAt,
  };
}

export async function createNotification({
  userId,
  type,
  title,
  message,
  priority = NOTIFICATION_PRIORITY.MEDIUM,
  relatedEntity = null,
  actionUrl = null,
  metadata = {},
}) {
  if (!userId) return null;

  const notification = await Notification.create({
    userId,
    type,
    title,
    message,
    priority,
    relatedEntity,
    actionUrl,
    metadata,
  });

  return mapNotification(notification.toObject());
}

export async function notifyUsers(userIds, payload) {
  const unique = [...new Set(userIds.filter(Boolean).map(String))];
  if (!unique.length) return [];

  const results = await Promise.all(
    unique.map((userId) => createNotification({ ...payload, userId })),
  );
  return results.filter(Boolean);
}

export async function notifyRole(role, payload) {
  const users = await User.find({ role, isDeleted: false, isActive: true })
    .select("_id")
    .lean();
  return notifyUsers(
    users.map((u) => u._id),
    payload,
  );
}

export async function getDonationParticipantUserIds(donation) {
  const [donor, ngo, volunteer] = await Promise.all([
    donation.donorId
      ? Donor.findById(donation.donorId).select("userId").lean()
      : null,
    donation.ngoId ? NGO.findById(donation.ngoId).select("userId").lean() : null,
    donation.volunteerId
      ? Volunteer.findById(donation.volunteerId).select("userId").lean()
      : null,
  ]);

  return {
    donorUserId: donor?.userId || null,
    ngoUserId: ngo?.userId || null,
    volunteerUserId: volunteer?.userId || null,
  };
}

export async function listUserNotifications(userId, { page = 1, limit = 20, unreadOnly = false } = {}) {
  const filter = { userId };
  if (unreadOnly) filter.isRead = false;

  const skip = (page - 1) * limit;
  const [items, total, unreadCount] = await Promise.all([
    Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Notification.countDocuments(filter),
    Notification.countDocuments({ userId, isRead: false }),
  ]);

  return {
    notifications: items.map(mapNotification),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    unreadCount,
  };
}

export async function markNotificationRead(userId, notificationId) {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true, readAt: new Date() },
    { new: true },
  ).lean();

  if (!notification) {
    throw ApiError.notFound("Notification not found");
  }

  return mapNotification(notification);
}

export async function markAllNotificationsRead(userId) {
  const result = await Notification.updateMany(
    { userId, isRead: false },
    { isRead: true, readAt: new Date() },
  );
  return { modifiedCount: result.modifiedCount };
}

export async function getUnreadCount(userId) {
  return Notification.countDocuments({ userId, isRead: false });
}

export async function listAllNotifications({ page = 1, limit = 50, type = null } = {}) {
  const filter = {};
  if (type) filter.type = type;

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "fullName email role")
      .lean(),
    Notification.countDocuments(filter),
  ]);

  return {
    notifications: items.map((n) => ({
      ...mapNotification(n),
      recipient: n.userId
        ? { id: n.userId._id, fullName: n.userId.fullName, email: n.userId.email, role: n.userId.role }
        : null,
    })),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export default {
  createNotification,
  notifyUsers,
  notifyRole,
  getDonationParticipantUserIds,
  listUserNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUnreadCount,
  listAllNotifications,
  NOTIFICATION_TYPES,
  NOTIFICATION_PRIORITY,
  USER_ROLES,
};
