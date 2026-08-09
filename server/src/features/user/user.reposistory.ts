import { UserModel } from "./user.model.js";

export const userReposistory = {
  checkUserExits: async (user: any) => {
    const userExits = await UserModel.exists(user);
    return !!userExits;
  },

  create: async (user: any) => {
    return await UserModel.create(user);
  },

  findOne: async (user: any) => {
    return await UserModel.findOne(user);
  },

  findById: async (id: string) => {
    return await UserModel.findById(id);
  },

  findByEmail: async (email: string) => {
    return await UserModel.findOne({ email: email.toLowerCase() });
  },

  updatePassword: async (userId: string, password: string) => {
    return await UserModel.updateOne({ _id: userId }, { $set: { password } });
  },
};
