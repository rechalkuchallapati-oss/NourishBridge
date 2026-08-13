import { io } from "socket.io-client";
import { getAccessToken } from "../auth/storage/tokenStorage.js";

function resolveSocketUrl() {
  const apiBase = import.meta.env.VITE_API_BASE_URL;
  if (apiBase) {
    return apiBase.replace(/\/api\/v1\/?$/, "");
  }
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL.replace(/\/$/, "");
  }
  if (import.meta.env.DEV && typeof window !== "undefined") {
    return window.location.origin;
  }
  return typeof window !== "undefined" ? window.location.origin : "";
}

const SOCKET_URL = resolveSocketUrl();

let socket = null;

export function connectSocket() {
  const token = getAccessToken();
  if (!token) return null;

  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    autoConnect: true,
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}

export const REALTIME_EVENTS = {
  NOTIFICATION: "notification",
  VOLUNTEER_ASSIGNED: "volunteer_assigned",
  PICKUP_STATUS: "pickup_status",
  DELIVERY_STATUS: "delivery_status",
  NEW_DONATION: "new_donation",
  NGO_ACCEPTED: "ngo_accepted",
  CRITICAL_ALERT: "critical_alert",
  ADMIN_UPDATE: "admin_update",
  VOLUNTEER_LOCATION: "volunteer_location",
};

export default { connectSocket, disconnectSocket, getSocket, REALTIME_EVENTS };
