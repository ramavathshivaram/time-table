import workflowModel from "../models/workflow.model.js";

const getRooms = async (workflowId) => {
  const workflow = await workflowModel
    .findById(workflowId)
    .select("rooms")
    .lean();

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow.rooms;
};

const getRoom = async (workflowId, roomId) => {
  const workflow = await workflowModel
    .findById(workflowId)
    .select("rooms")
    .lean();

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow.rooms.find((room) => room.id === roomId);
};

const addRoom = async (workflowId, room) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { rooms: room },
  });
};

const removeRoom = async (workflowId, roomId) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { rooms: { id: roomId } },
  });
};

const updateRoom = async (workflowId, roomId, roomData) => {
  await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "rooms.id": roomId,
    },
    {
      $set: {
        "rooms.$": roomData,
      },
    },
  );
};

export default {
  getRooms,
  getRoom,
  addRoom,
  removeRoom,
  updateRoom,
};
