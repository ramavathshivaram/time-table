import { UserModel } from "./user.model.js";

import { errors } from "#utils/errors.js";

export const userRepository = {
  exists: async (filter: object): Promise<boolean> => {
    try {
      const user = await UserModel.exists(filter);

      return user !== null;
    } catch (error) {
      throw errors.internal("Failed to check user");
    }
  },

  create: async (user: object) => {
    try {
      return await UserModel.create(user);
    } catch (error: any) {
      if (error?.code === 11000) {
        if (error?.keyPattern?.email) {
          throw errors.conflict("Email is already registered");
        }

        if (error?.keyPattern?.userName) {
          throw errors.conflict("Username is already taken");
        }

        throw errors.conflict("User already exists");
      }

      throw errors.internal("Failed to create user");
    }
  },

  findOne: async (filter: object) => {
    try {
      return await UserModel.findOne(filter);
    } catch (error) {
      throw errors.internal("Failed to find user");
    }
  },

  findById: async (id: string) => {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw errors.internal("Failed to find user");
    }
  },

  findByEmail: async (email: string) => {
    try {
      return await UserModel.findOne({
        email: email.toLowerCase(),
      });
    } catch (error) {
      throw errors.internal("Failed to find user by email");
    }
  },

  findByEmailWithPassword: async (email: string) => {
    try {
      return await UserModel.findOne({
        email: email.toLowerCase(),
      }).select("+password");
    } catch (error) {
      throw errors.internal("Failed to find user by email");
    }
  },

  updatePassword: async (userId: string, password: string) => {
    try {
      return await UserModel.updateOne(
        { _id: userId },
        {
          $set: {
            password,
          },
        },
      );
    } catch (error) {
      throw errors.internal("Failed to update password");
    }
  },
};
