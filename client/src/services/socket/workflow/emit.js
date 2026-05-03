import { getSocket } from "../socket.js";
const emit = (event, ...args) => {
  const socket = getSocket();

  console.group(`📡 SOCKET EMIT: ${event}`);
  console.log("payload:", args);
  console.log("time:", new Date().toISOString());
  console.groupEnd();

  socket.emit(event, ...args);
};

export default emit;
