import roomRepository from "../repositorys/room.repository.js";

const getRoomsGRPC = async (workflowId) => {
  return await roomRepository.getRooms(workflowId);
};

const getRoomGRPC = async (workflowId, roomId) => {
  return await roomRepository.getRoom(workflowId, roomId);
};

const addRoomGRPC = async (workflowId, room) => {
  await roomRepository.addRoom(workflowId, room);
};

const removeRoomGRPC = async (workflowId, room) => {
  await roomRepository.removeRoom(workflowId, room);
};

const updateRoomGRPC = async (workflowId, roomId, roomData) => {
  await roomRepository.updateRoom(workflowId, roomId, roomData);
};

export default {
  getRoomsGRPC,
  getRoomGRPC,
  addRoomGRPC,
  removeRoomGRPC,
  updateRoomGRPC,
};
