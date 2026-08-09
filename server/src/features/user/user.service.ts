import { userReposistory } from "./user.reposistory.js";

export const userService = {
  create: async (user: any) => {
    return await userReposistory.create(user);
  },

  findByEmail: async (email: string) => {
    return await userReposistory.findByEmail(email);
  },

  findById: async (id: string) => {
    return await userReposistory.findById(id);
  },

  updatePassword: async (userId: string, password: string) => {
    return await userReposistory.updatePassword(userId, password);
  },
};
