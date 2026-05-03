import mongoose, { Types } from "mongoose";

export interface INode extends mongoose.Document {
  workflowId: Types.ObjectId;

  id: string;

  type: "start" | "college" | "branch" | "year" | "section";

  position: {
    x: number;
    y: number;
  };

  data: {
    label: string;
    type?: string;
  };
}

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
    type: { type: String },
  },
});

const NodeModel = mongoose.model("Node", nodeSchema);

export default NodeModel;
