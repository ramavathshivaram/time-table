import { FACULTY } from "./events.js";
import { getSocket } from "../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";
import emit from "./emit.js";

export const facultyEmit = {
  add(faculty) {
    emit(FACULTY.ADD, faculty);
  },

  remove(facultyId) {
    emit(FACULTY.REMOVE, facultyId);
  },

  update(facultyId, facultyData) {
    emit(FACULTY.UPDATE, facultyId, facultyData);
  },
};

export const registerFacultyHandlers = () => {
  const socket = getSocket();

  socket.on(FACULTY.ADD, (faculty) => {
    console.log("⬇️ FACULTY.ADD", faculty);
    useWorkflowStore.getState().addFacultyLocal(faculty);
  });

  socket.on(FACULTY.REMOVE, (facultyId) => {
    console.log("⬇️ FACULTY.REMOVE", facultyId);
    useWorkflowStore.getState().removeFacultyLocal(facultyId);
  });

  socket.on(FACULTY.UPDATE, (facultyId, facultyData) => {
    console.log("⬇️ FACULTY.UPDATE", facultyId, facultyData);
    useWorkflowStore.getState().updateFacultyLocal(facultyId, facultyData);
  });
};

export const cleanupFacultyListeners = () => {
  const socket = getSocket();

  socket.off(FACULTY.ADD);
  socket.off(FACULTY.REMOVE);
  socket.off(FACULTY.UPDATE);
};
