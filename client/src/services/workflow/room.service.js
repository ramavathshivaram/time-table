import useWorkflowStore from "@/store/workflow.store";
import {
  addRoomEmit,
  removeRoomEmit,
  updateRoomEmit,
} from "@/services/socket/workflow/emitters/room.emit";

const roomService = {
  addRoom(room) {
    addRoomEmit(room);

    useWorkflowStore.getState().addRoomLocal(room);
  },

  removeRoom(roomId) {
    removeRoomEmit(roomId);

    useWorkflowStore.getState().removeRoomLocal(roomId);
  },

  updateRoom(roomId, roomData) {
    updateRoomEmit(roomId, roomData);

    useWorkflowStore.getState().updateRoomLocal(roomId, roomData);
  },
};

export default roomService;
