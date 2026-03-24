import RoomModel from "../models/room.model.js";

const getRooms = async (workflowId) => {
  return RoomModel.find({ workflowId }).lean();
};

const getRoom = async (workflowId, roomId) => {
  const room = await RoomModel.findOne({
    workflowId,
    id: roomId,
  });

  return room || null;
};

const addRoom = async (workflowId, room) => {
  return RoomModel.create({
    ...room,
    workflowId,
  });
};

const addRooms = async (workflowId, rooms) => {
  const docs = rooms.map((room) => ({
    ...room,
    workflowId,
  }));

  return RoomModel.insertMany(docs);
};

const removeRoom = async (workflowId, roomId) => {
  return RoomModel.deleteOne({
    workflowId,
    id: roomId,
  });
};

const updateRoom = async (workflowId, roomId, updateFields) => {
  return RoomModel.findOneAndUpdate(
    { workflowId, id: roomId },
    { $set: updateFields },
    { new: true, runValidators: true }
  );
};

export default {
  getRooms,
  getRoom,
  addRoom,
  addRooms,
  removeRoom,
  updateRoom,
};