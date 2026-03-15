import workflowModel from "../models/workflow.model.js";

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


export default { addRoom, removeRoom, updateRoom };