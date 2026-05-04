import mongoose, { Types } from "mongoose";

export interface IWorkflow extends mongoose.Document {
  userId: Types.ObjectId;
  title: string;
}

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
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Workflow", workflowSchema);
