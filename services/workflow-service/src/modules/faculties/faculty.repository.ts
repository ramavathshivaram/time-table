import FacultyModel, { type IFaculty } from "./faculty.model.js";

// GET ALL
const getFaculties = async (
  workflowId: IFaculty["workflowId"]
): Promise<IFaculty[]> => {
  return FacultyModel.find({ workflowId }).lean();
};

// GET ONE
const getFaculty = async (
  facultyId: IFaculty["id"]
): Promise<IFaculty | null> => {
  return FacultyModel.findOne({
    id: facultyId,
  }).lean();
};

// ADD
const addFaculty = async (
  workflowId: IFaculty["workflowId"],
  faculty: Partial<IFaculty>
): Promise<IFaculty> => {
  return FacultyModel.create({
    ...faculty,
    workflowId,
  });
};

// REMOVE
const removeFaculty = async (
  facultyId: IFaculty["id"]
): Promise<{ deletedCount?: number }> => {
  return FacultyModel.deleteOne({
    id: facultyId,
  });
};

// UPDATE
const updateFaculty = async (
  facultyId: IFaculty["id"],
  updateFields: Partial<IFaculty>
): Promise<IFaculty | null> => {
  return FacultyModel.findOneAndUpdate(
    {  id: facultyId },
    { $set: updateFields },
    { new: true, runValidators: true }
  ).lean();
};

export default {
  getFaculties,
  getFaculty,
  addFaculty,
  removeFaculty,
  updateFaculty,
};