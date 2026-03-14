import workflowGRPC from "../../workflow-service/routes/workflow.grpc.js";
import { WORKFLOW_EVENTS } from "../lib/const.js";

const roomSocket = (io, socket) => {
  socket.on(WORKFLOW_EVENTS.ROOM_ADD, (workflowId, room) => {
    workflowGRPC.addRoomGRPC(workflowId, room);
    console.log(WORKFLOW_EVENTS.ROOM_ADD, workflowId, room);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_REMOVE, (workflowId, roomId) => {
    workflowGRPC.removeRoomGRPC(workflowId, roomId);
    console.log(WORKFLOW_EVENTS.ROOM_REMOVE, workflowId, roomId);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_UPDATE, (workflowId, roomId, room) => {
    workflowGRPC.updateRoomGRPC(workflowId, roomId, room);
    console.log(WORKFLOW_EVENTS.ROOM_UPDATE, workflowId, roomId, room);
  });
};

export default roomSocket;
