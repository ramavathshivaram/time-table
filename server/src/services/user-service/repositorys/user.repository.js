import UserModel from "../models/user.model.js";

const createUser = async (user) => {
  return await UserModel.create(user);
};

const getUserByAuthId = async (authId) => {
  return await UserModel.findOne({ authId });
};

export default { createUser, getUserByAuthId };
