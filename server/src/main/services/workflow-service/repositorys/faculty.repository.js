import workflowModel from "../models/workflow.model.js";

const getFaculties = async (workflowId) => {
  const workflow = await workflowModel
    .findById(workflowId)
    .select("faculties")
    .lean();

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow.faculties;
};

const getFaculty = async (workflowId, facultyId) => {
  const workflow = await workflowModel
    .findById(workflowId)
    .select("faculties")
    .lean();

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow.faculties.find((faculty) => faculty.id === facultyId);
};

const addFaculty = async (workflowId, faculty) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { faculties: faculty },
  });
};

const removeFaculty = async (workflowId, faculty) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { faculties: { id: faculty } },
  });
};

const updateFaculty = async (workflowId, facultyId, facultyData) => {
  await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "faculties.id": facultyId,
    },
    {
      $set: {
        "faculties.$": facultyData,
      },
    },
  );
};

export default {
  getFaculties,
  getFaculty,
  addFaculty,
  removeFaculty,
  updateFaculty,
};
