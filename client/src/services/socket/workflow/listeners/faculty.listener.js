import WORKFLOW_EVENTS from "../events.js";

import { getSocket } from "../../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";

const facultyListenerInit = () => {
  const socket = getSocket();

  socket.on(WORKFLOW_EVENTS.FACULTY_ADD, (faculty) => {
    console.log(WORKFLOW_EVENTS.FACULTY_ADD, faculty);

    useWorkflowStore.getState().addFacultyLocal(faculty);
  });

  socket.on(WORKFLOW_EVENTS.FACULTY_REMOVE, (facultyId) => {
    console.log(WORKFLOW_EVENTS.FACULTY_REMOVE, facultyId);

    useWorkflowStore.getState().removeFacultyLocal(facultyId);
  });

  socket.on(WORKFLOW_EVENTS.FACULTY_UPDATE, (facultyId, facultyData) => {
    console.log(WORKFLOW_EVENTS.FACULTY_UPDATE, facultyId, facultyData);

    useWorkflowStore.getState().updateFacultyLocal(facultyId, facultyData);
  });
};

export default facultyListenerInit;
