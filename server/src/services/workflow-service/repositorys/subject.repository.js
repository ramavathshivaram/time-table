import SubjectModel from "../models/subject.model.js";
import logger from "#configs/logger.js";

const getSubjects = async (workflowId) => {
  try {
    return await SubjectModel.find({ workflowId }).lean();
  } catch (error) {
    logger.error("Error in getSubjects", {
      workflowId,
      error: error.message,
    });
    return [];
  }
};

const getSubject = async (workflowId, subjectId) => {
  try {
    const subject = await SubjectModel.findOne({
      workflowId,
      id: subjectId,
    });

    return subject || null;
  } catch (error) {
    logger.error("Error in getSubject", {
      workflowId,
      subjectId,
      error: error.message,
    });
    return null;
  }
};

const addSubject = async (workflowId, subject) => {
  try {
    return await SubjectModel.create({
      ...subject,
      workflowId,
    });
  } catch (error) {
    logger.error("Error in addSubject", {
      workflowId,
      subject,
      error: error.message,
    });
    return null;
  }
};

const addSubjects = async (workflowId, subjects) => {
  try {
    const docs = subjects.map((s) => ({
      ...s,
      workflowId,
    }));

    return await SubjectModel.insertMany(docs);
  } catch (error) {
    logger.error("Error in addSubjects", {
      workflowId,
      subjectsCount: subjects?.length,
      error: error.message,
    });
    return [];
  }
};

const removeSubject = async (workflowId, subjectId) => {
  try {
    return await SubjectModel.deleteOne({
      workflowId,
      id: subjectId,
    });
  } catch (error) {
    logger.error("Error in removeSubject", {
      workflowId,
      subjectId,
      error: error.message,
    });
    return null;
  }
};

const updateSubject = async (workflowId, subjectId, updateFields) => {
  try {
    return await SubjectModel.findOneAndUpdate(
      { workflowId, id: subjectId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
  } catch (error) {
    logger.error("Error in updateSubject", {
      workflowId,
      subjectId,
      updateFields,
      error: error.message,
    });
    return null;
  }
};

export default {
  getSubjects,
  getSubject,
  addSubject,
  addSubjects,
  removeSubject,
  updateSubject,
};