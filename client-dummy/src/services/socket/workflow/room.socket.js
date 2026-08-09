import { ROOM } from "./events.js";
import { getSocket } from "../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";
import emit from "./emit.js";

export const roomEmit = {
  add(room) {
    emit(ROOM.ADD, room);
  },

  remove(roomId) {
    emit(ROOM.REMOVE, roomId);
  },

  update(roomId, roomData) {
    emit(ROOM.UPDATE, roomId, roomData);
  },
};

export const registerRoomHandlers = () => {
  const socket = getSocket();

  socket.on(ROOM.ADD, (room) => {
    console.log("⬇️ ROOM.ADD", room);
    useWorkflowStore.getState().addRoomLocal(room);
  });

  socket.on(ROOM.REMOVE, (roomId) => {
    console.log("⬇️ ROOM.REMOVE", roomId);
    useWorkflowStore.getState().removeRoomLocal(roomId);
  });

  socket.on(ROOM.UPDATE, (roomId, roomData) => {
    console.log("⬇️ ROOM.UPDATE", roomId, roomData);
    useWorkflowStore.getState().updateRoomLocal(roomId, roomData);
  });
};

export const cleanupRoomListeners = () => {
  const socket = getSocket();

  socket.off(ROOM.ADD);
  socket.off(ROOM.REMOVE);
  socket.off(ROOM.UPDATE);
};