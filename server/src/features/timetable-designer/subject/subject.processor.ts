import { Subject } from "./subject.model.js";
import { subjectRepository } from "./subject.repository.js";

export const subjectProcessor = {
  add: async (subject: Subject) => {
    await subjectRepository.create(subject);
  },

  update: async (subject: Subject) => {
    await subjectRepository.updateById(subject.id, subject);
  },

  remove: async (subjectId: string) => {
    await subjectRepository.deleteById(subjectId);
  },
};
