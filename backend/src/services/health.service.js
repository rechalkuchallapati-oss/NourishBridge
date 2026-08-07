import mongoose from "mongoose";

/**
 * Returns API health including database connectivity status.
 */
const getHealthStatus = async () => {
  const dbState = mongoose.connection.readyState;
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return {
    status: dbState === 1 ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: dbStates[dbState] || "unknown",
      name: mongoose.connection.name || null,
    },
    memory: {
      usedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    },
  };
};

export default { getHealthStatus };
