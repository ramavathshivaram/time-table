import { useDesignerStore } from "../store/designer.store";
import type { Faculty } from "../types";

export const facultyService = {
  getAll: async (query: string = "") => {
    const faculties = useDesignerStore.getState().getFaculties();

    const search = query.trim().toLowerCase();

    if (!search) {
      return faculties;
    }

    return faculties.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(search) ||
        faculty.email.toLowerCase().includes(search) ||
        faculty.department?.toLowerCase().includes(search),
    );
  },

  getById: async (id: string) => {
    return useDesignerStore.getState().getFaculty(id);
  },

  add: async (faculty: Faculty) => {
    useDesignerStore.getState().addFaculty(faculty);
  },

  update: async (id: string, data: Partial<Faculty>) => {
    useDesignerStore.getState().updateFaculty(id, data);
  },

  remove: async (id: string) => {
    useDesignerStore.getState().removeFaculty(id);

    return id;
  },
};
