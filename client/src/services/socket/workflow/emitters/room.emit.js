import WORKFLOW_EVENTS from "../events.js";
import { getSocket } from "../../socket.js";

const socket = getSocket();

const logEmit = (event, payload) => {
  console.group(`📡 SOCKET EMIT: ${event}`);
  console.log("payload:", payload);
  console.log("time:", new Date().toISOString());
  console.groupEnd();
};

export const addRoomEmit = (room) => {
  logEmit(WORKFLOW_EVENTS.ROOM_ADD, room);
  socket.emit(WORKFLOW_EVENTS.ROOM_ADD, room);
};

export const removeRoomEmit = (roomId) => {
  logEmit(WORKFLOW_EVENTS.ROOM_REMOVE, roomId);
  socket.emit(WORKFLOW_EVENTS.ROOM_REMOVE, roomId);
};

export const updateRoomEmit = (roomId, roomData) => {
  logEmit(WORKFLOW_EVENTS.ROOM_UPDATE, roomData);
  socket.emit(WORKFLOW_EVENTS.ROOM_UPDATE, roomId, roomData);
};
