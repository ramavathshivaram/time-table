import { roomController } from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const roomSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.ROOM_ADD, (room) => {
    roomController.addRoomGRPC(socket.workflowId, room);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_REMOVE, (roomId) => {
    roomController.removeRoomGRPC(socket.workflowId, roomId);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_UPDATE, (roomId, room) => {
    roomController.updateRoomGRPC(socket.workflowId, roomId, room);
  });
};

export default roomSocket;
