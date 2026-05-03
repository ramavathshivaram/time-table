import useWorkflowStore from "@/store/workflow.store.js";
import {roomEmit} from "@/services/socket/workflow/room.socket.js";

const roomService = {
  addRoom(room) {
    roomEmit.add(room);

    useWorkflowStore.getState().addRoomLocal(room);
  },

  removeRoom(roomId) {
    roomEmit.remove(roomId);

    useWorkflowStore.getState().removeRoomLocal(roomId);
  },

  updateRoom(roomId, roomData) {
    roomEmit.update(roomId, roomData);

    useWorkflowStore.getState().updateRoomLocal(roomId, roomData);
  },
};

export default roomService;
