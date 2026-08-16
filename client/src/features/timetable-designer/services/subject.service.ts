import type { Subject } from "../types";
import { useDesignerStore } from "../store/designer.store";

export const subjectService = {
  getAll: (query = ""): Subject[] => {
    const subjects = useDesignerStore.getState().subjects;

    const search = query.trim().toLowerCase();

    if (!search) {
      return subjects;
    }

    return subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(search) ||
        subject.code.toLowerCase().includes(search),
    );
  },

  getById: (subjectId: string) => {
    return useDesignerStore.getState().getSubject(subjectId);
  },

  add: async (subject: Subject) => {
    useDesignerStore.getState().addSubject(subject);

    // TODO: API
    return subject;
  },

  update: async (subjectId: string, subjectData: Subject) => {
    useDesignerStore.getState().updateSubject(subjectId, subjectData);

    // TODO: API
    return subjectData;
  },

  remove: async (subjectId: string) => {
    useDesignerStore.getState().removeSubject(subjectId);

    // TODO: API
  },
};
