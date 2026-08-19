import { Room } from "#features/timetable-designer/room/room.model.js";
import { roomRepository } from "#features/timetable-designer/room/room.repository.js";

export const roomProcessor = {
  add: async (room: Room) => {
    await roomRepository.create(room);
  },
  update: async (room: Room) => {
    await roomRepository.updateById(room.id, room);
  },
  remove: async (roomId: string) => {
    await roomRepository.deleteById(roomId);
  },
};
