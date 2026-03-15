import useWorkflowStore from "@/store/workflow.store";
import {
  addRoomEmit,
  removeRoomEmit,
  updateRoomEmit,
} from "@/services/socket/workflow/emitters/room.emit";

const roomService = {
  addRoom(room) {
    const { workflowId } = useWorkflowStore.getState();
    addRoomEmit(workflowId, room);

    useWorkflowStore.setState((state) => ({
      rooms: [...state.rooms, room],
    }));
  },

  removeRoom(roomId) {
    const { workflowId } = useWorkflowStore.getState();
    removeRoomEmit(workflowId, roomId);

    useWorkflowStore.setState((state) => ({
      rooms: state.rooms.filter((r) => r.id !== roomId),
    }));
  },

  updateRoom(roomId, roomData) {
    const { workflowId } = useWorkflowStore.getState();
    updateRoomEmit(workflowId, roomId, roomData);

    useWorkflowStore.setState((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId ? roomData : r
      ),
    }));
  },
};

export default roomService;