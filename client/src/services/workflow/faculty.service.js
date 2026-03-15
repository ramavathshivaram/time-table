import useWorkflowStore from "@/store/workflow.store";
import {
  addFacultyEmit,
  removeFacultyEmit,
  updateFacultyEmit,
} from "@/services/socket/workflow/emitters/faculty.emit";

const facultyService = {
  addFaculty(faculty) {
    const { workflowId } = useWorkflowStore.getState();
    addFacultyEmit(workflowId, faculty);

    useWorkflowStore.setState((state) => ({
      faculties: [...state.faculties, faculty],
    }));
  },

  removeFaculty(facultyId) {
    const { workflowId } = useWorkflowStore.getState();
    removeFacultyEmit(workflowId, facultyId);

    useWorkflowStore.setState((state) => ({
      faculties: state.faculties.filter((f) => f.id !== facultyId),
    }));
  },

  updateFaculty(facultyId, facultyData) {
    const { workflowId } = useWorkflowStore.getState();
    updateFacultyEmit(workflowId, facultyId, facultyData);

    useWorkflowStore.setState((state) => ({
      faculties: state.faculties.map((f) =>
        f.id === facultyId ? facultyData : f
      ),
    }));
  },
};

export default facultyService;