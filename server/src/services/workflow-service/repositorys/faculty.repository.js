import FacultyModel from "../models/faculty.model.js";
import logger from "#configs/logger.js";

const getFaculties = async (workflowId) => {
  try {
    return await FacultyModel.find({ workflowId }).lean();
  } catch (error) {
    logger.error("Error in getFaculties", {
      workflowId,
      error: error.message,
    });
    return [];
  }
};

const getFaculty = async (workflowId, facultyId) => {
  try {
    const faculty = await FacultyModel.findOne({
      workflowId,
      id: facultyId,
    });

    return faculty || null;
  } catch (error) {
    logger.error("Error in getFaculty", {
      workflowId,
      facultyId,
      error: error.message,
    });
    return null;
  }
};

const addFaculty = async (workflowId, faculty) => {
  try {
    return await FacultyModel.create({
      ...faculty,
      workflowId,
    });
  } catch (error) {
    logger.error("Error in addFaculty", {
      workflowId,
      faculty,
      error: error.message,
    });
    return null;
  }
};

const removeFaculty = async (workflowId, facultyId) => {
  try {
    return await FacultyModel.deleteOne({
      workflowId,
      id: facultyId,
    });
  } catch (error) {
    logger.error("Error in removeFaculty", {
      workflowId,
      facultyId,
      error: error.message,
    });
    return null;
  }
};

const updateFaculty = async (workflowId, facultyId, updateFields) => {
  try {
    return await FacultyModel.findOneAndUpdate(
      { workflowId, id: facultyId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );
  } catch (error) {
    logger.error("Error in updateFaculty", {
      workflowId,
      facultyId,
      updateFields,
      error: error.message,
    });
    return null;
  }
};

export default {
  getFaculties,
  getFaculty,
  addFaculty,
  removeFaculty,
  updateFaculty,
};