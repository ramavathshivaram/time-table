import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
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

  type: {
    type: String,
    enum: ["start", "college", "branch", "year", "section"],
    required: true,
  },

  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },

  data: {
    label: { type: String, required: true },
    type: { type: String, required: true },
  },
});

const NodeModel = mongoose.model("Node", nodeSchema);

export default NodeModel;
