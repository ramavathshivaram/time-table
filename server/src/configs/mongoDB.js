import mongoose from "mongoose";

const mongoOptions = {
  minPoolSize: 5,
  maxPoolSize: 10,
};

const connectDB = async () => {
  try {
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/timeTable";

    await mongoose.connect(MONGODB_URI, mongoOptions);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
