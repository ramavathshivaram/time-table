import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
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

  duration: {
    type: Number,
    required: true,
  },

  isLab: {
    type: Boolean,
    default: false,
  },
});

const SubjectModel = mongoose.model("Subject", subjectSchema);

export default SubjectModel;
