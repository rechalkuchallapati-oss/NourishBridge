import notificationApi from "../api/client.js";

export async function fetchMyNotifications(params) {
  const { data } = await notificationApi.list(params);
  return data.data;
}

export async function fetchUnreadCount() {
  const { data } = await notificationApi.unreadCount();
  return data.data.count;
}

export async function markNotificationRead(id) {
  const { data } = await notificationApi.markRead(id);
  return data.data.notification;
}

export async function markAllNotificationsRead() {
  const { data } = await notificationApi.markAllRead();
  return data.data;
}

export default {
  fetchMyNotifications,
  fetchUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
};
