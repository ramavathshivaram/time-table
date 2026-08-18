import { env } from "@/app/config/env";
import { io, type Socket } from "socket.io-client";

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(env.backendUrl, {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket"],
    });
  }

  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService = new SocketService();
