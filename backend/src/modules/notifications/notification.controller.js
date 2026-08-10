import notificationService from "../../services/notification.service.js";
import { sendOk } from "../../utils/responseHandler.js";

const listMine = async (req, res) => {
  const result = await notificationService.listUserNotifications(req.user.id, {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 20,
    unreadOnly: req.query.unreadOnly === "true",
  });
  sendOk(res, "Notifications fetched", result);
};

const unreadCount = async (req, res) => {
  const count = await notificationService.getUnreadCount(req.user.id);
  sendOk(res, "Unread count fetched", { count });
};

const markRead = async (req, res) => {
  const notification = await notificationService.markNotificationRead(
    req.user.id,
    req.params.id,
  );
  sendOk(res, "Notification marked as read", { notification });
};

const markAllRead = async (req, res) => {
  const result = await notificationService.markAllNotificationsRead(req.user.id);
  sendOk(res, "All notifications marked as read", result);
};

export default { listMine, unreadCount, markRead, markAllRead };
