import mongoose from "mongoose";
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

const connectDB = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/timeTable";

    await mongoose.connect(MONGODB_URI, mongoOptions);
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error);
  }
};

export default connectDB;
