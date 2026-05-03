import useWorkflowStore from "@/store/workflow.store.js";
import {subjectEmit} from "@/services/socket/workflow/subject.socket.js";

const subjectService = {
  addSubject(subject) {
    subjectEmit.add(subject);

    useWorkflowStore.getState().addSubjectLocal(subject);
  },

  removeSubject(subjectId) {
    subjectEmit.remove(subjectId);

    useWorkflowStore.getState().removeSubjectLocal(subjectId);
  },

  updateSubject(subjectId, subjectData) {
    subjectEmit.update(subjectId, subjectData);

    useWorkflowStore.getState().updateSubjectLocal(subjectId, subjectData);
  },
};

export default subjectService;
