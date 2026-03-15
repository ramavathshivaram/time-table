import useWorkflowStore from "@/store/workflow.store";
import {
  addSubjectEmit,
  removeSubjectEmit,
  updateSubjectEmit,
} from "@/services/socket/workflow/emitters/subject.emit";

const subjectService = {
  addSubject(subject) {
    const { workflowId } = useWorkflowStore.getState();
    addSubjectEmit(workflowId, subject);

    useWorkflowStore.setState((state) => ({
      subjects: [...state.subjects, subject],
    }));
  },

  removeSubject(subjectId) {
    const { workflowId } = useWorkflowStore.getState();
    removeSubjectEmit(workflowId, subjectId);

    useWorkflowStore.setState((state) => ({
      subjects: state.subjects.filter((s) => s.id !== subjectId),
    }));
  },

  updateSubject(subjectId, subjectData) {
    const { workflowId } = useWorkflowStore.getState();
    updateSubjectEmit(workflowId, subjectId, subjectData);

    useWorkflowStore.setState((state) => ({
      subjects: state.subjects.map((s) =>
        s.id === subjectId ? subjectData : s
      ),
    }));
  },
};

export default subjectService;