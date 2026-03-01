import dotEnv from "dotenv";
dotEnv.config();
import http from "http";

import connectDB from "./shared/configs/mongoDB.js";
import app from "./services/app.js";

import socketInit from "./services/socket-service/socket.js";

const server = http.createServer(app);

socketInit(server);

const port = process.env.PORT || 8080;

const serverInit = async () => {
  await connectDB();

  server.listen(port, () => {
    console.log(`auth server started on ${port}`);
  });
};

serverInit();
