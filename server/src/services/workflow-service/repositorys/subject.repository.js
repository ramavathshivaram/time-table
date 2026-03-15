import workflowModel from "../models/workflow.model.js";


const addSubject = async (workflowId, subject) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $push: { subjects: subject },
  });
};

const removeSubject = async (workflowId, subjectId) => {
  await workflowModel.findByIdAndUpdate(workflowId, {
    $pull: { subjects: { id: subjectId } },
  });
};

const updateSubject = async (workflowId, subjectId, subjectData) => {
  await workflowModel.findOneAndUpdate(
    {
      _id: workflowId,
      "subjects.id": subjectId,
    },
    {
      $set: {
        "subjects.$": subjectData,
      },
    },
  );
};


export default {
  addSubject,
  removeSubject,
  updateSubject,
};