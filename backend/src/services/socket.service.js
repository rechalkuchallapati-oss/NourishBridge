import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import logger from "../utils/logger.js";
import { USER_ROLES } from "../constants/enums.js";

let io = null;

export const REALTIME_EVENTS = Object.freeze({
  NOTIFICATION: "notification",
  VOLUNTEER_ASSIGNED: "volunteer_assigned",
  PICKUP_STATUS: "pickup_status",
  DELIVERY_STATUS: "delivery_status",
  NEW_DONATION: "new_donation",
  NGO_ACCEPTED: "ngo_accepted",
  CRITICAL_ALERT: "critical_alert",
  ADMIN_UPDATE: "admin_update",
  VOLUNTEER_LOCATION: "volunteer_location",
});

function roomForUser(userId) {
  return `user:${userId}`;
}

function roomForRole(role) {
  return `role:${role}`;
}

function roomForDelivery(deliveryId) {
  return `delivery:${deliveryId}`;
}

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: config.cors.origins,
      credentials: true,
    },
    path: "/socket.io",
  });

  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.replace(/^Bearer\s+/i, "");
      if (!token) return next(new Error("Authentication required"));

      const payload = jwt.verify(token, config.jwt.accessSecret);
      socket.user = {
        id: payload.sub,
        role: payload.role,
        fullName: payload.fullName,
      };
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const { id, role } = socket.user;
    socket.join(roomForUser(id));
    socket.join(roomForRole(role));

    if (role === USER_ROLES.ADMIN) {
      socket.join("admin:ops");
    }

    socket.on("join:delivery", (deliveryId) => {
      if (deliveryId) socket.join(roomForDelivery(deliveryId));
    });

    socket.on("leave:delivery", (deliveryId) => {
      if (deliveryId) socket.leave(roomForDelivery(deliveryId));
    });

    socket.on("disconnect", () => {
      logger.debug(`Socket disconnected: ${id}`);
    });
  });

  logger.info("Socket.IO initialized");
  return io;
}

export function getIO() {
  return io;
}

export function emitToUser(userId, event, payload) {
  if (!io || !userId) return;
  io.to(roomForUser(String(userId))).emit(event, payload);
}

export function emitToRole(role, event, payload) {
  if (!io || !role) return;
  io.to(roomForRole(role)).emit(event, payload);
}

export function emitToAdmins(event, payload) {
  if (!io) return;
  io.to("admin:ops").emit(event, payload);
}

export function emitToDelivery(deliveryId, event, payload) {
  if (!io || !deliveryId) return;
  io.to(roomForDelivery(String(deliveryId))).emit(event, payload);
}

export function broadcastVolunteerLocation({ deliveryId, volunteerId, coordinates, missionId }) {
  const payload = {
    deliveryId,
    volunteerId,
    missionId,
    coordinates,
    timestamp: new Date().toISOString(),
  };
  emitToDelivery(deliveryId, REALTIME_EVENTS.VOLUNTEER_LOCATION, payload);
  emitToRole(USER_ROLES.ADMIN, REALTIME_EVENTS.VOLUNTEER_LOCATION, payload);
  emitToRole(USER_ROLES.NGO, REALTIME_EVENTS.VOLUNTEER_LOCATION, payload);
}

export async function closeSocket() {
  if (!io) return;
  await new Promise((resolve) => {
    io.close(() => {
      io = null;
      logger.info("Socket.IO closed");
      resolve();
    });
  });
}

export default {
  REALTIME_EVENTS,
  initSocket,
  getIO,
  closeSocket,
  emitToUser,
  emitToRole,
  emitToAdmins,
  emitToDelivery,
  broadcastVolunteerLocation,
};
