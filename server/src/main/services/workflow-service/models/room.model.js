import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  workflowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workflow",
    required: true,
    index: true,
  },

  id: {
    type: String,
    required: true,
    index: true,
  },

  name: {
    type: String,
    required: true,
  },

  roomNumber: {
    type: String,
    required: true,
  },

  isLab: {
    type: Boolean,
    default: false,
  },
});

const RoomModel = mongoose.model("Room", roomSchema);

export default RoomModel;
