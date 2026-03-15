import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";

export const addRoomEmit = (workflowId, room) => {
  console.log("add room emit", workflowId, room);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.ROOM_ADD, room);
};

export const removeRoomEmit = (workflowId, roomId) => {
  console.log("remove room emit", workflowId, roomId);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.ROOM_REMOVE, roomId);
};

export const updateRoomEmit = (workflowId, roomId, room) => {
  console.log("update room emit", workflowId, roomId, room);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.ROOM_UPDATE, roomId, room);
};
