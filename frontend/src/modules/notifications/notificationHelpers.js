import {
  fetchMyNotifications,
  fetchUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
} from "./services/notificationService.js";

export function apiNotificationToUi(notification) {
  return {
    id: notification.id,
    title: notification.title,
    body: notification.message,
    message: notification.message,
    type: notification.type,
    priority: notification.priority,
    unread: !notification.isRead,
    isRead: notification.isRead,
    time: notification.createdAt
      ? new Date(notification.createdAt).toLocaleString("en-IN")
      : "",
    createdAt: notification.createdAt,
    actionUrl: notification.actionUrl,
    relatedEntity: notification.relatedEntity,
  };
}

export async function loadNotifications(params) {
  const result = await fetchMyNotifications(params);
  return {
    notifications: (result.notifications || []).map(apiNotificationToUi),
    pagination: result.pagination,
    unreadCount: result.unreadCount,
  };
}

export async function loadUnreadCount() {
  return fetchUnreadCount();
}

export async function markRead(id) {
  const notification = await markNotificationRead(id);
  return apiNotificationToUi(notification);
}

export async function markAllRead() {
  return markAllNotificationsRead();
}

export default {
  apiNotificationToUi,
  loadNotifications,
  loadUnreadCount,
  markRead,
  markAllRead,
};
