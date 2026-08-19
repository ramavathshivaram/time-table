import { socketService } from "@/shared/socket/socket.service";
import type { Subject } from "../types";

export const subjectSocket = {
  create: (designerId: string, subject: Omit<Subject, "id">) => {
    const socket = socketService.getSocket();
    socket.emit("subject:create", {
      designerId,
      subject,
    });
  },

  update: (designerId: string, subjectId: string, data: Partial<Subject>) => {
    const socket = socketService.getSocket();
    socket.emit("subject:update", {
      designerId,
      subjectId,
      data,
    });
  },

  delete: (designerId: string, subjectId: string) => {
    const socket = socketService.getSocket();
    socket.emit("subject:delete", {
      designerId,
      subjectId,
    });
  },
};
