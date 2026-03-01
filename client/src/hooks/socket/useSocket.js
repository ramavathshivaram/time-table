import { useCallback } from "react";
import socket from "./socket.js";

const useSocket = () => {

  const connectSocket = useCallback(() => {
    if (socket.connected) return;

    socket.connect();
    console.log("socket connected");
  }, []);

  const disconnectSocket = useCallback(() => {
    socket.disconnect();
    console.log("socket disconnected");
  }, []);

  return { socket, connectSocket, disconnectSocket };
};

export default useSocket;