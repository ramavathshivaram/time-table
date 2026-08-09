import useWorkflowStore from "@/store/workflow.store.js";
import {facultyEmit} from "@/services/socket/workflow/faculty.socket.js";

const facultyService = {
  addFaculty(faculty) {
    facultyEmit.add(faculty);

    useWorkflowStore.getState().addFacultyLocal(faculty);
  },

  removeFaculty(facultyId) {
    facultyEmit.remove(facultyId);

    useWorkflowStore.getState().removeFacultyLocal(facultyId);
  },

  updateFaculty(facultyId, facultyData) {
    facultyEmit.update(facultyId, facultyData);

    useWorkflowStore.getState().updateFacultyLocal(facultyId, facultyData);
  },
};

export default facultyService;
