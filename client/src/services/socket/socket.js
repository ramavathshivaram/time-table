import useAuthStore from "@/store/auth.store.js";
import { io } from "socket.io-client";
import handleSocketAuthError from "./handleSocketAuthError.js";

const handleError = async (err) => {
  console.log("⚠️", err.message);

  if (
    err.message === "Authentication error" ||
    err.message.includes("Authentication")
  ) {
    await handleSocketAuthError();
  }
};

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("✅ socket connected"));
    socket.on("disconnect", () => console.log("❌ socket disconnected"));
    socket.on("connect_error", handleError);
  }

  return socket;
};

export const connectSocket = () => {
  const socket = getSocket();
  const token = useAuthStore.getState().token;

  socket.auth = { token };
  socket.connect();
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
