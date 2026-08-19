import { socketService } from "@/shared/socket/socket.service";

interface TimetableDesignerResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const timetableDesignerSocket = {
  get: <T>(timetableId: string): Promise<T> => {
    const socket = socketService.getSocket();

    return new Promise<T>((resolve, reject) => {
      if (!socket.connected) {
        reject(new Error("Socket is not connected"));
        return;
      }

      socket.emit(
        "timetable-designer:get",
        { timetableId },
        (response: TimetableDesignerResponse<T>) => {
          if (!response.success) {
            reject(
              new Error(
                response.message ?? "Failed to load timetable designer",
              ),
            );
            return;
          }

          if (!response.data) {
            reject(new Error("Timetable designer data is missing."));
            return;
          }

          resolve(response.data);
        },
      );
    });
  },
};
