import { SUBJECT } from "./events.js";
import { getSocket } from "../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";
import emit from "./emit.js";

export const subjectEmit = {
  add(subject) {
    emit(SUBJECT.ADD, subject);
  },

  remove(subjectId) {
    emit(SUBJECT.REMOVE, subjectId);
  },

  update(subjectId, subjectData) {
    emit(SUBJECT.UPDATE, subjectId, subjectData);
  },
};

export const registerSubjectHandlers = () => {
  const socket = getSocket();

  socket.on(SUBJECT.ADD, (subject) => {
    console.log("⬇️ SUBJECT.ADD", subject);
    useWorkflowStore.getState().addSubjectLocal(subject);
  });

  socket.on(SUBJECT.REMOVE, (subjectId) => {
    console.log("⬇️ SUBJECT.REMOVE", subjectId);
    useWorkflowStore.getState().removeSubjectLocal(subjectId);
  });

  socket.on(SUBJECT.UPDATE, (subjectId, subjectData) => {
    console.log("⬇️ SUBJECT.UPDATE", subjectId, subjectData);
    useWorkflowStore.getState().updateSubjectLocal(subjectId, subjectData);
  });
};

export const cleanupSubjectListeners = () => {
  const socket = getSocket();

  socket.off(SUBJECT.ADD);
  socket.off(SUBJECT.REMOVE);
  socket.off(SUBJECT.UPDATE);
};
