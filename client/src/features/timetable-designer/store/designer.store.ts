import { create } from "zustand";
import type { Designer, Faculty, Room, Subject, Message } from "../types";

type DesignerState = {
  faculties: Faculty[];
  subjects: Subject[];
  rooms: Room[];
  messages: Message[];

  init: (data: Designer) => void;

  setFaculties: (faculties: Faculty[]) => void;
  setSubjects: (subjects: Subject[]) => void;
  setRooms: (rooms: Room[]) => void;

  // ROOMS
  getRooms: () => Room[];
  getRoom: (roomId: string) => Room | undefined;
  addRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;
  updateRoom: (roomId: string, roomData: Room) => void;
};

export const useDesignerStore = create<DesignerState>((set, get) => ({
  faculties: [],
  subjects: [],
  rooms: [],
  messages: [],

  init: (data) =>
    set({
      faculties: data.faculties,
      subjects: data.subjects,
      rooms: data.rooms,
    }),

  setFaculties: (faculties) => set({ faculties }),

  setSubjects: (subjects) => set({ subjects }),

  setRooms: (rooms) => set({ rooms }),

  // ROOMS
  getRooms: () => get().rooms,
  getRoom: (roomId) => get().rooms.find((r) => r.id === roomId),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  removeRoom: (roomId) =>
    set((state) => ({ rooms: state.rooms.filter((r) => r.id !== roomId) })),
  updateRoom: (roomId, roomData) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === roomId ? roomData : r)),
    })),
}));
