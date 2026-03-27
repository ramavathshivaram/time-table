import useWorkflowStore from "@/store/workflow.store";
import {
  addSubjectEmit,
  removeSubjectEmit,
  updateSubjectEmit,
} from "@/services/socket/workflow/emitters/subject.emit";

const subjectService = {
  addSubject(subject) {
    addSubjectEmit(subject);

    useWorkflowStore.getState().addSubjectLocal(subject);
  },

  removeSubject(subjectId) {
    removeSubjectEmit(subjectId);

    useWorkflowStore.getState().removeSubjectLocal(subjectId);
  },

  updateSubject(subjectId, subjectData) {
    updateSubjectEmit(subjectId, subjectData);

    useWorkflowStore.getState().updateSubjectLocal(subjectId, subjectData);
  },
};

export default subjectService;
