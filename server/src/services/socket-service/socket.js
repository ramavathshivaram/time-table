import { Server } from "socket.io";
import onlineUsers from "./onlineUsers.js";
import getUserIdFromCookie from "./middlewares/getUserIdFromCookie.js";

import workflowSocketInit from "./workflow-socket/workflow.socket.js";

const socketInit = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(getUserIdFromCookie);

  io.on("connection", (socket) => {
    onlineUsers.addUser(socket.userId, socket.id);
    console.log("User connected:", socket.userId, socket.id);

    //! Init workflow socket
    workflowSocketInit(io, socket);

    socket.on("disconnect", () => {
      onlineUsers.removeUserBySocketId(socket.id);
      console.log("User disconnected:", socket.userId, socket.id);
    });
  });
};

export default socketInit;
