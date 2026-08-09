import { userReposistory } from "./user.reposistory.js";

export const userService = {
  create: async (user: any) => {
    return await userReposistory.create(user);
  },
};
