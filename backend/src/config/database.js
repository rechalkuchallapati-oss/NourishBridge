import mongoose from "mongoose";
import config from "./index.js";
import logger from "../utils/logger.js";

/**
 * Connect to MongoDB with sensible defaults for production workloads.
 */
const connectDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(config.mongodb.uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error:", err.message);
    });

    return conn;
  } catch (error) {
    logger.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

/**
 * Gracefully close the MongoDB connection.
 */
export const disconnectDatabase = async () => {
  await mongoose.connection.close();
  logger.info("MongoDB connection closed");
};

export default connectDatabase;
