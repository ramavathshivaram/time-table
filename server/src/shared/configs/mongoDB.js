import mongoose from "mongoose";
import env from "#configs/env.js";
import logger from "#configs/logger.js";

mongoose.connection.on("connected", () => {
  logger.info("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  logger.info("Disconnected from MongoDB");
});

mongoose.connection.on("error", (error) => {
  logger.error("MongoDB connection error:", error);
});

const mongoOptions = {
  minPoolSize: 5,
  maxPoolSize: 10,

  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  heartbeatFrequencyMS: 10000,

  retryWrites: true,
};

const connectDB = async (retries = 5, delay = 5000) => {
  const MONGODB_URI = env.MONGODB_URI || "mongodb://localhost:27017/timeTable";

  try {
    await mongoose.connect(MONGODB_URI, mongoOptions);
  } catch (error) {
    if (retries === 0) {
      logger.error("No retries left. Exiting...");
      process.exit(1);
    }

    logger.warn(`Retrying MongoDB connection in ${delay / 1000}s...`);

    setTimeout(() => connectDB(retries - 1, delay), delay);
  }
};

export default connectDB;
