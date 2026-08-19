import { Room } from "./room.model.js";
import { roomRepository } from "./room.repository.js";


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
