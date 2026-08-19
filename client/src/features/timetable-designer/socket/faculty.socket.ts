import { socketService } from "@/shared/socket/socket.service";
import type { Faculty } from "../types";

export const facultySocket = {
  create: (designerId: string, faculty: Omit<Faculty, "id">) => {
    const socket = socketService.getSocket();

    socket.emit("faculty:create", {
      designerId,
      faculty,
    });
  },

  update: (designerId: string, facultyId: string, data: Partial<Faculty>) => {
    const socket = socketService.getSocket();

    socket.emit("faculty:update", {
      designerId,
      facultyId,
      data,
    });
  },

  delete: (designerId: string, facultyId: string) => {
    const socket = socketService.getSocket();

    socket.emit("faculty:delete", {
      designerId,
      facultyId,
    });
  },
};
