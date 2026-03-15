import roomRepository from "../repositorys/room.repository.js";

const addRoomGRPC = async (workflowId, room) => {
  await roomRepository.addRoom(workflowId, room);
};

const removeRoomGRPC = async (workflowId, room) => {
  await roomRepository.removeRoom(workflowId, room);
};

const updateRoomGRPC = async (workflowId, roomId, roomData) => {
  await roomRepository.updateRoom(workflowId, roomId, roomData);
};

export default { addRoomGRPC, removeRoomGRPC, updateRoomGRPC };
