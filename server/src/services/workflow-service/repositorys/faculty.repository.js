import workflowModel from "../models/workflow.model.js";

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


export default { addFaculty, removeFaculty, updateFaculty };