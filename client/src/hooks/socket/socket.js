import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });
  }

  return socket;
};
