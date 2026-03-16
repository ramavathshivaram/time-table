import { roomController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";
import logger from "#configs/logger.js";

const roomSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.ROOM_ADD, (workflowId, room) => {
    roomController.addRoomGRPC(workflowId, room);
    logger.info(WORKFLOW_EVENTS.ROOM_ADD, workflowId, room);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_REMOVE, (workflowId, roomId) => {
    roomController.removeRoomGRPC(workflowId, roomId);
    logger.info(WORKFLOW_EVENTS.ROOM_REMOVE, workflowId, roomId);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_UPDATE, (workflowId, roomId, room) => {
    roomController.updateRoomGRPC(workflowId, roomId, room);
    logger.info(WORKFLOW_EVENTS.ROOM_UPDATE, workflowId, roomId, room);
  });
};

export default roomSocket;
