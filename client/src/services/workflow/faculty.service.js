import useWorkflowStore from "@/store/workflow.store";
import {
  addFacultyEmit,
  removeFacultyEmit,
  updateFacultyEmit,
} from "@/services/socket/workflow/emitters/faculty.emit";

const facultyService = {
  addFaculty(faculty) {
    addFacultyEmit(faculty);

    useWorkflowStore.getState().addFacultyLocal(faculty);
  },

  removeFaculty(facultyId) {
    removeFacultyEmit(facultyId);

    useWorkflowStore.getState().removeFacultyLocal(facultyId);
  },

  updateFaculty(facultyId, facultyData) {
    updateFacultyEmit(facultyId, facultyData);

    useWorkflowStore.getState().updateFacultyLocal(facultyId, facultyData);
  },
};

export default facultyService;
