import mongoose from "mongoose";

const workflowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },

    nodes: [{}],

    edges: [{}],

    faculties: [{}],

    subjects: [{}],

    rooms: [{}],

    messages: [{}],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Workflow", workflowSchema);
