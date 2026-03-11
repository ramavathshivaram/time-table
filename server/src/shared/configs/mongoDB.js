import mongoose from "mongoose";

mongoose.connection.on("connected", ( ) => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

const mongoOptions = {
  minPoolSize: 5,
  maxPoolSize: 10,
};

const connectDB = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/timeTable";

    await mongoose.connect(MONGODB_URI, mongoOptions);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default connectDB;
