import { Faculty } from "./faculty.model.js";
import { facultyRepository } from "./faculty.repository.js";

export const facultyProcessor = {
  add: async (faculty: Faculty) => {
    await facultyRepository.create(faculty);
  },

  update: async (designerId: string, id: string, data: Partial<Faculty>) => {
    await facultyRepository.updateById(designerId, id, data);
  },

  remove: async (designerId: string, id: string) => {
    await facultyRepository.deleteById(designerId, id);
  },
};
