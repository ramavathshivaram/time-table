import RoomModel from "../models/room.model.js";
import logger from "#configs/logger.js";

const getRooms = async (workflowId) => {
  try {
    return await RoomModel.find({ workflowId }).lean();
  } catch (error) {
    logger.error("Error in getRooms", {
      workflowId,
      error: error.message,
    });
    return [];
  }
};

const getRoom = async (workflowId, roomId) => {
  try {
    const room = await RoomModel.findOne({
      workflowId,
      id: roomId,
    });

    return room || null;
  } catch (error) {
    logger.error("Error in getRoom", {
      workflowId,
      roomId,
      error: error.message,
    });
    return null;
  }
};

const addRoom = async (workflowId, room) => {
  try {
    return await RoomModel.create({
      ...room,
      workflowId,
    });
  } catch (error) {
    logger.error("Error in addRoom", {
      workflowId,
      room,
      error: error.message,
    });
    return null;
  }
};

const addRooms = async (workflowId, rooms) => {
  try {
    const docs = rooms.map((room) => ({
      ...room,
      workflowId,
    }));

    return await RoomModel.insertMany(docs);
  } catch (error) {
    logger.error("Error in addRooms", {
      workflowId,
      roomsCount: rooms?.length,
      error: error.message,
    });
    return [];
  }
};

const removeRoom = async (workflowId, roomId) => {
  try {
    return await RoomModel.deleteOne({
      workflowId,
      id: roomId,
    });
  } catch (error) {
    logger.error("Error in removeRoom", {
      workflowId,
      roomId,
      error: error.message,
    });
    return null;
  }
};

const updateRoom = async (workflowId, roomId, updateFields) => {
  try {
    return await RoomModel.findOneAndUpdate(
      { workflowId, id: roomId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
  } catch (error) {
    logger.error("Error in updateRoom", {
      workflowId,
      roomId,
      updateFields,
      error: error.message,
    });
    return null;
  }
};

export default {
  getRooms,
  getRoom,
  addRoom,
  addRooms,
  removeRoom,
  updateRoom,
};