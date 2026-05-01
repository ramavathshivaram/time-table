import mongoose from "mongoose";

const edgeSchema = new mongoose.Schema({
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

  source: {
    type: String,
    required: true,
  },

  target: {
    type: String,
    required: true,
  },

  sourceHandle: String,
  targetHandle: String,

  type: {
    type: String,
    default: "bezier",
  },
});

const EdgeModel = mongoose.model("Edge", edgeSchema);

export default EdgeModel;
