import { Faculty } from "./faculty.model.js";
import { facultyRepository } from "./faculty.repository.js";

export const facultyProcessor = {
  add: async (faculty: Faculty) => {
    await facultyRepository.create(faculty);
  },

  update: async (faculty: Partial<Faculty>) => {
    await facultyRepository.updateById(faculty.id!, faculty);
  },

  remove: async (facultyId: string) => {
    await facultyRepository.deleteById(facultyId);
  },
};
