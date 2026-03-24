import FacultyModel from "../models/faculty.model.js";

const getFaculties = async (workflowId) => {
  return FacultyModel.find({ workflowId }).lean();
};

const getFaculty = async (workflowId, facultyId) => {
  const faculty = await FacultyModel.findOne({
    workflowId,
    id: facultyId,
  });

  return faculty || null;
};

const addFaculty = async (workflowId, faculty) => {
  return FacultyModel.create({
    ...faculty,
    workflowId,
  });
};

const removeFaculty = async (workflowId, facultyId) => {
  return FacultyModel.deleteOne({
    workflowId,
    id: facultyId,
  });
};

const updateFaculty = async (workflowId, facultyId, updateFields) => {
  return FacultyModel.findOneAndUpdate(
    { workflowId, id: facultyId },
    { $set: updateFields },
    { new: true, runValidators: true },
  );
};

export default {
  getFaculties,
  getFaculty,
  addFaculty,
  removeFaculty,
  updateFaculty,
};
