import { socketService } from "@/shared/socket/socket.service";
import type { Room } from "../types";

export const roomSocket = {
  create: (designerId: string, room: Omit<Room, "id">) => {
    const socket = socketService.getSocket();
    socket.emit("room:create", {
      designerId,
      room,
    });
  },

  update: (designerId: string, roomId: string, data: Partial<Room>) => {
    const socket = socketService.getSocket();
    socket.emit("room:update", {
      designerId,
      roomId,
      data,
    });
  },

  delete: (designerId: string, roomId: string) => {
    const socket = socketService.getSocket();
    socket.emit("room:delete", {
      designerId,
      roomId,
    });
  },
};
