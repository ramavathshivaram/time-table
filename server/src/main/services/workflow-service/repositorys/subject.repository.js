import workflowModel from "../models/workflow.model.js";

const getSubjects = async (workflowId) => {
  const workflow = await workflowModel
    .findById(workflowId)
    .select("subjects")
    .lean();

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow.subjects;
};

const getSubject = async (workflowId, subjectId) => {
  const workflow = await workflowModel
    .findById(workflowId)
    .select("subjects")
    .lean();

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  return workflow.subjects.find((subject) => subject.id === subjectId);
};

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
  getSubjects,
  getSubject,
  addSubject,
  removeSubject,
  updateSubject,
};
