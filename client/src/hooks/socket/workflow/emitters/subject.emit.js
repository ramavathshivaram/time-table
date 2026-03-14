import WORKFLOW_EVENTS from "../events.js";
import { getSocket } from "../../socket.js";

const socket = getSocket();

const logEmit = (event, payload) => {
  console.group(`📡 SOCKET EMIT: ${event}`);
  console.log("payload:", payload);
  console.log("time:", new Date().toISOString());
  console.groupEnd();
};



export const addSubjectEmit = (workflowId, subject) => {
  logEmit(WORKFLOW_EVENTS.SUBJECT_ADD, subject);
  socket.emit(WORKFLOW_EVENTS.SUBJECT_ADD, workflowId, subject);
};

export const removeSubjectEmit = (workflowId, subjectId) => {
  logEmit(WORKFLOW_EVENTS.SUBJECT_REMOVE, subjectId);
  socket.emit(WORKFLOW_EVENTS.SUBJECT_REMOVE, workflowId, subjectId);
};

export const updateSubjectEmit = (workflowId, subjectId, subjectData) => {
  logEmit(WORKFLOW_EVENTS.SUBJECT_UPDATE, subjectData);
  socket.emit(
    WORKFLOW_EVENTS.SUBJECT_UPDATE,
    workflowId,
    subjectId,
    subjectData,
  );
};