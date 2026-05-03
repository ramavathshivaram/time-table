import mongoose, { Types } from "mongoose";

export interface IFaculty {
  workflowId: Types.ObjectId;
  id: string;
  name: string;
  subjects: string[];
}

const facultySchema = new mongoose.Schema({
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

  subjects: {
    type: [String],
    default: [],
  },
});

const FacultyModel = mongoose.model("Faculty", facultySchema);

export default FacultyModel;
