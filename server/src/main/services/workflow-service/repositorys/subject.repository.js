import SubjectModel from "../models/subject.model.js";

const getSubjects = async (workflowId) => {
  return SubjectModel.find({ workflowId }).lean();
};

const getSubject = async (workflowId, subjectId) => {
  const subject = await SubjectModel.findOne({
    workflowId,
    id: subjectId,
  });

  return subject || null;
};

const addSubject = async (workflowId, subject) => {
  return SubjectModel.create({
    ...subject,
    workflowId,
  });
};

const addSubjects = async (workflowId, subjects) => {
  const docs = subjects.map((s) => ({
    ...s,
    workflowId,
  }));

  return SubjectModel.insertMany(docs);
};

const removeSubject = async (workflowId, subjectId) => {
  return SubjectModel.deleteOne({
    workflowId,
    id: subjectId,
  });
};

const updateSubject = async (workflowId, subjectId, updateFields) => {
  return SubjectModel.findOneAndUpdate(
    { workflowId, id: subjectId },
    { $set: updateFields },
    { new: true, runValidators: true },
  );
};

export default {
  getSubjects,
  getSubject,
  addSubject,
  addSubjects,
  removeSubject,
  updateSubject,
};
