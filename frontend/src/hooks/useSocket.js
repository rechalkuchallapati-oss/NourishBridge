import { useEffect, useRef, useCallback } from "react";
import { connectSocket, disconnectSocket, REALTIME_EVENTS } from "../modules/socket/socketClient.js";

export function useSocket(eventHandlers = {}) {
  const handlersRef = useRef(eventHandlers);
  handlersRef.current = eventHandlers;

  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return undefined;

    const wrap = (event) => (payload) => {
      handlersRef.current[event]?.(payload);
    };

    const events = Object.values(REALTIME_EVENTS);
    events.forEach((event) => {
      socket.on(event, wrap(event));
    });

    return () => {
      events.forEach((event) => socket.off(event, wrap(event)));
      disconnectSocket();
    };
  }, []);

  const joinDelivery = useCallback((deliveryId) => {
    const socket = connectSocket();
    socket?.emit("join:delivery", deliveryId);
  }, []);

  const leaveDelivery = useCallback((deliveryId) => {
    const socket = connectSocket();
    socket?.emit("leave:delivery", deliveryId);
  }, []);

  return { joinDelivery, leaveDelivery, REALTIME_EVENTS };
}

export default useSocket;
