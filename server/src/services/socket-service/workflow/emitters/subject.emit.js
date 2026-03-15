import { WORKFLOW_EVENTS } from "../../lib/const.js";
import { getWorkflowSocket } from "../workflow.socket.store.js";
import { getIo } from "../../socket.js";

export const addSubjectEmit = (workflowId, subject) => {
  console.log("add subject emit", workflowId, subject);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.SUBJECT_ADD, subject);
};

export const removeSubjectEmit = (workflowId, subjectId) => {
  console.log("remove subject emit", workflowId, subjectId);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.SUBJECT_REMOVE, subjectId);
};

export const updateSubjectEmit = (workflowId, subjectId, subjectData) => {
  console.log("update subject emit", workflowId, subjectId, subjectData);
  const io = getIo();
  const socketId = getWorkflowSocket(workflowId);
  io.to(socketId).emit(WORKFLOW_EVENTS.SUBJECT_UPDATE, subjectId, subjectData);
};
