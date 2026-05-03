import type { Types } from "mongoose";
import UserModel from "./user.model.js";

interface Userdata {
  userName: String;
  email: String;
  avatar?: String;
}

const createUser = async (user: Userdata) => {
  return await UserModel.create(user);
};

const checkUserExits = async (user: Userdata): boolean => {
  const userExits = await UserModel.exists(user);
  return !!userExits;
};

const getUserById = async (userId: Types.ObjectId) => {
  return await UserModel.findById(userId);
};

const getUserIdByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email });
  return user._id;
};

const updateDarkMode = async (userId: Types.ObjectId, darkMode: boolean) => {
  return await UserModel.findByIdAndUpdate(userId, { settings: { darkMode } });
};

export default {
  createUser,
  getUserById,
  getUserIdByEmail,
  updateDarkMode,
};
