import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";
import logger from "#configs/logger.js";

export const addFacultyEmit = (workflowId, faculty) => {
  logger.info("add faculty emit", workflowId, faculty);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.FACULTY_ADD, faculty);
};

export const removeFacultyEmit = (workflowId, facultyId) => {
  logger.info("remove faculty emit", workflowId, facultyId);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.FACULTY_REMOVE, facultyId);
};

export const updateFacultyEmit = (workflowId, facultyId, facultyData) => {
  logger.info("update faculty emit", workflowId, facultyId, facultyData);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.FACULTY_UPDATE, facultyId, facultyData);
};
