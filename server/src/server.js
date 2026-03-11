import dotEnv from "dotenv";
dotEnv.config();
import http from "http";

import connectDB from "./shared/configs/mongoDB.js";
import app from "./services/app.js";

import socketInit from "./services/socket-service/socket.js";
import mongoose from "mongoose";
import redis from "#configs/redis.js";

const server = http.createServer(app);

// Init socket
socketInit(server);

const port = process.env.PORT || 8080;

const serverInit = async () => {
  await connectDB();

  server.listen(port, () => {
    console.log(`Server started on ${port}`);
  });
};

serverInit();

const gracefulShutdown = () => {
  console.log("shutting down server...");

  server.close(async () => {
    await redis.disconnect();

    await mongoose.disconnect();

    console.log("server closed");
    process.exit(0);
  });
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
