import { userRepository } from "./user.reposistory.js";

export const userService = {
  create: async (user: any) => {
    return await userRepository.create(user);
  },

  findByEmail: async (email: string) => {
    return await userRepository.findByEmail(email);
  },

  findByEmailWithPassword: async (email: string) => {
    return await userRepository.findByEmailWithPassword(email);
  },

  findById: async (id: string) => {
    return await userRepository.findById(id);
  },

  updatePassword: async (userId: string, password: string) => {
    return await userRepository.updatePassword(userId, password);
  },
};
