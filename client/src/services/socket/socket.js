import useAuthStore from "@/store/auth.store.js";
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket"],
      auth: () => ({
        token: useAuthStore.getState().token,
      }),
    });

    socket.on("connect", () => console.log("socket connected"));

    socket.on("disconnect", () => console.log("socket disconnected"));

    socket.on("connect_error", (err) => console.log(err));
  }

  return socket;
};
