import {roomController} from "#services/workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../../lib/const.js";

const roomSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.ROOM_ADD, (workflowId, room) => {
    roomController.addRoomGRPC(workflowId, room);
    console.log(WORKFLOW_EVENTS.ROOM_ADD, workflowId, room);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_REMOVE, (workflowId, roomId) => {
    roomController.removeRoomGRPC(workflowId, roomId);
    console.log(WORKFLOW_EVENTS.ROOM_REMOVE, workflowId, roomId);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_UPDATE, (workflowId, roomId, room) => {
    roomController.updateRoomGRPC(workflowId, roomId, room);
    console.log(WORKFLOW_EVENTS.ROOM_UPDATE, workflowId, roomId, room);
  });
};

export default roomSocket;
