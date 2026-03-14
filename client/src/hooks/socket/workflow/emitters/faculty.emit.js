import WORKFLOW_EVENTS from "../events.js";
import { getSocket } from "../../socket.js";

const socket = getSocket();

const logEmit = (event, payload) => {
  console.group(`📡 SOCKET EMIT: ${event}`);
  console.log("payload:", payload);
  console.log("time:", new Date().toISOString());
  console.groupEnd();
};

export const addFacultyEmit = (workflowId, faculty) => {
  logEmit(WORKFLOW_EVENTS.FACULTY_ADD, faculty);
  socket.emit(WORKFLOW_EVENTS.FACULTY_ADD, workflowId, faculty);
};

export const removeFacultyEmit = (workflowId, facultyId) => {
  logEmit(WORKFLOW_EVENTS.FACULTY_REMOVE, facultyId);
  socket.emit(WORKFLOW_EVENTS.FACULTY_REMOVE, workflowId, facultyId);
};

export const updateFacultyEmit = (workflowId, facultyId, facultyData) => {
  logEmit(WORKFLOW_EVENTS.FACULTY_UPDATE, facultyData);
  socket.emit(
    WORKFLOW_EVENTS.FACULTY_UPDATE,
    workflowId,
    facultyId,
    facultyData,
  );
};