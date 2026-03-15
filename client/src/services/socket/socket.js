import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      autoConnect: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("socket connected"));

    socket.on("connect_error", (err) => console.log(err));
  }

  return socket;
};
