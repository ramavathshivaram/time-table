import WORKFLOW_EVENTS from "../events.js";

import { getSocket } from "../../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";

const roomListenerInit = () => {
  const socket = getSocket();

  socket.on(WORKFLOW_EVENTS.ROOM_ADD, (room) => {
    console.log(WORKFLOW_EVENTS.ROOM_ADD, room);

    useWorkflowStore.getState().addRoomLocal(room);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_REMOVE, (roomId) => {
    console.log(WORKFLOW_EVENTS.ROOM_REMOVE, roomId);

    useWorkflowStore.getState().removeRoomLocal(roomId);
  });

  socket.on(WORKFLOW_EVENTS.ROOM_UPDATE, (roomId, roomData) => {
    console.log(WORKFLOW_EVENTS.ROOM_UPDATE, roomId, roomData);

    useWorkflowStore.getState().updateRoomLocal(roomId, roomData);
  });
};

export default roomListenerInit;
