import roomApi from "#services/room.api.js";
import { ROOM } from "./events.js";
import type { Socket } from "socket.io";
import logger from "#configs/logger.js";
import emitToWorkflow from "./emit-to-workflow.js";

interface SocketData {
  workflowId: string;
}

type WorkflowSocket = Socket<{}, {}, {}, SocketData>;

// ----------------------
// LISTENERS
// ----------------------
export const registerRoomHandlers = (socket: WorkflowSocket) => {
  const workflowId = socket.data.workflowId;
  if (!workflowId) return;

  socket.on(ROOM.ADD, (room) => {
    roomApi.add(workflowId, room);
  });

  socket.on(ROOM.REMOVE, (roomId) => {
    roomApi.remove(roomId);
  });

  socket.on(ROOM.UPDATE, (roomId, room) => {
    roomApi.update(roomId, room);
  });
};

// ----------------------
// EMITTERS
// ----------------------
export const roomEmitter = {
  add(workflowId: string, room: any) {
    logger.info("emit room add", { workflowId });
    emitToWorkflow(workflowId, ROOM.ADD, room);
  },

  remove(workflowId: string, roomId: string) {
    logger.info("emit room remove", { workflowId, roomId });
    emitToWorkflow(workflowId, ROOM.REMOVE, roomId);
  },

  update(workflowId: string, roomId: string, room: any) {
    logger.info("emit room update", { workflowId, roomId });
    emitToWorkflow(workflowId, ROOM.UPDATE, roomId, room);
  },
};
