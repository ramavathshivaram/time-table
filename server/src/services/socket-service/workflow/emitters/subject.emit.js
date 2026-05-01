import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";
import logger from "#configs/logger.js";

export const addSubjectEmit = (workflowId, subject) => {
  logger.info("add subject emit", workflowId, subject);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.SUBJECT_ADD, subject);
};

export const removeSubjectEmit = (workflowId, subjectId) => {
  logger.info("remove subject emit", workflowId, subjectId);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.SUBJECT_REMOVE, subjectId);
};

export const updateSubjectEmit = (workflowId, subjectId, subjectData) => {
  logger.info("update subject emit", workflowId, subjectId, subjectData);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.SUBJECT_UPDATE, subjectId, subjectData);
};
