import type { Faculty } from "../types";

export const facultyService = {
  getAll: async (): Promise<Faculty[]> => {
    // TODO: API request
    return [];
  },

  add: async (faculty: Faculty) => {
    // TODO: API request
    return faculty;
  },

  update: async (id: string, data: Partial<Faculty>) => {
    // TODO: API request
    return { id, ...data };
  },

  remove: async (id: string) => {
    // TODO: API request
    return id;
  },
};
