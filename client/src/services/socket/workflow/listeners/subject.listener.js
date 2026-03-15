import WORKFLOW_EVENTS from "../events.js";

import { getSocket } from "../../socket.js";
import useWorkflowStore from "@/store/workflow.store.js";

const subjectListenerInit = () => {
  const socket = getSocket();

  socket.on(WORKFLOW_EVENTS.SUBJECT_ADD, (subject) => {
    console.log(WORKFLOW_EVENTS.SUBJECT_ADD, subject);

    useWorkflowStore.getState().addSubjectLocal(subject);
  });

  socket.on(WORKFLOW_EVENTS.SUBJECT_REMOVE, (subjectId) => {
    console.log(WORKFLOW_EVENTS.SUBJECT_REMOVE, subjectId);

    useWorkflowStore.getState().removeSubjectLocal(subjectId);
  });

  socket.on(WORKFLOW_EVENTS.SUBJECT_UPDATE, (subjectId, subjectData) => {
    console.log(WORKFLOW_EVENTS.SUBJECT_UPDATE, subjectId, subjectData);

    useWorkflowStore.getState().updateSubjectLocal(subjectId, subjectData);
  });
};

export default subjectListenerInit;
